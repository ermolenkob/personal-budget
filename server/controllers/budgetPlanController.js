const { BudgetPlan, BudgetItems } = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require("sequelize");
const Op = sequelize.Op;

class BudgetPlanController {
  async create(req, res, next) {
    try {
      let { period, sum, budgetItemId, userId } = req.body;

      if (!budgetItemId) {
        return next(ApiError.badRequest("Budget Item Id not specified"));
      }

      const budgetItem = await BudgetItems.findOne({
        where: { id: budgetItemId },
      });

      const curSum = sum * budgetItem.coefficient;

      const budgetPlan = await BudgetPlan.create({
        period,
        sum: curSum,
        budgetItemId,
        userId,
      });
      return res.json(budgetPlan);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getPeriod(req, res) {
    const { userId, period } = req.query;

    const begOfPeriod = new Date(period);
    const endOfPeriod = new Date(
      begOfPeriod.getFullYear(),
      begOfPeriod.getMonth() + 1,
      0
    );

    const budgetPlan = await BudgetPlan.findAll({
      where: {
        userId,
        period: {
          [Op.between]: [begOfPeriod, endOfPeriod],
        },
      },
      attributes: [
        "budgetItemId",
        [sequelize.fn("SUM", sequelize.col("sum")), "sum"],
      ],
      group: "budgetItemId",
    });
    return res.json(budgetPlan);
  }
}

module.exports = new BudgetPlanController();
