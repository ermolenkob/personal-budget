const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Items = sequelize.define("items", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
});

const BudgetItems = sequelize.define("budget_items", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true },
  coefficient: { type: DataTypes.INTEGER },
});

const BudgetPlan = sequelize.define("budget_plan", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  period: { type: DataTypes.DATE },
  sum: { type: DataTypes.INTEGER },
});

const BudgetFact = sequelize.define("budget_fact", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  sum: { type: DataTypes.INTEGER },
});

Items.hasOne(BudgetItems);
BudgetItems.belongsTo(Items);

BudgetItems.hasOne(BudgetPlan);
BudgetPlan.belongsTo(BudgetItems);

BudgetItems.hasOne(BudgetFact);
BudgetFact.belongsTo(BudgetItems);

User.hasOne(BudgetPlan);
BudgetPlan.belongsTo(User);

User.hasOne(BudgetFact);
BudgetFact.belongsTo(User);

module.exports = {
  User,
  BudgetPlan,
  BudgetFact,
  BudgetItems,
  Items,
};
