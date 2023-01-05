import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import { StyledFormLogin, StyledButtonLogin } from '../../pages/loginPage/StyledLoginPage';
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:4000/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <StyledFormLogin>
      {validUrl ? (
        <div>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <StyledButtonLogin>Login</StyledButtonLogin>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </StyledFormLogin>
  );
};

export default EmailVerify;
