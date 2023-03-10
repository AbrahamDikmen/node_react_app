import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {PasswordResetContainer} from "../components/ui/StyledPasswordReset";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `api/password-reset`;
      const {data} = await axios.post(url, {email});
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };
  console.log(msg);
  return (
    <PasswordResetContainer>
      <form onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {error ? <div>{error}</div> : ""}
        {msg ? <div>{msg}</div> : ""}

        <button type="submit">Submit</button>
        <h1> Back to login page</h1>
        <button type="submit" onClick={() => navigate("/login")}>
          Log in
        </button>
      </form>
    </PasswordResetContainer>
  );
};

export default ForgotPassword;
