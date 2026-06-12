const express = require("express");
const { register, login } = require("../controllers/authController");
const validate = require("../middleware/validates");

const router = require("express").Router();

const {
    registerSchema,
    loginSchema
} = require("../vaidators/authValidator");

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

module.exports = router;
