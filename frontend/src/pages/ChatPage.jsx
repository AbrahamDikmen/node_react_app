import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ChatContainer from "../components/ChatComponents/ChatContainer";
import Chatbox from "../components/ChatComponents/ChatBox";
import {ContainerChat} from "../components/ui/StyledChat";

import io from "socket.io-client";
import SideDrawler from "../components/ChatComponents/SideDrawler";

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const socket = useRef();
  const [selectedChat, setSelectedChat] = useState("");

  const [currentUser, setCurrentUser] = useState("");
  const [fetchAgain, setFetchAgain] = useState(false);

  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);
  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/user/setavatar/${auth._id}`).then((response) => {
        const data = response.data;
        if (!data._id) {
          navigate("/");
        } else {
          setCurrentUser(data);
        }
      });
    };
    loadData();
  }, [auth._id, navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8080");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser, socket]);
  console.log(socket);

  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        const config = {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        };

        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(
            `/api/user/allusers/${currentUser._id}`,
            config
          );
          setContacts(data.data);
        }
      }
    };
    loadData();
  }, [auth._id, auth.token, currentUser, navigate]);

  return (
    <ContainerChat>
      {auth && (
        <SideDrawler
          currentUser={currentUser}
          setNotification={setNotification}
          notification={notification}
          chats={chats}
          setChats={setChats}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
      )}

      <div className="container">
        {auth && (
          <ChatContainer
            chats={chats}
            setChats={setChats}
            socket={socket}
            fetchAgain={fetchAgain}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        )}

        {auth && (
          <Chatbox
            contacts={contacts}
            setNotification={setNotification}
            notification={notification}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
          />
        )}
      </div>
    </ContainerChat>
  );
};

export default ChatPage;
