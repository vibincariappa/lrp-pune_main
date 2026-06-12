const errorHandler = (err, req, res, next) => {
    console.error("Error handler caught:", err);

    if (err.name === "ZodError" || err.issues) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.errors || err.issues
        });
    }

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Internal server error";

    return res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;

