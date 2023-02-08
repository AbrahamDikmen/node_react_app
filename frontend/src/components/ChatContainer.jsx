import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import {logoutUser} from "../features/authSlice";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import HomePage from "../pages/HomePage";
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
          <button onClick={() => navigate("/login")}>Home</button>
        </div>
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
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  gap: 0.1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          margin-left: 2vh;
          margin-top: 1.5vh;
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      button {
        background-color: #997af0;
        color: white;
        padding: 1vh;
        border: 0;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.8vh;

        text-transform: uppercase;
        margin-top: 3vh;

        transition: 0.5s ease-ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
        margin-bottom: 3%;
      }
    }
  }
  .chat-messages {
    padding: 2vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    width: 100%;
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
        padding: 2vh;
        font-size: 2.5vh;
        border-radius: 2vh;
        color: #d1d1d1;
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
