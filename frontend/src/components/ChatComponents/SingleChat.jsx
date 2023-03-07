import {FormControl} from "@chakra-ui/form-control";
import {Box, Button, InputBase} from "@mui/material";
import Spinner from "@mui/material/CircularProgress";
import {toast} from "react-toastify";
import {getSender, getSenderFull} from "../../config/ChatLogics";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import ProfileModal from "../UserComponents/ProfileModel";
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";
import io from "socket.io-client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpdateGroupChat from "../UserComponents/UpdateGroupChat";
import ScrollChat from "./ScrollChat";
import "../ui/styled.css";
import Robot from "../../assets/robot.gif";
const ENDPOINT = "http://localhost:8080";
let socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  setNotification,
  notification,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const auth = useSelector((state) => state.auth);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  console.log(selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      setLoading(true);

      const {data} = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };
        setNewMessage("");
        const {data} = await axios.post(
          `/api/message/${auth._id}`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", auth);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            sx={{
              fontSize: "28px",
              paddingBottom: 3,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              style={{display: "flex"}}
              endIcon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(auth, selectedChat.users)}
                  <ProfileModal
                    currentUser={getSenderFull(auth, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChat
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                  />
                </>
              ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: 3,
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "90%",
              borderRadius: "1vh",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <Spinner
                style={{
                  fontSize: "1vh",
                  width: 20,
                  height: 20,
                  alignSelf: "center",
                  margin: "auto",
                }}
              />
            ) : (
              <div className="messages">
                <ScrollChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              marginTop={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{marginBottom: 15, marginLeft: 0}}
                  />
                </div>
              ) : (
                <></>
              )}
              <InputBase
                style={{backgroundColor: "#E0E0E0", width: "100%"}}
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: "3vh",
              color: "#997af0",
            }}
          >
            <h1>
              Welcome <span>{auth.name}!</span>
            </h1>
            <img src={Robot} alt="" />
            <h3>Please select a chat to Start messaging.</h3>
          </div>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
