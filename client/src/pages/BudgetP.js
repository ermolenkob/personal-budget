import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import DatePicker from "react-datepicker";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import {
  fetchBudgetPlan,
  fetchBudgetFact,
  fetchBudgetItem,
  fetchItem,
} from "../http/budgetAPI";
import "react-datepicker/dist/react-datepicker.css";
import { LOGIN_ROUTE } from "../utils/consts";
import TableBudget from "../components/TableBudget";

const Budget = observer(() => {
  const { user, mainBudget } = useContext(Context);
  const navigate = useNavigate();
  let [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!user.isAuth) navigate(LOGIN_ROUTE);

    var month = startDate.getUTCMonth() + 1;
    var day = startDate.getUTCDate();
    var year = startDate.getUTCFullYear();

    startDate = year + "-" + month + "-" + day + " 00:00:00";

    if (mainBudget.date !== startDate) mainBudget.setDate(startDate);

    fetchBudgetPlan(user.id, mainBudget.date).then((data) =>
      mainBudget.setPlan(data)
    );
    fetchBudgetFact(user.id, mainBudget.date).then((data) => {
      mainBudget.setFact(data);
    });
    fetchBudgetItem().then((data) => {
      mainBudget.setBudgetItem(data);
    });
    fetchItem().then((data) => {
      mainBudget.setItem(data);
    });
  }, [startDate]);

  return (
    <Container>
      <Col className="mt-2 mb-2">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
        <TableBudget />
      </Col>
    </Container>
  );
});

export default Budget;
