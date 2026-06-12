const bcrypt = require("bcryptjs");
const prisma = require("../config/db");
const { generateToken } = require("../utils/jwtHelper");

const login = async (email, password) => {
    const admin = await prisma.admin.findUnique({
        where: {
            email
        }
    });

    if (!admin) {
        throw { statusCode: 401, message: "Invalid email or password" };
    }

    const match = await bcrypt.compare(
        password,
        admin.passwordHash
    );

    if (!match) {
        throw { statusCode: 401, message: "Invalid email or password" };
    }

    const token = generateToken({
        id: admin.id,
        role: admin.role
    });

    return token;
};

const registerAdmin = async (data) => {
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
    registerAdmin,
    login
};