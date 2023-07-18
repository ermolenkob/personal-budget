const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const itemRouter = require("./itemRouter");
const budgetItemRouter = require("./budgetItemRouter");
const budgetPlanRouter = require("./budgetPlanRouter");
const budgetFactRouter = require("./budgetFactRouter");

router.use("/user", userRouter);
router.use("/item", itemRouter);
router.use("/budgetItem", budgetItemRouter);
router.use("/budgetPlan", budgetPlanRouter);
router.use("/budgetFact", budgetFactRouter);

module.exports = router;
