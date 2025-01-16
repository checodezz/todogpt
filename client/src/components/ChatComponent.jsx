import { useState, useRef, useEffect } from "react";
import {
  TextField,
  Drawer,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { API_URL } from "../utils/constants";

const ChatComponent = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: (
          <>
            Hello! I am <strong>chethanAI</strong>, your AI Assistant. You can
            ask me anything related to tasks.
          </>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/openai/completion`, {
        query: input,
      });

      const assistantResponse = response.data.response.trim();

      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content:
            "Sorry, there was an error processing your request. Please try again later.",
        },
      ]);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      onClose={onClose}
      sx={{
        width: "350px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "350px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        },
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            paddingBottom: "16px",
            marginBottom: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection:
                  message.role === "assistant" ? "row" : "row-reverse",
                marginBottom: "8px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor:
                    message.role === "assistant" ? "#e9ecef" : "#007bff",
                  color: message.role === "assistant" ? "#000" : "#fff",
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </Box>
          ))}
          {isTyping && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "8px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: "#e9ecef",
                }}
              >
                <CircularProgress size={24} />
              </Box>
            </Box>
          )}
          <div ref={endOfMessagesRef} />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              flexGrow: 1,
              marginRight: "8px",
            }}
            fullWidth
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              padding: "10px",
            }}
            disabled={!input.trim()}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatComponent;
