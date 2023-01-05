import {useDispatch, useSelector} from "react-redux";
import {
  StyledBox,
  StyledBoxContainerButtons,
  StyledBoxContainerHomePage,
  StyledBoxContainerWrapper,
  StyledButtonHome,
  StyledInputFieldHome,
  StyledFormHome,
  StyledH1Home,
  StyledH2Home,
} from "./StyledHomePage";

import {useNavigate, navigate} from "react-router";
import {useEffect} from "react";

const HomePage = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  console.log(auth);

  const forceLogout = useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);

  return (
    <StyledFormHome>
      <StyledH2Home>Chat Box</StyledH2Home>

      <StyledBoxContainerHomePage />

      <StyledBoxContainerButtons>
        <StyledBox onClick={() => navigate("/gamemodes")}>Play</StyledBox>

        {auth._id ? "" : forceLogout}

        <StyledBox onClick={() => navigate("/settings")}>Settings</StyledBox>
      </StyledBoxContainerButtons>
    </StyledFormHome>
  );
};

export default HomePage;
