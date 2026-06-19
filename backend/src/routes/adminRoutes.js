const router = require("express").Router();
const { createAdmin } = require("../controllers/adminController");
const validate = require("../middleware/validates");
const { registerSchema } = require("../validators/authValidator");

router.post("/", validate(registerSchema), createAdmin);

module.exports = router;