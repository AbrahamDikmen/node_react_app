import {Avatar} from "@chakra-ui/avatar";
import {Box, Text} from "@mui/material";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
const UserListItem = ({user, handleFunction}) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        backgroundColor: "#E8E8E8",
        width: "100%",
        display: "flex",
        alignItems: "center",
        color: "black",
        fontSize: "0.5vw",
        marginBottom: 2,
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#997af0",
        },
      }}
    >
      <div
        style={{
          cursor: "pointer",
          alignItems: "center",
          textAlign: "center",
          display: "flex",
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${user.avatarImage}`}
          alt=""
          style={{
            marginLeft: "1vh",
          }}
        />
        <div
          style={{
            marginLeft: "1vh",
          }}
        >
          <h1>{user.name}</h1>
        </div>
      </div>
    </Box>
  );
};
const Container = styled.div`
  cursor: pointer;
  margin-top: 0;
  display: flex;
  text-align: center;
  align-items: center;
  color: white;
  width: 80%;
  align-items: center;

  form {
    margin-top: 2vh;
    text-align: center;
    background-color: #00000076;
    border-radius: 2rem;

    align-items: center;
    height: 25vh;

    margin-left: 2vh;
    margin-right: 2vh;
    text-align: center;
    color: white;
    &:hover {
      background-color: #997af0;
    }
    h3 {
      justify-content: space-between;

      font-size: 3vh;
      color: white;
      text-transform: uppercase;
      font-family: Irish Grover;
    }

    .avatar {
      img {
        margin-right: 2;
        size: 2vh;
      }
    }
  }
`;
export default UserListItem;
