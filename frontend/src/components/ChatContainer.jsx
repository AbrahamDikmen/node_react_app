import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";

import axios from "axios";

import {useNavigate} from "react-router";

import ChatLoading from "./ChatLoading";
import {getSender} from "../config/ChatLogics";
import {Button} from "@mui/material";

import GroupChatModal from "./GroupChatModal";
import AddIcon from "@mui/icons-material/Add";
import {Box, Stack} from "@mui/material";
export default function ChatContainer({
  fetchAgain,
  selectedChat,
  setSelectedChat,
  chats,
  setChats,
}) {
  const [loggedUser, setLoggedUser] = useState();

  const auth = useSelector((state) => state.auth);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const {data} = await axios.get(`/api/chat/${auth._id}`, config);

      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedUser(auth);
    fetchChats();

    // eslint-disable-next-line
  }, [fetchAgain]);
  console.log(chats);

  return (
    <>
      <Container style={{display: selectedChat ? "none" : "flex"}}>
        <div className="text"> My Chats </div>

        <GroupChatModal
          setChats={setChats}
          chats={chats}
          selectedchastyle={{
            display: "flex",
          }}
        >
          <Button
            endIcon={<AddIcon />}
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            {" "}
            New Group Chat
          </Button>
        </GroupChatModal>

        <div className="bodyWrapper">
          {chats ? (
            <Stack sx={{overflowY: "scroll"}}>
              {chats.map((chat) => (
                <Box
                  className="chat"
                  onClick={() => setSelectedChat(chat)}
                  key={chat._id}
                >
                  <div className="content">
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>

                  {chat.latestMessage && (
                    <div className="lastMessages">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </div>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled(Box)`
  width: 100vw;
  flex-direction: column;
  align-items: center;
  max-width: 33%;
  background-color: white;
  border-radius: 1rem;
  border-width: 1px;

  margin-right: 2vh;

  .text {
    margin: 2vh auto;
    font-size: 4vh;
    text-transform: uppercase;
    font-family: Irish Grover;
    color: #997af0;
  }

  button {
    background-color: #997af0;
    color: white;

    border: 0;
    cursor: pointer;
    border-radius: 0.8vh;
    text-transform: uppercase;
    margin-top: 2vh;
    text-align: center;

    transition: 0.5s ease-ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
    margin-bottom: 3%;
  }

  .bodyWrapper {
    display: flex;
    flex-direction: column;

    background-color: #f8f8f8;
    width: 100%;
    height: 100%;
    border-radius: 1vh;
    overflow-y: hidden;

    .chat {
      cursor: pointer;
      border-radius: 1vh;
      margin-left: 2vh;
      margin-right: 2vh;
      background-color: #997af0;
      color: white;
      border: 0;
      border-radius: 1rem;
      margin-top: 1vh;
      transition: 0.5s ease-ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
      .content {
        margin-left: 1.5vh;
        padding: 2px;
        font-weight: bold;
      }

      .lastMessages {
        b {
          font-weight: bold;
          margin-top: 0.8vh;
          color: black;
          margin-left: 1.5vh;
        }
      }
    }
  }
`;
