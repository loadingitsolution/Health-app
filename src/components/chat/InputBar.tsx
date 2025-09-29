import { Add } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { MicroPhoneIcon, SendIcon } from "../../assets";

interface InputBarProps {
  onSendMessage: (message: string) => void;
}

export const InputBar = ({ onSendMessage }: InputBarProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%", lg: "1110px" },
          maxWidth: "1110px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "8px 16px",
          gap: 1,
        }}
      >
        <IconButton sx={{ p: 0.5 }}>
          <Add sx={{ color: "#666", fontSize: "20px" }} />
        </IconButton>
        <TextField
          fullWidth
          placeholder="Hello Xing Ming, I'm your health companion. How would you like to start today?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                fontSize: "14px",
                backgroundColor: "white",
                "& input": {
                  padding: "8px 0",
                },
              },
            },
          }}
          sx={{
            flex: 1,
          }}
        />
        <IconButton sx={{ p: 0.5 }}>
          <MicroPhoneIcon />
        </IconButton>
        <Button
          onClick={handleSendMessage}
          disabled={!message.trim()}
          sx={{
            minWidth: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#2AB3A3",
            color: "white",
            p: 0,
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
};
