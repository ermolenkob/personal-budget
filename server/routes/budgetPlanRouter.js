const Router = require("express");
const router = new Router();
const budgetPlanController = require("../controllers/budgetPlanController");

router.post("/", budgetPlanController.create);
router.get("/", budgetPlanController.getPeriod);

module.exports = router;
