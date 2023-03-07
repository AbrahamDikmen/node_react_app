import {Box} from "@mui/material";
import styled from "styled-components";

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

export default UserListItem;
