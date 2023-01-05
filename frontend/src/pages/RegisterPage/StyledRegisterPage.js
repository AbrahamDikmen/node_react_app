import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const StyledFormRegister = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 2rem auto;
  text-align: center;
`;

export const StyledH2Register = styled.h2`
  font-family: Irish Grover;
  font-size: 50px;
  margin-bottom: 1rem;
  color: #ffbe33;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
`;

export const StyledInputFieldRegister = styled(TextField)`
  && {
    width: 90%;
    margin-top: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    margin-top: 4%;
  }
`;

export const StyledPolicyTagRegister = styled.p`
  font-size: 15px;
  color: #ffbe33;
`;

export const StyledH1Register = styled.div`
  font-size: 19px;
  margin-top: 15px;
  color: #3d4d49;
  font-family: 'Jacques Francois';
`;

export const StyledButtonRegister = styled(Button)`
  && {
    max-width: 350px;
    width: 90%;
    background-color: #8633c8;
    margin-top: 2em;
    color: white;
    font-family: Irish Grover;
    font-size: 15px;
    border: none;
    border-radius: 6;
    background-size: 200%;
    margin-bottom: 2em;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.5);
    background-image: linear-gradient(45deg, #ffc312, #ee5a24, #ffff00);
  }

  &:hover {
    background-position: right;
    transition: 0.5s;
  }
`;

export const StyledSectionRegister = styled.section``;
