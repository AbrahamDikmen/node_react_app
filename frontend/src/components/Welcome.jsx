import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import Robot from "../assets/robot.gif";
import {useNavigate} from "react-router";
const Welcome = () => {
  const auth = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadData = async () => {
      setUserName(auth.name);
    };
    loadData();
  }, [auth.name]);
  return (
    <Container>
      <button onClick={() => navigate("/login")}>Home</button>
      <h1>
        Welcome <span>{userName}!</span>
      </h1>
      <img src={Robot} alt="" />
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  margin: 5vh auto;
  height: 100%;
  width: 100%;
  text-align: center;
  color: white;
  align-items: center;

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
  h1 {
    font-size: 120%;
  }
  img {
    height: 30%;
  }
  span {
    font-size: 100%;
    color: #4e0eff;
  }
`;
export default Welcome;
