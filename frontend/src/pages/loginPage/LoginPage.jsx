import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {loginUser} from "../../features/authSlice";
import {Link} from "react-router-dom";

import {
  StyledFormLogin,
  StyledInputFieldLogin,
  StyledSectionLogin,
  StyledButtonLogin,
  StyledH1Login,
  StyledPolicyTagLogin,
  StyledH2Login,
  StyledH1LoginForgotPw,
} from "./StyledLoginPage";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(user));
  };

  return (
    <StyledFormLogin onSubmit={handleSubmit}>
      <StyledSectionLogin className="loginHeading">
        <StyledH2Login>Chat Box</StyledH2Login>
      </StyledSectionLogin>
      <StyledSectionLogin>
        <StyledInputFieldLogin
          style={{marginTop: "4vh"}}
          label="Display name"
          type="text"
          variant="outlined"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, name: e.target.value})}
        />

        <StyledInputFieldLogin
          style={{marginTop: "4vh"}}
          label="Password"
          type="password"
          variant="outlined"
          inputProps={{style: {fontFamily: "Arial", backgroundColor: "white"}}}
          onChange={(e) => setUser({...user, password: e.target.value})}
        />
      </StyledSectionLogin>

      <StyledButtonLogin type="submit" variant="contained">
        {auth.loginStatus === "pending" ? "Submiting" : "Log in"}
      </StyledButtonLogin>
      <StyledPolicyTagLogin>-----</StyledPolicyTagLogin>

      <StyledH1LoginForgotPw>
        {" "}
        Forgot password? <Link to="/forgot-password">Reset password</Link>
      </StyledH1LoginForgotPw>

      {auth.loginStatus === "rejected" ? <p>{auth.loginError}</p> : null}

      <StyledH1Login> Don't have an account?</StyledH1Login>
      <StyledButtonLogin
        type="submit"
        variant="contained"
        onClick={() => navigate("/register")}
      >
        Sign up
      </StyledButtonLogin>
    </StyledFormLogin>
  );
};

export default LoginPage;
