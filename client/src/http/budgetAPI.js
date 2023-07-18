import { $authHost, $host } from "./index";

export const createItem = async (item) => {
  const { data } = await $authHost.post("api/item", item);
  return data;
};

export const fetchItem = async () => {
  const { data } = await $host.get("api/item");
  return data;
};

export const createBudgetItem = async (budgetItem) => {
  const { data } = await $authHost.post("api/budgetItem", budgetItem);
  return data;
};

export const fetchBudgetItem = async () => {
  const { data } = await $host.get("api/budgetItem");
  return data;
};

export const createBudgetPlan = async (budgetPlan) => {
  const { data } = await $authHost.post("api/budgetPlan", budgetPlan);
  return data;
};

export const fetchBudgetPlan = async (userId, period) => {
  const { data } = await $host.get("api/budgetPlan", {
    params: {
      userId,
      period,
    },
  });
  return data;
};

export const createBudgetFact = async (budgetFact) => {
  const { data } = await $authHost.post("api/budgetFact", budgetFact);
  return data;
};

export const fetchBudgetFact = async (userId, date) => {
  const { data } = await $host.get("api/budgetFact", {
    params: {
      userId,
      date,
    },
  });
  return data;
};
