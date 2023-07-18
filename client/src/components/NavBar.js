import React, { useContext, useState } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, BUDGET_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import CreateItem from "../components/create/CreateItem";
import CreateBudgetItem from "../components/create/CreateBudgetItem";
import CreatePlan from "../components/create/CreatePlan";
import CreateFact from "../components/create/CreateFact";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [itemVisible, setItemVisible] = useState(false);
  const [budgetItemVisible, setBudgetItemVisible] = useState(false);
  const [planVisible, setPlanVisible] = useState(false);
  const [factVisible, setFactVisible] = useState(false);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setId(0);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={BUDGET_ROUTE}>
          Personal budget
        </NavLink>
        <NavLink
          style={{ color: "white" }}
          onClick={() => setItemVisible(true)}
        >
          add Item
        </NavLink>
        <NavLink
          style={{ color: "white" }}
          onClick={() => setBudgetItemVisible(true)}
        >
          add Budget Item
        </NavLink>
        <NavLink
          style={{ color: "white" }}
          onClick={() => setPlanVisible(true)}
        >
          add Plan
        </NavLink>
        <NavLink
          style={{ color: "white" }}
          onClick={() => setFactVisible(true)}
        >
          add Fact
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ml-2"
            >
              Sign out
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Sign in
            </Button>
          </Nav>
        )}
        <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
        <CreateBudgetItem
          show={budgetItemVisible}
          onHide={() => setBudgetItemVisible(false)}
        />
        <CreatePlan show={planVisible} onHide={() => setPlanVisible(false)} />
        <CreateFact show={factVisible} onHide={() => setFactVisible(false)} />
      </Container>
    </Navbar>
  );
});

export default NavBar;
