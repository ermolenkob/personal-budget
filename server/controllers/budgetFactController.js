const { BudgetFact, BudgetItems } = require("../models/models");
const sequelize = require("sequelize");
const ApiError = require("../error/ApiError");
const Op = sequelize.Op;

class BudgetFactController {
  async create(req, res, next) {
    try {
      let { date, sum, budgetItemId, userId } = req.body;

      if (!budgetItemId) {
        return next(ApiError.badRequest("Budget Item Id not specified"));
      }

      const budgetItem = await BudgetItems.findOne({
        where: { id: budgetItemId },
      });

      const curSum = sum * budgetItem.coefficient;

      const budgetFact = await BudgetFact.create({
        date,
        sum: curSum,
        budgetItemId,
        userId,
      });
      return res.json(budgetFact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getPeriod(req, res) {
    const { userId, date } = req.query;

    // date - beginning of the month
    const begOfPeriod = new Date(date);
    const endOfPeriod = new Date(
      begOfPeriod.getFullYear(),
      begOfPeriod.getMonth() + 1,
      0
    );

    const budgetFact = await BudgetFact.findAll({
      where: {
        userId,
        date: {
          [Op.between]: [begOfPeriod, endOfPeriod],
        },
      },
      attributes: [
        "budgetItemId",
        [sequelize.fn("SUM", sequelize.col("sum")), "sum"],
      ],
      group: "budgetItemId",
    });
    return res.json(budgetFact);
  }
}

module.exports = new BudgetFactController();
