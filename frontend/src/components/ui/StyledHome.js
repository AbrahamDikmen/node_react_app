import styled from "styled-components";

import {Container} from "@mui/system";

export const HomeContainer = styled(Container)`
  margin: 10vh auto;
  height: 100vh;
  width: 100%;
  text-align: center;
  color: white;
  align-items: center;

  form {
    background-color: #00000076;
    border-radius: 2rem;

    align-items: center;
    justify-content: space-around;
    color: white;
    position: relative;

    .icons {
      display: flex;
      align-items: center;

      .icon {
        cursor: pointer;
        position: absolute;
        margin-top: 2vh;
        margin-right: 2vh;
        right: 0;

        .iconImg {
          height: 6vh;
          color: white;
        }
        .counter {
          width: 2vh;
          height: 2vh;
          background-color: red;
          border-radius: 50%;
          padding: 1.2vh;
          font-size: 2vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: -0.2vh;
          right: -0.2vh;
        }
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        img {
          height: 20vh;
        }
      }
      .notification {
        cursor: pointer;
        height: 6vh;
        margin-left: 40%;
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
  }
`;
