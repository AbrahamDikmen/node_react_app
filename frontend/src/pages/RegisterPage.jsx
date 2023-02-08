import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../features/authSlice";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {RegisterContainer} from "../components/ui/StyledRegister";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(auth);

  const [meter, setMeter] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: user.password.match(atLeastOneUppercase),
    lowercase: user.password.match(atLeastOneLowercase),
    number: user.password.match(atLeastOneNumeric),
    specialChar: user.password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: user.password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value
  ).length;
  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dispatch(registerUser(user))) {
      navigate("/login");
    }
  };

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <h1>ChatBox</h1>

        <input
          placeholder="Username"
          type="text"
          onChange={(e) => setUser({...user, name: e.target.value})}
        />

        <input
          placeholder="E-mail"
          type="text"
          onChange={(e) => setUser({...user, email: e.target.value})}
        />

        <input
          onFocus={() => setMeter(true)}
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({...user, password: e.target.value})}
        />

        <input
          placeholder="Confirm password"
          type="password"
          onChange={(e) => setUser({...user, repeat_password: e.target.value})}
        />

        <button type="submit">
          {auth.registerStatus === "pending" ? "Submiting" : "Create user"}
        </button>

        {auth.registerStatus === "rejected" ? (
          <span className="registerError"> {auth.registerError} </span>
        ) : null}

        {meter && (
          <div>
            <div className="password-strength-meter"></div>

            <div className="text">
              {passwordStrength < 5 && "PASSWORD must contain: "}
              {!passwordTracker.uppercase && "Uppercase, "}
              {!passwordTracker.lowercase && "Lowercase, "}
              {!passwordTracker.specialChar && "Special character, "}
              {!passwordTracker.number && "Number, "}
              {!passwordTracker.eightCharsOrGreater &&
                "eight characters or more"}
            </div>
          </div>
        )}
        <p>
          By signing up, you agree to our Terms. Learn how we collect, use and
          share your data in our Data Policy and how we use cookies and similar
          technology in our Cookies Policy
        </p>

        <span>
          Already Have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <style jsx="true">
        {`
          .password-strength-meter {
            height: 0.3rem;
            background-color: lightgrey;
            border-radius: 3px;
            margin: 0.5rem 0;
          }

          .password-strength-meter::before {
            content: "";
            background-color: ${[
              "red",
              "orange",
              "#03a2cc",
              "#03a2cc",
              "#0ce052",
            ][passwordStrength - 1] || ""};
            height: 100%;
            width: ${(passwordStrength / 5) * 100}%;
            display: block;
            border-radius: 3px;
            transition: width 0.2s;
          }
          .text {
            color: white;
          }
        `}
      </style>
    </RegisterContainer>
  );
};

export default RegisterPage;
