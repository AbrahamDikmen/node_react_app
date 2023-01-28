import {useSelector} from "react-redux";

import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector((state) => state.token);
  let isManager = false;
  let isAdmin = false;
  let status = "Emloyee";

  if (token) {
    const decoded = jwtDecode(token);
    const {name, roles} = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return {name, roles, status, isManager, isAdmin};
  }
  return {name: "", roles: [], isManager, isAdmin, status};
};

export default useAuth;
