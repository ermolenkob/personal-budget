import React from "react";
import { observer } from "mobx-react-lite";
import Image from "react-bootstrap/Image";
import plus from "../img/plus.png";
import minus from "../img/minus.png";

const coefficient = (coefficient) => {
  if (coefficient === 1) {
    return <Image width={18} height={18} src={plus} />;
  }
  return <Image width={18} height={18} src={minus} />;
};

const StringBudget = observer(({ budgetItem, facts, plans, ind }) => {
  let sumPlan = 0;
  let sumFact = 0;
  const splitName = budgetItem.name.split(" ", 1);

  const plan = plans.find(function (curPlan) {
    return curPlan.budgetItemId === budgetItem.itemId;
  });
  if (plan) sumPlan = plan.sum;

  const fact = facts.find(function (curFact) {
    return curFact.budgetItemId === budgetItem.itemId;
  });
  if (fact) sumFact = fact.sum;

  return (
    <tr>
      <td>{ind}</td>
      <td>{coefficient(budgetItem.coefficient)}</td>
      <td>{splitName}</td>
      <td>{sumPlan}</td>
      <td>{sumFact}</td>
      <td>{Number(sumFact) - Number(sumPlan)}</td>
    </tr>
  );
});

export default StringBudget;
