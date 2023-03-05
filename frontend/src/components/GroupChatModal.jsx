import React, {useState, useRef} from "react";
import {useSelector} from "react-redux";
import {Box, InputBase, FormControl} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import UserBadgeItem from "../components/UserBadgeItem";
import UserListItem from "../components/UserListItem";
import axios from "axios";

const GroupChatModal = ({children, setChats, chats}) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);

  const style = {
    m: "5vh auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    console.log(query);
    if (!search) {
      toast("Failed to Load the Search Results");

      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${query}`, config);

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast("Failed to Load the Search Results");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.post(
        `/api/chat/group/${auth._id}`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);

      toast("groupchat failed");
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Modal open={open}>
        <Box
          sx={{
            ...style,
            display: "flex",
            width: "50%",
            justifyContent: "center",
            fontSize: "35px",
            overflow: "hidden",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          Create Group Chat
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <FormControl>
              <InputBase
                placeholder=" Chat Name"
                onChange={(e) => setGroupChatName(e.target.value)}
                style={{
                  marginTop: "2vh",
                  backgroundColor: "transparent",
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                  color: "black",
                  width: "100%",
                  "&:focus ": {
                    border: "0.1rem solid #997af0",
                    outline: "none",
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <InputBase
                placeholder="Add Users eg: John, Piyush, Jane"
                style={{
                  marginTop: "3vh",
                  backgroundColor: "transparent",
                  border: "0.1rem solid #4e0eff",
                  borderRadius: "0.4rem",
                  color: "black",
                  width: "100%",
                  "&:focus": {
                    border: "0.1rem solid #997af0",
                    outline: "none",
                  },
                }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box style={{width: "100%", display: "flex"}}>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}

            <Box>
              <Button
                style={{
                  backgroundColor: "#997af0",
                  margin: "1vh",
                  color: "white",
                  border: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginRight: "1vh",
                  fontSize: "1rem",
                  marginBottom: "1vh",
                  transition: "0.5s ease-ease-in-out",
                  "&:hover": {
                    backgroundColor: "#4e0eff",
                  },
                }}
                onClick={handleClose}
              >
                Close
              </Button>

              <Button
                style={{
                  backgroundColor: "#997af0",
                  margin: "1vh",
                  color: "white",
                  border: 0,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginRight: "1vh",
                  fontSize: "1rem",
                  marginBottom: "1vh",
                  transition: "0.5s ease-ease-in-out",

                  "&:hover": {
                    backgroundColor: "#4e0eff",
                  },
                }}
                onClick={handleSubmit}
              >
                Create Chat
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default GroupChatModal;
