import React, {useEffect, useState} from "react";
import {HomeContainer} from "../components/ui/StyledHome";
import {useSelector} from "react-redux";
import {useNavigate, navigate} from "react-router";

import axios from "axios";

const HomePage = () => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(auth);

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get(`/api/setavatar/${auth._id}`);
      console.log(data);
      if (!data) {
        navigate("/setavatar");
      }
    };
    loadData();
  }, [auth._id, navigate]);

  const forceLogout = useEffect(() => {
    if (!auth._id) {
      navigate("/login");
    }
  }, [auth._id, navigate]);

  useEffect(() => {
    const loadData = async () => {
      await axios.get(`/api/setavatar/${auth._id}`).then((response) => {
        const data = response.data;
        setCurrentUserName(data.name);
        setCurrentUserImage(data.avatarImage);
      });
    };
    loadData();
  }, [auth._id]);
  return (
    <>
      {currentUserImage && currentUserName && (
        <HomeContainer>
          <form>
            <h1>Chat Box</h1>

            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>

            <button onClick={() => navigate("/chat")}>Start Chat</button>

            {auth._id ? "" : forceLogout}

            <button onClick={() => navigate("/settings")}>Settings</button>
          </form>
        </HomeContainer>
      )}
    </>
  );
};

export default HomePage;
