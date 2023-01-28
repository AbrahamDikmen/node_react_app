import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import {logoutUser} from "../features/authSlice";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

import {useNavigate} from "react-router";

export default function ChatContainer({currentChat, socket}) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then(async (response) => {
        const currentUser = response.data;

        const data = await axios.post("/api/messages/getmsg", {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(data.data);
      });
    };
    loadData();
  }, [currentChat, auth._id]);

  useEffect(() => {
    const getCurrentChat = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then(async (response) => {
        const currentUser = response.data;

        if (currentChat) {
          await currentUser._id;
        }
      });
    };
    getCurrentChat();
  }, [auth._id, currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.get(`/api/setavatar/${auth._id}`).then(async (response) => {
      const currentUser = response.data;

      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });

      await axios.post("/api/messages/addmsg", {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });

      const msgs = [...messages];
      msgs.push({fromSelf: true, message: msg});
      setMessages(msgs);
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log({msg});
        setArrivalMessage({fromSelf: false, message: msg});
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  const forceLogout = useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
          </div>
        </div>
        {auth._id ? (
          <button
            onClick={() => {
              dispatch(logoutUser(null));
            }}
          >
            Logout
          </button>
        ) : (
          forceLogout
        )}
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
