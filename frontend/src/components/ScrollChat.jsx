import {Avatar} from "@mui/material";
import {Tooltip} from "@mui/material";
import ScrollableFeed from "react-scrollable-feed";
import {useSelector} from "react-redux";
import styled from "styled-components";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

const ScrollChat = ({messages}) => {
  const auth = useSelector((state) => state.auth);
  console.log(messages);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
            }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, auth._id) ||
              isLastMessage(messages, i, auth._id)) && (
              <div>
                <Avatar
                  sx={{
                    marginRight: "1vh",
                    cursor: "pointer",
                  }}
                  src={`data:image/svg+xml;base64,${m.sender.avatarImage}`}
                />
              </div>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === auth._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, auth._id),
                marginTop: isSameUser(messages, m, i, auth._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

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

export default ScrollChat;
