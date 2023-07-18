import { LOGIN_ROUTE, REGISTRATION_ROUTE, BUDGET_ROUTE } from "./utils/consts";
import Auth from "./pages/AuthP";
import Budget from "./pages/BudgetP";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },

  {
    path: BUDGET_ROUTE,
    Component: Budget,
  },
];
