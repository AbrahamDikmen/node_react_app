import styled from "styled-components";
import {Container, Box, Input, TextField} from "@mui/material";
import {Button} from "@mui/material";

export const ContactsContainer = styled(Container)`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow: auto;
    text-align: center;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      margin: 1vh auto;
      text-align: center;
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;

      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          margin: 1vh;
          height: 5vh;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;

    .avatar {
      img {
        height: 7vh;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      .username {
        h2 {
          font-size: 1rem;
        }
      }
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
  }
`;
export const ContactsBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px 10px 5px 10px;
  border-width: 5px;
`;
