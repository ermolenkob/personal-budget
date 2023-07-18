import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserBudget from "./budgetMain/UserBudget";
import MainBudget from "./budgetMain/MainBudget";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserBudget(),
      mainBudget: new MainBudget(),
    }}
  >
    <App />
  </Context.Provider>
);
