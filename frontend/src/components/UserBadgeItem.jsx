import * as React from "react";
import Stack from "@mui/material/Stack";
import {Box, Button} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
const UserBadgeItem = ({user, handleFunction, admin}) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginLeft: 1,
        marginTop: "2vh",
        marginBottom: "2vh",
        backgroundColor: "#997af0",
        cursor: "pointer",
        color: "white",
        font: "bold",
        borderRadius: "1vh",

        "&:hover": {
          backgroundColor: "#4e0eff",
        },
      }}
      onClick={handleFunction}
    >
      <Stack>
        <Button
          style={{
            color: "white",
          }}
          endIcon={<ClearIcon />}
        >
          {user.name}
          {admin === user._id && <span> (Admin)</span>}
        </Button>
      </Stack>
    </Box>
  );
};

export default UserBadgeItem;
