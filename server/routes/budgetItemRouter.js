const Router = require("express");
const router = new Router();
const budgetItemController = require("../controllers/budgetItemController");

router.post("/", budgetItemController.create);
router.get("/", budgetItemController.getAll);

module.exports = router;
