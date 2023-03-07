import styled from "styled-components";

import {Container} from "@mui/system";

export const PasswordResetContainer = styled(Container)`
  margin: 10vh auto;
  height: 100vh;
  width: 100vw;
  text-align: center;
  color: white;
  align-items: center;

  form {
    background-color: #00000076;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-top: 3vh;
      color: white;
      font-size: 3vh;
      text-transform: uppercase;
      font-family: Irish Grover;
    }
    input {
      margin-bottom: 2vh;
      margin-top: 3vh;
      background-color: transparent;
      padding: 2vh;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 60%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 2vh 5%;
      border: 0;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.8vh;
      font-size: 1rem;
      text-transform: uppercase;
      margin-top: 3vh;
      margin-bottom: 1vh;

      transition: 0.5s ease-ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
      margin-bottom: 3%;
    }
  }
`;
