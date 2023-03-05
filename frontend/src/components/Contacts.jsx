import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import axios from "axios";

const Contacts = ({contacts, changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  const [addFriend, settAddFriend] = useState("");

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/user/setavatar/${auth._id}`).then((response) => {
        const data = response.data;
        setCurrentUserName(data.name);
        setCurrentUserImage(data.avatarImage);
      });
    };
    loadData();
  }, [auth._id]);

  const changeCurrentChat = (index, contact, searchTerm) => {
    settAddFriend(searchTerm);
    console.log("Search", searchTerm);
    setCurrentSelected(index);
    changeChat(contact);
  };
  const onChange = (e) => {
    e.preventDefault();
    settAddFriend(e.target.value);
  };
  console.log(contacts);
  return (
    <div>
      {currentUserImage && currentUserName && (
        <Container>
          <form>
            <h3>Friend List</h3>

            <div className="searchContainer">
              <input
                placeholder="Search user..."
                type="text"
                value={addFriend}
                variant="outlined"
                onChange={onChange}
              />
              <div className="dropDown">
                {contacts
                  .filter((item) => {
                    const searchTerm = addFriend.toLowerCase();
                    const name = item.name.toLowerCase();

                    return searchTerm && name.startsWith(searchTerm);
                  })
                  .slice(0, 10)
                  .map((contact, index) => (
                    <div className="header">
                      <div
                        key={contact._id}
                        className={`contact ${
                          index === currentSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          changeCurrentChat(index, contact, contact.name)
                        }
                      >
                        {contact.name}
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  display: grid;

  overflow: hidden;
  background-color: #080420;
  text-align: center;
  color: white;
  height: 85vh;
  width: 100%;
  form {
    background-color: #00000076;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    text-align: center;
    color: white;
    align-items: center;
    h1 {
      margin-top: 3vh;
      color: white;
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

    .searchContainer {
      margin: 1vh;
      padding: 3vh 3vh;
      border: 0.1rem solid #4e0eff;

      input {
        margin-top: 3vh;
        background-color: transparent;
        padding: 2vh;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 2rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }

      .dropDown {
        gap: 0.8rem;
        display: flex;
        flex-direction: column;
        margin: 1vh auto;
        border-radius: 0.4vh;
        align-items: center;
        text-align: center;
        font-size: 1.5vh;
        height: 20vh;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0.4rem;
          &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
          }
        }
        .header {
          width: 100%;

          .contact {
            padding: 0.5vh;
            margin: 0.3vh auto;
            gap: 1vh;
            display: flex;
            align-items: center;
            text-align: center;
            margin: auto;
            background-color: #997af0;
            min-height: 4vh;
            cursor: pointer;
            width: 90%;
            border-radius: 0.2rem;
            transition: 0.5s ease-in-out;

            font-size: 1.5rem;
            .avatar {
              img {
                height: 5vh;
              }
            }
          }
        }
        .addButton {
          background-color: #997af0;
          font-size: 2vh;
          border-radius: 1vh;
          padding: 1vh;
          border: 0.2rem solid #4e0eff;
          &:hover {
            background-color: #4e0eff;
          }
        }
      }
    }
    .buttonWrapper {
      button {
        background-color: #997af0;
        color: white;
        padding: 2vh;
        border: 0;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.8vh;
        font-size: 1rem;
        text-transform: uppercase;
        justify-content: center;
        margin: 2vh;
        text-align: center;
        display: inline-block;
        transition: 0.5s ease-ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
      }
    }
  }
`;
export default Contacts;
