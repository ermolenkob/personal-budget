const { BudgetItems, Items } = require("../models/models");
const ApiError = require("../error/ApiError");

class BudgetItemsController {
  async create(req, res, next) {
    try {
      let { coefficient, itemId } = req.body;

      const Item = await Items.findOne({
        where: { id: itemId },
      });

      const name = `${Item.name} (${coefficient})`;

      const budgetItem = await BudgetItems.create({
        name,
        coefficient,
        itemId,
      });
      return res.json(budgetItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const budgetItem = await BudgetItems.findAll();
    return res.json(budgetItem);
  }
}

module.exports = new BudgetItemsController();
