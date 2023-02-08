import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import {Buffer} from "buffer";
import {useSelector} from "react-redux";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

import loader from "../assets/logos/loader.gif";

export const SetAvatarPage = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const api = "https://api.multiavatar.com/456785";

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then((response) => {
        const data = response.data;
        if (data.isAvatarImageSet) {
          console.log(data);
          navigate("/");
          console.log(data.error);
        }
      });
    };

    loadData();
  }, [auth._id, navigate]);

  const setProfilePicture = async (e) => {
    if (selectedAvatar === "") {
      toast.error("Please select an avatar");
    } else {
      const {data} = await axios.post(`/api/setavatar/${auth._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isAvatarImageSet) {
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.");
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = [];

      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <ContainerForm>
          <img src={loader} alt="loader" className="loader" />
        </ContainerForm>
      ) : (
        <ContainerForm>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>

          <button className="submit-btn" onClick={setProfilePicture}>
            Set as profile picture
          </button>

          <ToastContainer />
        </ContainerForm>
      )}
    </>
  );
};
export default SetAvatarPage;

const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: 0;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    margin-top: 1.5em;
    margin-bottom: 1.5em;
    font-size: 15px;
    transition: 0.5s ease-ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
