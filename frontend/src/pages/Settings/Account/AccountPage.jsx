import React, {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import {
  StyledSectionAccount,
  StyledButtonAccount,
  StyledButtonAccount2,
  StyledInputFieldAccount,
  StyledFormAccount,
  StyledH1Account,
  StyledH2Account,
  StyledBoxContainer,
} from "./StyledAccountPage";

import {useEffect} from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth.name);
  return (
    <StyledFormAccount>
      <StyledH2Account>Account</StyledH2Account>
      {auth.name ? <h2> {auth.name} </h2> : <h2> NOBODY IS signed</h2>}
      <StyledBoxContainer>
        <StyledButtonAccount>Friend List</StyledButtonAccount>
      </StyledBoxContainer>
      <StyledButtonAccount2
        style={{marginTop: "60px"}}
        onClick={() => navigate("/settings")}
        endIcon={
          <ArrowBackIosNewIcon
            style={{
              fontSize: "60px",
              textAlign: "center",
              alignItems: "center",
              marginRight: "10px",
            }}
          />
        }
      ></StyledButtonAccount2>
    </StyledFormAccount>
  );
};

export default AccountPage;
