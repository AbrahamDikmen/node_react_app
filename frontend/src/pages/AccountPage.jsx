import React, {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {AccountContainer} from "../components/ui/StyledAccount";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth.name);
  return (
    <AccountContainer>
      <form>
        <h1>Account</h1>
        {auth.name ? <h2> {auth.name} </h2> : <h2> NOBODY IS signed</h2>}

        <button>Friend List</button>

        <button onClick={() => navigate("/settings")}>settings</button>
      </form>
    </AccountContainer>
  );
};

export default AccountPage;
