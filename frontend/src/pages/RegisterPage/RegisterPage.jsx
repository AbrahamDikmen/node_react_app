import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../features/authSlice";
import {useNavigate} from "react-router";
import {
  StyledButtonRegister,
  StyledFormRegister,
  StyledInputFieldRegister,
  StyledSectionRegister,
  StyledPolicyTagRegister,
  StyledH1Register,
  StyledH2Register,
} from "./StyledRegisterPage";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(user));
  };

  return (
    <StyledFormRegister onSubmit={handleSubmit}>
      <StyledSectionRegister>
        {/* ICON*/}
        <StyledH2Register>Rememo</StyledH2Register>
      </StyledSectionRegister>
      <StyledSectionRegister>
        <StyledInputFieldRegister
          label="Display name"
          type="text"
          onChange={(e) => setUser({...user, name: e.target.value})}
        />

        <StyledInputFieldRegister
          label="E-mail"
          type="text"
          onChange={(e) => setUser({...user, email: e.target.value})}
        />

        <StyledInputFieldRegister
          label="Password"
          type="password"
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <StyledInputFieldRegister
          label="Confirm password"
          type="password"
          onChange={(e) => setUser({...user, repeat_password: e.target.value})}
        />
      </StyledSectionRegister>
      <StyledButtonRegister type="submit">
        {auth.registerStatus === "pending" ? "Submiting" : "Next"}
      </StyledButtonRegister>
      {auth.registerStatus === "rejected" ? <p>{auth.registerError}</p> : null}

      <StyledPolicyTagRegister>
        By signing up, you agree to our Terms. Learn how we collect, use and
        share your data in our Data Policy and how we use cookies and similar
        technology in our Cookies Policy
      </StyledPolicyTagRegister>
      <StyledH1Register> Have an account?</StyledH1Register>
      <StyledButtonRegister type="submit" onClick={() => navigate("/login")}>
        Log in
      </StyledButtonRegister>
    </StyledFormRegister>
  );
};

export default RegisterPage;
