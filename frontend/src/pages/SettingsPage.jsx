import React, {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logoutUser} from "../features/authSlice";
import {useNavigate} from "react-router";
import {SettingsContainer} from "../components/ui/StyledSettings";

const SettingsPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forceLogout = useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);

  return (
    <SettingsContainer>
      <form>
        <h1>Settings</h1>

        <button>Rate us</button>

        <button onClick={() => navigate("/account")}>Account</button>
        {auth._id ? (
          <button
            onClick={() => {
              dispatch(logoutUser(null));
            }}
          >
            Logout
          </button>
        ) : (
          forceLogout
        )}

        <button onClick={() => navigate("/")}>home</button>
      </form>
    </SettingsContainer>
  );
};

export default SettingsPage;
