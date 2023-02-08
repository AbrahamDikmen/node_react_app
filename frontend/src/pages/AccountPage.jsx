import {useEffect} from "react";
import React, {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {AccountContainer} from "../components/ui/StyledAccount";

const AccountPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);
  console.log(auth.name);
  return (
    <AccountContainer>
      <form>
        <h1>Account</h1>

        {auth.name ? <h2> {auth.name} </h2> : <h2> NOBODY IS signed</h2>}
        {auth.email}

        <button onClick={() => navigate("/settings")}>settings</button>
      </form>
    </AccountContainer>
  );
};

export default AccountPage;
