import React, {useEffect, useState} from "react";
import {Box, Stack, Text} from "@chakra-ui/layout";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import {setChats} from "../features/chatSlice";
import {useDispatch, useSelector} from "react-redux";
import ChatLoading from "./ChatLoading";

import {Button} from "@chakra-ui/react";

const MyChats = ({fetchAgain, currentChat}) => {
  const [chats, setChats] = useState([]);

  const auth = useSelector((state) => state.auth);
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const {data} = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(auth.token);
    fetchChats();
  }, []);

  return (
    <Box
      d={{base: currentChat ? "none" : "flex", md: "flex"}}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{base: "100%", md: "31%"}}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{base: "28px", md: "30px"}}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
    </Box>
  );
};

export default MyChats;
