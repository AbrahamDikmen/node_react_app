import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Box} from "@mui/system";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export const StyledPolicyTagSettings = styled.p`
  font-size: 15px;
  color: #818d96;
  margin-top: 2em;
`;

export const StyledFormSettings = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  align-items: center;
`;
export const StyledInputFieldSettings = styled(TextField)`
  width: 90%;
`;
export const StyledBoxContainer = styled(Box)`
  display: grid;
  row-gap: 1rem;
`;

export const StyledBoxContainer2 = styled(Box)`
  display: inline-block;
  border-radius: 50px;
  border: 3px solid #fae614;
  height: 65px;
  width: 190px;
  background-color: brown;
  margin-bottom: 20px;
  margin-right: auto;
`;

export const StyledButtonSettings = styled(Button)`
  && {
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

export const StyledButtonSettings2 = styled(Button)`
  width: 200px;

  && {
    border-radius: 35px;
    border: 3px solid #fae614;
    height: 70px;
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
export const StyledIcon = styled(VolumeUpIcon)`
  && {
    font-size: 60px;
    color: #ffffcc;
    text-transform: uppercase;
    text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
    padding-right: 20px;
  }
`;

export const StyledAuthLinksSettings = styled.div``;

export const StyledH2Settings = styled.h2`
  font-family: Irish Grover;
  font-size: 50px;
  margin-bottom: 1rem;
  color: #ffbe33;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191;
`;
