import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import { createBudgetItem } from "../../http/budgetAPI";
import { Context } from "../../index";
import { fetchItem } from "../../http/budgetAPI";
import { observer } from "mobx-react-lite";

const CreateBudgetItem = observer(({ show, onHide }) => {
  const { mainBudget } = useContext(Context);
  const [value, setValue] = useState("");
  const [coefficient, setCoefficient] = useState("");

  useEffect(() => {
    fetchItem().then((data) => {
      mainBudget.setItem(data);
    });
  }, []);

  const addBudgetItem = () => {
    createBudgetItem({
      coefficient: coefficient,
      itemId: mainBudget.selectedItem.id,
    }).then((data) => {
      setValue("");
      setCoefficient("");
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Budget Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={coefficient}
            onChange={(e) => setCoefficient(e.target.value)}
            placeholder={"Enter coefficient"}
          />
        </Form>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {mainBudget.selectedItem.name || "Select item"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {mainBudget.item.map((item) => (
                <Dropdown.Item
                  onClick={() => mainBudget.setSelectedItem(item)}
                  key={item.id}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addBudgetItem}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateBudgetItem;
