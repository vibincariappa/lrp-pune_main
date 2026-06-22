const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const { generateAccessToken } = require("../utils/jwtHelper");

const recordLoginAudit = async (adminId, ipAddress, userAgent, success) => {
  try {
    await prisma.loginAudit.create({
      data: {
        adminId,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        success
      }
    });
  } catch (error) {
    console.error("Failed to record login audit:", error);
  }
};

const login = async (usernameOrEmail, password, ipAddress, userAgent) => {
  if (!usernameOrEmail || !password) {
    throw { statusCode: 400, message: "Username/email and password are required." };
  }

  // Find user by email OR username
  const admin = await prisma.admin.findFirst({
    where: {
      OR: [
        { email: usernameOrEmail },
        { username: usernameOrEmail }
      ]
    }
  });

  if (!admin) {
    throw { statusCode: 401, message: "Invalid username/email or password" };
  }

  if (!admin.isActive) {
    // Record failed login audit for inactive account
    await recordLoginAudit(admin.id, ipAddress, userAgent, false);
    throw { statusCode: 403, message: "This account has been deactivated" };
  }

  const match = await bcrypt.compare(password, admin.passwordHash);

  if (!match) {
    await recordLoginAudit(admin.id, ipAddress, userAgent, false);
    throw { statusCode: 401, message: "Invalid username/email or password" };
  }

  // Record audit and last login time
  await recordLoginAudit(admin.id, ipAddress, userAgent, true);
  
  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() }
  });

  // Generate Access Token
  const token = generateAccessToken({
    id: admin.id,
    username: admin.username,
    role: admin.role
  });

  return { token, admin };
};

const logout = async () => {
  return true;
};

const validateUser = async (id) => {
  const admin = await prisma.admin.findUnique({
    where: { id }
  });

  if (!admin || !admin.isActive) {
    return null;
  }

  return admin;
};

const registerAdmin = async (data) => {
  if (!data?.email || !data?.username || !data?.password || !data?.role) {
    throw { statusCode: 400, message: "Email, username, password, and role are required." };
  }

  const existingEmail = await prisma.admin.findUnique({
    where: { email: data.email }
  });
  if (existingEmail) {
    throw { statusCode: 409, message: "Email already registered." };
  }

  const existingUsername = await prisma.admin.findUnique({
    where: { username: data.username }
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
  login,
  logout,
  validateUser,
  recordLoginAudit,
  registerAdmin
};