const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validates");
const { updatePillarSchema } = require("../vaidators/pillarValidator");
const {
    getAllPillars,
    updatePillar,
    getPillar
} = require("../controllers/pillarController");

router.get("/", getAllPillars);
router.get("/:id", getPillar);

router.put(
    "/:id",
    authenticate,
    authorize(
        "EDITOR",
        "SUPER_ADMIN"
    ),
    validate(updatePillarSchema),
    updatePillar
);
module.exports = router;