import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ChatContainer from "../components/ChatContainer";

import {ContainerChat} from "../components/ui/StyledChat";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import io from "socket.io-client";

const ChatPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);
  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then((response) => {
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
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`/api/allusers/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    loadData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <ContainerChat>
      <h1>Chat Box</h1>

      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />

        {currentChat === "" ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </ContainerChat>
  );
};

export default ChatPage;
