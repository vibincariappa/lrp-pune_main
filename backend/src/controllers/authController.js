const authService = require("../services/authService");

const register = async (req, res, next) => {
    try {
        const admin = await authService.registerAdmin(req.body);

        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: admin.id,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const token = await authService.login(
            req.body.email,
            req.body.password
        );

        res.json({
            success: true,
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};