const bcrypt = require("bcryptjs");
const prisma = require("../config/db");

const createAdmin = async (data) => {
  if (!data?.email || !data?.password) {
    throw { statusCode: 400, message: "Email and password are required." };
  }

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      email: data.email
    }
  });

  if (existingAdmin) {
    throw { statusCode: 409, message: "Email already registered." };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.admin.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role || "EDITOR"
    },
    select: {
      id: true,
      email: true,
      role: true
    }
  });

  return admin;
};

module.exports = {
  createAdmin
};
