const router = require("express").Router();
const { createAdmin } = require("../controllers/adminController");
const validate = require("../middleware/validates");
const { registerSchema } = require("../vaidators/authValidator");

router.post("/", validate(registerSchema), createAdmin);

module.exports = router;