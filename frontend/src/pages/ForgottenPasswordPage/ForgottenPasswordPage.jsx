import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  StyledFormLogin,
  StyledInputFieldLogin,
  StyledButtonLogin,
  StyledH1Login,
  StyledH2Login,
} from '../../pages/loginPage/StyledLoginPage';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:4000/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError('');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        setMsg('');
      }
    }
  };

  return (
    <div>
      <StyledFormLogin onSubmit={handleSubmit}>
        <StyledH2Login>Forgot Password</StyledH2Login>
        <StyledInputFieldLogin
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {error && <div>{error}</div>}
        {msg && <div>{msg}</div>}

        <StyledButtonLogin type="submit">Submit</StyledButtonLogin>
        <StyledH1Login> Back to login page</StyledH1Login>
        <StyledButtonLogin type="submit" onClick={() => navigate('/login')}>
          Log in
        </StyledButtonLogin>
      </StyledFormLogin>
    </div>
  );
};

export default ForgotPassword;
