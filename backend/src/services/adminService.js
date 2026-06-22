const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

const createAdmin = async (data) => {
  if (!data?.email || !data?.username || !data?.password || !data?.role) {
    throw { statusCode: 400, message: "Email, username, password, and role are required." };
  }

  const existingEmail = await prisma.admin.findUnique({
    where: {
      email: data.email
    }
  });

  if (existingEmail) {
    throw { statusCode: 409, message: "Email already registered." };
  }

  const existingUsername = await prisma.admin.findUnique({
    where: {
      username: data.username
    }
  });

  if (existingUsername) {
    throw { statusCode: 409, message: "Username already taken." };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.admin.create({
    data: {
      email: data.email,
      username: data.username,
      passwordHash: hashedPassword,
      role: data.role,
      isActive: true
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      isActive: true
    }
  });

  return admin;
};

module.exports = {
  createAdmin
};
