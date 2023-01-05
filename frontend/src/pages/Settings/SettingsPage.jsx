import React, {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {Switch} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

import {
  StyledIcon,
  StyledButtonSettings2,
  StyledButtonSettings,
  StyledFormSettings,
  StyledH2Settings,
  StyledBoxContainer,
  StyledBoxContainer2,
} from "./StyledSettingsComponent";
import {logoutUser} from "../../features/authSlice";
import {useNavigate} from "react-router";

import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const SettingsComponent = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(auth);

  const forceLogout = useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);

  const [checked, setChecked] = useState(false);

  const switchHandler = (e) => {
    setChecked(e.target.checked);
  };

  const CustomSwitch = withStyles({
    root: {
      width: "90px",
      height: "50px",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "50px",
    },
    colorSecondary: {
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#1b5e20",
      },
    },
    track: {
      width: "60px",
      height: "21px",
      borderRadius: "10px",
      backgroundColor: "black",
    },
    switchBase: {
      "&$checked": {
        color: "#1b5e20",
        transform: "translateX(40px)",
      },
      "& + $track": {
        backgroundColor: "white",
        color: "#00c853",
      },
    },
    checked: {},
    thumb: {
      width: "33px",
      height: "33px",
      transform: "translateX(0px)",
    },
  })(Switch);

  return (
    <StyledFormSettings>
      <StyledH2Settings>Settings</StyledH2Settings>

      <StyledBoxContainer2>
        <StyledIcon startIcon={<VolumeUpIcon />}></StyledIcon>

        <CustomSwitch />
      </StyledBoxContainer2>

      <StyledBoxContainer>
        <StyledButtonSettings>Rate us</StyledButtonSettings>

        <StyledButtonSettings onClick={() => navigate("/account")}>
          Account
        </StyledButtonSettings>
        {auth._id ? (
          <StyledButtonSettings
            endIcon={<LogoutIcon />}
            onClick={() => {
              dispatch(logoutUser(null));
            }}
          >
            Logout
          </StyledButtonSettings>
        ) : (
          forceLogout
        )}
      </StyledBoxContainer>
      <StyledButtonSettings2
        style={{marginTop: "60px"}}
        onClick={() => navigate("/")}
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
      ></StyledButtonSettings2>
    </StyledFormSettings>
  );
};

export default SettingsComponent;
