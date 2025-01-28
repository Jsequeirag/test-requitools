import Login from "../pages/Login/Login";

import { Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";

import NewRequisition from "../pages/NewRequisition/NewRequisition";
import Requisitions from "../pages/Requisitions/Requisitions";
//https://dev.to/kachiic/the-right-way-structure-your-react-router-1i3l
export default [
  {
    path: "login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "home",
    element: <Home />,
    title: "Home",
  },
  {
    path: "newRequisition",
    element: <NewRequisition />,
    title: "newRequisition",
  },
  {
    path: "requisitions",
    element: <Requisitions />,
    title: "Requisitions",
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
    title: "Requisitions",
  },
];
