import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({component, ...rest}) => {
  const auth = useSelector((state) => state.auth);
  console.log(auth.token);

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
