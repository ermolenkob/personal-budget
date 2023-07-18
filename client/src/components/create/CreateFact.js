import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { createBudgetFact } from "../../http/budgetAPI";
import { Context } from "../../index";
import { fetchBudgetItem } from "../../http/budgetAPI";
import { observer } from "mobx-react-lite";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateFact = observer(({ show, onHide }) => {
  const { user, mainBudget } = useContext(Context);
  const [valSum, setValSum] = useState("");
  const [valDate, setValDate] = useState(new Date());

  useEffect(() => {
    fetchBudgetItem().then((data) => {
      mainBudget.setBudgetItem(data);
    });
  }, []);

  const addFact = () => {
    createBudgetFact({
      date: valDate,
      sum: valSum,
      userId: user.id,
      budgetItemId: mainBudget.selectedBudgetItem.id,
    }).then((data) => {
      setValDate("");
      setValSum("");
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Budget Fact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {mainBudget.selectedBudgetItem.name || "Select budget item"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {mainBudget.budgetItem.map((budgetItem) => (
                <Dropdown.Item
                  onClick={() => mainBudget.setSelectedBudgetItem(budgetItem)}
                  key={budgetItem.id}
                >
                  {budgetItem.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
        <Form>
          <DatePicker
            selected={valDate}
            onChange={(date) => setValDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </Form>
        <Form>
          <Form.Control
            value={valSum}
            onChange={(e) => setValSum(e.target.value)}
            placeholder={"Enter sum"}
            className="mt-2 mb-2"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addFact}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateFact;
