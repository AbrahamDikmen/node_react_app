import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';

export const StyledPTag = styled.p`
  font-family: Irish Grover;
  font-size: 20px;
  margin-bottom: 1rem;
  color: #ffffcc;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
`;

export const StyledFormHome = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export const StyledBox = styled.button`
  && {
    margin-left: 15px;
    width: 90%;
    border-radius: 30px;
    border: 3px solid #fae614;
    height: 80px;
    font-family: Irish Grover;
    font-size: 20px;
    margin-bottom: 1rem;
    color: #ffffcc;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
  }
  && {
    background-size: 200%;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.5);
    background-image: linear-gradient(45deg, #ffc312, #ee5a24, #ffff00);
  }
  &:hover {
    background-position: right;
    transition: 0.5s;
  }
`;
export const StyledBoxContainerWrapper = styled(Box)`
  && {
    border-radius: 30px;
    border: 3px solid #fae614;
    background-color: blue;
  }
`;

export const StyledBoxContainerHomePage = styled(Box)`
  && {
    border-radius: 30px;
    border: 2px solid #fae614;
    margin: 20px;
    height: 350px;
    background-color: white;
    margin-bottom: 20px;
  }
`;

export const StyledBoxContainerButtons = styled(Box)`
  && {
    display: grid;
    row-gap: 2rem;
  }
`;
export const StyledSectionHome = styled.section``;

export const StyledH2Home = styled.h2`
  font-family: Irish Grover;
  font-size: 50px;
  margin-bottom: 1rem;
  color: #fae614;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
`;

export const StyledIconContext = styled.div``;
