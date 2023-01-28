import styled from "styled-components";

import {Container} from "@mui/system";

export const AccountContainer = styled(Container)`
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
      text-transform: uppercase;
      font-family: Irish Grover;
    }

    .avatar {
      img {
        height: 20vh;
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
