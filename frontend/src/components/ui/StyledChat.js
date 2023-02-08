import styled from "styled-components";

import {Container} from "@mui/system";

export const ContainerChat = styled(Container)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;

  gap: 1rem;

  background-color: #131324;
  overflow: hidden;

  .header {
    padding-bottom: 1vh;
  }
  h1 {
    margin-top: 3vh;
    color: white;
    text-transform: uppercase;
    font-family: Irish Grover;
  }

  .container {
    height: 85vh;

    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
