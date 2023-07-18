const Router = require("express");
const router = new Router();
const budgetFactController = require("../controllers/budgetFactController");

router.post("/", budgetFactController.create);
router.get("/", budgetFactController.getPeriod);

module.exports = router;
