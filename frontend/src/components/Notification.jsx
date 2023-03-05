import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";

const Notification = () => {
  const [currentSelected, setCurrentSelected] = useState("");
  const [notifications, setNotifications] = useState("");

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then((response) => {
        const data = response.data;
      });
    };
    loadData();
  }, [auth._id]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
  };
  return (
    <div>
      {notifications ? (
        <Container>
          <div className="wrapper">
            <h1>Chat Box</h1>
            <div>
              <h2>Notifications</h2>
              <div className="contacts">
                {notifications.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="username">{contact.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <Container>
          <p> No notifications yet.. </p>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  margin: 10vh auto;
  height: 100vh;
  width: 100vw;
  text-align: center;
  color: white;
  align-items: center;

  display: grid;

  overflow: hidden;
  background-color: #080420;
  text-align: center;
  color: white;
  height: 85vh;
  width: 100%;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      margin: 1vh auto;
      text-align: center;
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;

      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 6vh;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
`;

export default Notification;
