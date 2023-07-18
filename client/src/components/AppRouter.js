import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "../routes";
import { LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => {
        return <Route exact key={path} path={path} element={<Component />} />;
      })}
      {<Route path="*" element={<Navigate replace to={LOGIN_ROUTE} />} />}
    </Routes>
  );
};

export default AppRouter;
