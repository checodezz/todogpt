import { useState, useRef, useEffect } from "react";
import { TextField, Drawer, Box, Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { API_URL } from "../utils/constants";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State to track typing status
  const endOfMessagesRef = useRef(null); // Ref to the last message

  // Initialize with a greeting message
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: (
          <>
            Hello! I am <strong> Finopsly</strong> your AI Assistant. You can
            ask me anything related to tasks.
          </>
        ),
      },
    ]);
  }, []);

  // Scroll to the bottom whenever the messages array updates
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

    // Show the typing indicator while waiting for the response
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/openai/completion`, {
        query: input,
      });

      const assistantResponse = response.data.response.trim();

      // Hide typing indicator and add assistant's response
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false); // Hide typing indicator in case of an error
    }

    setInput(""); // Clear input field
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Show Open Chat button only when the drawer is closed */}
      {!open && (
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          Open Chat
        </Button>
      )}

      {/* Chat Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          zIndex: 1100,
          width: 350, // Fixed width for the drawer
          maxWidth: "350px", // Ensure it doesn’t grow beyond 350px
          flexShrink: 0, // Prevent the drawer from shrinking
          "& .MuiDrawer-paper": {
            width: 350, // Set the width of the drawer paper to match the drawer width
            maxWidth: "350px", // Ensure paper doesn’t grow beyond 350px
            overflow: "hidden", // Prevent overflow
          },
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            maxHeight: "calc(100vh - 120px)",
          }}
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#007bff" : "#f1f1f1",
                color: msg.role === "user" ? "#fff" : "#333",
                borderRadius: "15px",
                padding: "10px 15px", // Padding inside the message bubble
                marginBottom: "10px",
                maxWidth: "75%", // Reduce maxWidth to prevent excessive space on the right
                wordWrap: "break-word",
                overflowWrap: "break-word",
                marginLeft: msg.role === "assistant" ? "0" : "auto", // Align user messages to the right
                marginRight: msg.role === "user" ? "0" : "auto", // Align assistant messages to the left
              }}
            >
              <Typography variant="body2">
                <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
                {msg.content}
              </Typography>
            </Box>
          ))}

          {/* Show typing indicator if assistant is typing */}
          {isTyping && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "#888" }}>
                <strong>Assistant:</strong> Typing...
              </Typography>
            </Box>
          )}

          {/* This div serves as the scroll target */}
          <div ref={endOfMessagesRef} />
        </Box>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", padding: "10px" }}
        >
          <TextField
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            sx={{
              flex: 1,
              marginRight: "10px",
              backgroundColor: "#f1f1f1",
              borderRadius: "20px",
              padding: "10px",
            }}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: "50%",
            }}
          >
            <SendIcon />
          </Button>
        </form>
      </Drawer>
    </div>
  );
};

export default ChatComponent;
