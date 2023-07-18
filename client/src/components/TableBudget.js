import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Table from "react-bootstrap/Table";
import StringBudget from "../components/StringBudget";

const TableBudget = observer(() => {
  const { mainBudget } = useContext(Context);
  const { budgetItem, fact, plan } = mainBudget;
  let ind = 1;

  return (
    <Table className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Coefficient</th>
          <th>Item</th>
          <th>Sum plan</th>
          <th>Sum fact</th>
          <th>Difference</th>
        </tr>
      </thead>
      <tbody>
        {budgetItem.map((budgetItem) => (
          <StringBudget
            key={ind++}
            budgetItem={budgetItem}
            facts={fact}
            plans={plan}
            ind={ind}
          />
        ))}
      </tbody>
    </Table>
  );
});

export default TableBudget;
