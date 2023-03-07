import React, {useState} from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Avatar} from "@mui/material";
const ProfileModel = ({children, currentUser}) => {
  const [open, setOpen] = useState(false);

  const style = {
    m: "14vh auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <VisibilityIcon style={{display: "flex"}} onClick={handleOpen} />
      )}

      <Modal open={open}>
        <Box
          sx={{
            ...style,
            width: "50%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "5vw",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            {currentUser.name}
          </div>
          <Avatar
            sx={{
              width: "15vh",
              height: "15vh",
              margin: "auto",
            }}
            src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
            alt=""
          />
          <div
            style={{
              fontSize: "3.2vw",
              fontFamily: "Work sans",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            {currentUser.email}
          </div>
          <div style={{justifyContent: "end"}}>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModel;
