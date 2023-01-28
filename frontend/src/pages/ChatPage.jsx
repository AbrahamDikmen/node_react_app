import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import styled from "styled-components";
import ChatContainer from "../components/ChatContainer";
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
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />

        {currentChat === "" ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default ChatPage;
