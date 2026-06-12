const adminService = require("../services/adminService");

const createAdmin = async (req, res, next) => {
  try {
    const admin = await adminService.createAdmin(req.body);

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

module.exports = {
  createAdmin
};
