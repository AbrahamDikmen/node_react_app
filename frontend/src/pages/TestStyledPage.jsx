//import data

import React from "react";
import {HomeContainer} from "../components/ui/StyledHome";
import {useNavigate} from "react-router-dom";

const TestStyledPage = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <HomeContainer>
      <form>
        <h1>Chat Box</h1>

        <div />

        <button onClick={onClick}>Home</button>

        <button>Settings</button>
      </form>
    </HomeContainer>
  );
};

export default TestStyledPage;
