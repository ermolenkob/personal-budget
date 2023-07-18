import { makeAutoObservable } from "mobx";

export default class UserBudget {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._id = 0;
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setUser(user) {
    this._user = user;
  }
  setId(id) {
    this._id = id;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
  get id() {
    return this._id;
  }
}
