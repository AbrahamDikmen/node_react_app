import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Box, InputBase, FormControl} from "@mui/material";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import UserBadgeItem from "../UserComponents/UserBadgeItem";
import UserListItem from "../UserComponents/UserListItem";
import axios from "axios";

const GroupChatModal = ({children, setChats, chats}) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const auth = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState([]);

  const [addFriend, settAddFriend] = useState("");

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("failed");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  useEffect(() => {
    const loadData = async () => {
      if (auth._id) {
        const data = await axios.get(`/api/user/allusers/${auth._id}`);
        setContacts(data.data);
      }
    };
    loadData();
  }, [auth, auth._id]);

  const onChange = (e) => {
    e.preventDefault();
    settAddFriend(e.target.value);
  };
  const onSearch = (searchTerm) => {
    settAddFriend(searchTerm);
    console.log("Search", searchTerm);
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
      console.log("error");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>
      <Modal open={open}>
        <Box
          sx={{
            margin: "5vh auto",
            width: "100%",
            justifyContent: "center",
            fontSize: "35px",
            overflow: "hidden",
            textAlign: "center",
            padding: 3,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
          }}
        >
          Create Group Chat
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{width: "100%", flexDirection: "column-reverse"}}>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
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
                value={addFriend}
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
                onChange={onChange}
              />
            </FormControl>
            {contacts
              .filter((item) => {
                const searchTerm = addFriend.toLowerCase();
                const name = item.name.toLowerCase();

                return searchTerm && name.startsWith(searchTerm);
              })
              .slice(0, 4)
              .map((user) => (
                <div onClick={() => onSearch(user.name)}>
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                </div>
              ))}

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
