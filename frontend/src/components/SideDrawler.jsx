import React, {useState} from "react";
import axios from "axios";
import NotificationBadge from "react-notification-badge";
import {Effect} from "react-notification-badge";
import {useDispatch, useSelector} from "react-redux";
import {Menu, MenuItem, Tooltip} from "@mui/material";
import {Button} from "@mui/material";
import {InputBase} from "@mui/material";
import Stack from "@mui/material/Stack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import {logoutUser} from "../features/authSlice";
import {getSender} from "../config/ChatLogics";
import {toast} from "react-toastify";
import UserListItem from "../components/UserListItem";
import Spinner from "@mui/material/CircularProgress";
import Drawer from "@mui/material/Drawer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProfileModel from "./ProfileModel";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import ChatLoading from "./ChatLoading";
import styled from "styled-components";

const SideDrawer = ({
  selectedChat,
  setSelectedChat,
  currentUser,
  chats,
  setChats,
  notification,
  setNotification,
}) => {
  const auth = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [loadingChat, setLoadingChat] = useState(false);

  const [anchorEl, setAnchorEl] = useState(false);
  const [open2, setOpen2] = useState(Boolean);
  const [open3, setOpen3] = useState(Boolean);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const handleNotifications = (e) => {
    setOpen2(e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseNotifications = () => {
    setOpen2(false);
    setAnchorEl(false);
  };

  const handleProfile = (e) => {
    setOpen3(e.currentTarget);
    setAnchorEl(e.currentTarget);
  };

  const handleCloseProfile = () => {
    setOpen3(false);
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logoutUser(null));
  };

  const handleSearch = async () => {
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

      const {data} = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      toast("Failed to Load the Search Results");
    }
  };
  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.post(
        `/api/chat`,
        {
          from: auth._id,
          to: userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <Container>
      <form>
        {["left"].map((anchor) => (
          <Tooltip label="Search Users to chat" key={1}>
            <Button variant="ghost" onClick={toggleDrawer(anchor, true)}>
              <i className="fas fa-search"></i>
              <InputBase placeholder="Search User" style={{display: "flex"}}>
                {" "}
                Search User
              </InputBase>
            </Button>
          </Tooltip>
        ))}
        <h1 style={{fontSize: "2vh"}}>Chat Box</h1>

        <Stack direction="row" spacing={2}>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState1) => (
              <>
                <Tooltip title="Notifications" key={popupState1}>
                  <Button
                    {...bindTrigger(popupState1)}
                    onClick={handleNotifications}
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                  >
                    <NotificationBadge
                      count={notification.length}
                      effect={Effect.SCALE}
                    />
                    <NotificationsIcon
                      style={{cursor: "pointer", fontSize: "4vh"}}
                    />
                  </Button>
                </Tooltip>
                <Menu
                  {...bindMenu(popupState1)}
                  id="notifications"
                  open={open2}
                  anchorEl={anchorEl}
                  onClose={handleCloseNotifications}
                  style={{cursor: "pointer"}}
                >
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(
                          notification.filter((n) => n !== notif)
                        );
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(
                            auth,
                            notif.chat.users
                          )}`}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </PopupState>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Tooltip title="Account">
                  <Button
                    {...bindTrigger(popupState)}
                    endIcon={<KeyboardArrowDownIcon onClick={handleProfile} />}
                  >
                    <Avatar
                      style={{cursor: "pointer", fontSize: "4vh"}}
                      src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                      name={currentUser.name}
                    />
                  </Button>
                </Tooltip>
                <Menu
                  {...bindMenu(popupState)}
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open3}
                  onClose={handleCloseProfile}
                >
                  <ProfileModel currentUser={currentUser}>
                    <MenuItem onClick={popupState.close}>My Profile</MenuItem>
                  </ProfileModel>

                  <MenuItem
                    onClick={() => {
                      dispatch(logoutHandler(null));
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
        </Stack>
      </form>

      {["left"].map((anchor) => (
        <div key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <h1
              style={{
                margin: "1vh auto",
                fontSize: "3.2vh",
                color: "#997af0",
                textTransform: "uppercase",
                fontFamily: "Irish Grover",
              }}
            >
              Search Users
            </h1>
            <div
              style={{
                display: "flex",
                margin: "2vh auto",
                marginLeft: "1vh",
              }}
            >
              <input
                style={{
                  backGroundColor: "white",
                  border: 0,
                  fontWeight: "bold",
                  borderRadius: "0.8vh",
                  fontSize: "1rem",
                  marginBottom: "1vh",
                  transition: "0.5s ease-ease-in-out",
                  "&:hover": {
                    backgroundColor: "#4e0eff",
                  },
                }}
                placeholder="Search by name"
                value={search}
                onChange={onChange}
              />
              <Button
                style={{
                  backgroundColor: "#997af0",
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
                onClick={handleSearch}
              >
                Go
              </Button>
            </div>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner style={{justifyContent: "flex-end"}} />}
          </Drawer>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;

    h1 {
      color: #997af0;
      text-transform: uppercase;
      font-family: Irish Grover;
    }

    .avatar-header {
      img {
        border: 0.2rem solid #4e0eff;
        border-radius: 10vh;
        height: 17vh;
      }
    }
  }
`;

export default SideDrawer;
