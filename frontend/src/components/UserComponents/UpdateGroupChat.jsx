import {FormControl} from "@chakra-ui/form-control";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import axios from "axios";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import {useSelector} from "react-redux";
import {Box, Button, InputBase} from "@mui/material";
import Spinner from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const UpdateGroupChatModal = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
  setSelectedChat,
  selectedChat,
}) => {
  const [contacts, setContacts] = useState([]);

  const [addFriend, settAddFriend] = useState("");
  const [groupChatName, setGroupChatName] = useState();

  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);

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

  useEffect(() => {
    const loadData = async () => {
      if (auth._id) {
        const data = await axios.get(`/api/user/allusers/${auth._id}`);
        setContacts(data.data);
      }
    };
    loadData();
  }, [auth, auth._id]);

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast(error);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast("error");
      return;
    }

    if (selectedChat.groupAdmin._id !== auth._id) {
      toast("error");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== auth._id && user1._id !== auth._id) {
      toast("error");
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === auth._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <Button
        style={{display: "flex"}}
        endIcon={<VisibilityIcon />}
        onClick={handleOpen}
      />

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
          <Button
            style={{display: "flex"}}
            endIcon={<ArrowBackIcon />}
            onClick={() => handleClose()}
          />
          <Box>{selectedChat.chatName}</Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                paddingBottom: 3,
              }}
            >
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl style={{display: "flex"}}>
              <InputBase
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                color="teal"
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <InputBase placeholder="Add User to group" onChange={onChange} />
            </FormControl>

            <div>
              {contacts
                .filter((item) => {
                  const searchTerm = addFriend.toLowerCase();
                  const name = item.name.toLowerCase();

                  return searchTerm && name.startsWith(searchTerm);
                })
                .slice(0, 10)
                .map((user) => (
                  <div onClick={() => onSearch(user.name)}>
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  </div>
                ))}
            </div>
          </Box>
          <Box>
            <Button onClick={() => handleRemove(auth)}>Leave Group</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
