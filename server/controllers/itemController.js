const { Items } = require("../models/models");

class ItemController {
  async create(req, res) {
    const { name } = req.body;
    const Item = await Items.create({ name });
    return res.json(Item);
  }

  async getAll(req, res) {
    const allItems = await Items.findAll();
    return res.json(allItems);
  }
}

module.exports = new ItemController();
