import { makeAutoObservable } from "mobx";

export default class MainBudget {
  constructor() {
    this._date = new Date();
    this._plan = [];
    this._fact = [];
    this._item = [];
    this._budgetItem = [];
    this._selectedItem = {};
    this._selectedBudgetItem = {};
    makeAutoObservable(this);
  }

  setDate(date) {
    this._date = date;
  }
  setPlan(plan) {
    this._plan = plan;
  }
  setFact(fact) {
    this._fact = fact;
  }
  setItem(item) {
    this._item = item;
  }
  setBudgetItem(budgetItem) {
    this._budgetItem = budgetItem;
  }
  setSelectedItem(selectedItem) {
    this._selectedItem = selectedItem;
  }
  setSelectedBudgetItem(selectedBudgetItem) {
    this._selectedBudgetItem = selectedBudgetItem;
  }

  get date() {
    return this._date;
  }
  get plan() {
    return this._plan;
  }
  get fact() {
    return this._fact;
  }
  get item() {
    return this._item;
  }
  get budgetItem() {
    return this._budgetItem;
  }
  get selectedItem() {
    return this._selectedItem;
  }
  get selectedBudgetItem() {
    return this._selectedBudgetItem;
  }
}
