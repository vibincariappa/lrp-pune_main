require("dotenv").config();
const prisma = require("../config/db");

async function main() {
  console.log("Updating existing admins with unique usernames...");
  const admins = await prisma.admin.findMany();
  
  for (const admin of admins) {
    if (!admin.username) {
      // Create a username from email (e.g., editor1@lrppune.org -> editor1)
      let baseUsername = admin.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      if (baseUsername.length < 3) {
        baseUsername = "admin_" + baseUsername;
      }
      
      let username = baseUsername;
      let counter = 1;
      
      // Ensure uniqueness
      while (true) {
        const existing = await prisma.admin.findFirst({
          where: { username }
        });
        if (!existing) break;
        username = `${baseUsername}${counter}`;
        counter++;
      }
      
      await prisma.admin.update({
        where: { id: admin.id },
        data: { username }
      });
      console.log(`Updated admin ${admin.email} with username: ${username}`);
    } else {
      console.log(`Admin ${admin.email} already has username: ${admin.username}`);
    }
  }
  console.log("Done updating usernames!");
}

main()
  .catch(err => {
    console.error("Error updating usernames:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
