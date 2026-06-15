const router = require("express").Router();
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validates");
const { PERMISSIONS } = require("../config/permissions");
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
    authorize(PERMISSIONS.UPDATE_METRICS),
    validate(updatePillarSchema),
    updatePillar
);
module.exports = router;