import {Box} from "@mui/material";
import SingleChat from "./SingleChat";
const Chatbox = ({
  fetchAgain,
  setFetchAgain,
  selectedChat,
  setSelectedChat,
  notification,
  setNotification,
  chats,
  setChats,
}) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "column",
        padding: 4,
        backgroundColor: "white",
        width: "100%",
        borderRadius: "1rem",
        borderWidth: "1px",
      }}
    >
      <SingleChat
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
        setNotification={setNotification}
        notification={notification}
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        chats={chats}
        setChats={setChats}
      />
    </Box>
  );
};

export default Chatbox;
