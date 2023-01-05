import { useState, useEffect, Fragment } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { StyledFormLogin, StyledInputFieldLogin, StyledButtonLogin, StyledH2Login } from '../loginPage/StyledLoginPage';

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const param = useParams();
  const url = `http://localhost:4000/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError('');
      window.location = '/login';
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        setMsg('');
      }
    }
  };

  return (
    <Fragment>
      {validUrl ? (
        <StyledFormLogin onSubmit={handleSubmit}>
          <StyledH2Login>Add New Password</StyledH2Login>
          <StyledInputFieldLogin
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          {error && <div>{error} </div>}
          {msg && <div>{msg} </div>}
          <StyledButtonLogin type="submit" variant="contained">
            Submit
          </StyledButtonLogin>
        </StyledFormLogin>
      ) : (
        <h1> 404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;