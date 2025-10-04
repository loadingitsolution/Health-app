import { Close, MoreVert, Upload } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import deletePhoto from "../assets/delete.png";
import { CustomModal } from "../components/CustomModal";
import { CalendarIcon, CopyIcon, DeleteIcon, ForwordIcon } from "../assets";
import { MainLayout } from "../layout/MainLayout";
import { InputBar } from "../components/chat/InputBar";

export const HealthChat = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 765px)");
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [hasFirstMessage, setHasFirstMessage] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [shareLink, setShareLink] = useState(
    "https://health-consultant.app/chat/abc123"
  );
  const menuOpen = Boolean(menuAnchorEl);
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      text: string;
      isAI: boolean;
      timestamp: string;
      image?: string;
    }>
  >([]);

  const handleSendMessage = (messageText: string) => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        isAI: false,
        timestamp: "Today",
      };

      const aiResponse = {
        id: messages.length + 2,
        text: "I'm here to help with your health questions. How can I assist you today?",
        isAI: true,
        timestamp: "Today",
      };

      setMessages([newMessage, aiResponse]);
      setHasFirstMessage(true);
    }
  };

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const clearSelection = () => {
    setSelectedMessages([]);
    setSelectionMode(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSelectMode = () => {
    setSelectionMode(true);
    setMenuAnchorEl(null);
  };

  const handleCalendarClick = () => {
    navigate("/health-calendar");
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Remove selected messages
    setMessages((prev) =>
      prev.filter((msg) => !selectedMessages.includes(msg.id))
    );
    setSelectedMessages([]);
    setSelectionMode(false);
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  const handleShareClose = () => {
    setShareModalOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageViewerOpen(true);
  };

  const handleImageViewerClose = () => {
    setImageViewerOpen(false);
    setSelectedImage("");
  };

  const handleDownloadImage = () => {
    if (selectedImage) {
      const link = document.createElement("a");
      link.href = selectedImage;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyImage = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
      } catch (err) {
        console.error("Failed to copy image:", err);
      }
    }
  };

  const handleShareImage = () => {
    setImageViewerOpen(false);
    setShareModalOpen(true);
  };

  const handleReportClick = () => {
    setReportModalOpen(true);
    setMenuAnchorEl(null);
  };

  const handleReportClose = () => {
    setReportModalOpen(false);
    setIssueType("");
    setDescription("");
    setAttachment(null);
  };

  const handleReportSubmit = () => {
    // Handle report submission
    console.log("Report submitted:", { issueType, description, attachment });
    handleReportClose();
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setAttachment(files[0]);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setAttachment(files[0]);
    }
  };

  return (
    <MainLayout>
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          borderRadius: "12px",
          overflow: "hidden",
          justifyContent: isSmallScreen ? "flex-start" : "center",
          flexDirection: "column",
        }}
      >
        {/* Title and Subtitle Section */}
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              px: 2,
              borderRadius: "12px",
            }}
          >
            <Box
              onClick={handleCalendarClick}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                flex: 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <IconButton onClick={handleCalendarClick}>
                <CalendarIcon />
              </IconButton>

              {hasFirstMessage && (
                <Box sx={{ textAlign: "center", flex: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    AI health consultation
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                    Your personal companion for cycle tracking, nutrition, and
                    wellness.
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {!isSmallScreen && (
                <Button
                  variant="text"
                  startIcon={<Upload fontSize="small" />}
                  onClick={handleShareClick}
                  sx={{
                    color: "#666",
                    textTransform: "none",
                    fontSize: "14px",
                    backgroundColor: "transparent",
                    minWidth: "auto",
                    lineHeight: "normal",
                    px: 1,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Share
                </Button>
              )}
              <IconButton
                onClick={handleMenuClick}
                sx={{
                  p: 0.5,
                  backgroundColor: "#F1F3F7",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#E5E7EB",
                  },
                }}
              >
                <MoreVert fontSize="small" sx={{ color: "#6B7A99" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {hasFirstMessage && (
          <Box sx={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            {/* Vertical Menu Dropdown for main content */}
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 150,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  backgroundColor: "white",
                  "& .MuiMenuItem-root": {
                    color: "#6B7A99",
                    fontWeight: 900,
                    fontSize: "14px",
                    lineHeight: "20px",
                  },
                },
              }}
            >
              <MenuItem onClick={handleSelectMode}>Select</MenuItem>
              <MenuItem onClick={handleShareClick}>Pin Conversation</MenuItem>
              <MenuItem
                onClick={() => {
                  setHasFirstMessage(false);
                  handleMenuClose();
                }}
              >
                Clear Chat History
              </MenuItem>
              <MenuItem onClick={handleReportClick}>Report Issue</MenuItem>
            </Menu>

            <Box
              sx={{
                height: isSmallScreen
                  ? "calc(100dvh - 355px)"
                  : "calc(100dvh - 272px)",
                overflow: "auto",
              }}
            >
              {/* Selection Bar */}
              {selectedMessages.length > 0 && (
                <Box
                  sx={{
                    height: "40px",
                    backgroundColor: "#F1F3F7",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    borderRadius: "12px",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {selectedMessages.length} Text Selected
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton size="small">
                      <CopyIcon />
                    </IconButton>
                    <IconButton size="small" onClick={handleDeleteClick}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton size="small" onClick={handleShareClick}>
                      <ForwordIcon />
                    </IconButton>
                    <IconButton size="small" onClick={clearSelection}>
                      <Close sx={{ fontSize: "16px", color: "#666" }} />
                    </IconButton>
                  </Box>
                </Box>
              )}

              {/* Chat Messages */}
              <Box
                sx={{
                  flex: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isAI ? "flex-start" : "flex-end",
                      alignItems: "flex-start",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    {msg.isAI && selectionMode && (
                      <Checkbox
                        size="small"
                        checked={selectedMessages.includes(msg.id)}
                        onChange={() => handleMessageSelect(msg.id)}
                        sx={{ mt: 1 }}
                      />
                    )}
                    <Paper
                      sx={{
                        p: "15px",
                        maxWidth: "70%",
                        backgroundColor: selectedMessages.includes(msg.id)
                          ? "#F1F3F7"
                          : msg.isAI
                          ? "transparent"
                          : "#6B7A991A",
                        color: "#6B7A99",
                        borderRadius: msg.isAI ? 0 : "16px",
                        boxShadow: "none",
                        border: "none",
                      }}
                    >
                      <Typography variant="body2">{msg.text}</Typography>
                      {msg.image && (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={msg.image}
                            alt="Calendar"
                            onClick={() => handleImageClick(msg.image!)}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              borderRadius: "8px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
                      )}
                    </Paper>
                    {!msg.isAI && selectionMode && (
                      <Checkbox
                        size="small"
                        checked={selectedMessages.includes(msg.id)}
                        onChange={() => handleMessageSelect(msg.id)}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Input Bar */}
            <InputBar onSendMessage={handleSendMessage} />
          </Box>
        )}

        {/* Initial Centered UI */}
        {!hasFirstMessage && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 4,
              paddingBottom: isSmallScreen ? "80px" : "0",
            }}
          >
            {/* Title and Subtitle Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                py: 2,
                px: 2,
                borderRadius: "12px",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  AI health consultation
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                  Your personal companion for cycle tracking, nutrition, and
                  wellness.
                </Typography>
              </Box>
            </Box>

            {/* Input Bar */}
            <InputBar onSendMessage={handleSendMessage} />

            {/* Vertical Menu Dropdown */}
            <Menu
              anchorEl={menuAnchorEl}
              open={menuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 150,
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  backgroundColor: "white",
                  "& .MuiMenuItem-root": {
                    color: "#6B7A99",
                    fontWeight: 900,
                    fontSize: "14px",
                    lineHeight: "20px",
                  },
                },
              }}
            >
              <MenuItem onClick={handleSelectMode}>Select</MenuItem>
            </Menu>
          </Box>
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <CustomModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        title="Delete Record?"
        onSave={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        saveButtonText="Delete Record"
        cancelButtonText="Cancel"
        showCloseIcon={false}
        maxWidth="sm"
        saveButtonColor="#FF5F57"
        saveButtonHoverColor="#E53E3E"
      >
        <Box sx={{ textAlign: "center" }}>
          {/* Delete Photo */}
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <img
              src={deletePhoto}
              alt="Delete"
              style={{
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Body Text */}
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: 1.5,
            }}
          >
            Are you sure you want to delete this record for Sept 11?
            <br />
            This action cannot be undone.
          </Typography>
        </Box>
      </CustomModal>

      {/* Share Modal */}
      <CustomModal
        isOpen={shareModalOpen}
        onClose={handleShareClose}
        title="Public link created"
        showCloseIcon={true}
        maxWidth="sm"
      >
        <Box sx={{ display: "flex", gap: 0, alignItems: "center", pb: "24px" }}>
          <TextField
            value={shareLink}
            onChange={(e) => setShareLink(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px 0 0 8px",
                borderRight: "none",
                "& fieldset": {
                  borderRight: "none",
                },
                "&:hover fieldset": {
                  borderRight: "none",
                },
                "&.Mui-focused fieldset": {
                  borderRight: "none",
                },
              },
            }}
          />
          <Button
            onClick={handleCopyLink}
            variant="contained"
            sx={{
              borderRadius: "0 8px 8px 0",
              backgroundColor: "#2AB3A3",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "12px 16px",
              minWidth: "120px",
              height: "48px",
              "&:hover": {
                backgroundColor: "#1e8a7a",
              },
            }}
          >
            Copy Link
          </Button>
        </Box>
      </CustomModal>

      {/* Image Viewer Modal */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "white",
          display: imageViewerOpen ? "flex" : "none",
          flexDirection: "column",
          zIndex: 9999,
        }}
      >
        {/* Top Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            backgroundColor: "white",
          }}
        >
          {/* Left - Close Button */}
          <IconButton onClick={handleImageViewerClose}>
            <Close />
          </IconButton>

          {/* Right - Action Buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={handleDownloadImage}>
              <Upload />
            </IconButton>
            <IconButton onClick={handleCopyImage}>
              <CopyIcon />
            </IconButton>
            <IconButton onClick={handleShareImage}>
              <ForwordIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Image Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full view"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}
        </Box>
      </Box>

      {/* Report Issue Modal */}
      <CustomModal
        isOpen={reportModalOpen}
        onClose={handleReportClose}
        title="Report an Issue"
        subtitle="Help us improve your experience."
        onSave={handleReportSubmit}
        onCancel={handleReportClose}
        saveButtonText="Submit"
        cancelButtonText="Cancel"
        showCloseIcon={true}
        maxWidth="md"
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Issue Type Dropdown */}
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#333" }}
            >
              Issue Type
            </Typography>
            <TextField
              select
              fullWidth
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              variant="outlined"
              placeholder="Select an Issue"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem value="bug">Bug Report</MenuItem>
              <MenuItem value="feature">Feature Request</MenuItem>
              <MenuItem value="ui">UI/UX Issue</MenuItem>
              <MenuItem value="performance">Performance Issue</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Box>

          {/* Description */}
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#333" }}
            >
              Description*
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue in detail…"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: "auto",
                },
              }}
            />
          </Box>

          {/* Attachment */}
          <Box>
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: 500, color: "#333" }}
            >
              Attachment
            </Typography>
            <Box
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              sx={{
                border: "2px dashed #E5E7EB",
                borderRadius: "8px",
                padding: "24px",
                textAlign: "center",
                backgroundColor: "#F9FAFB",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              {attachment ? (
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "#2AB3A3", fontWeight: 500 }}
                  >
                    {attachment.name}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setAttachment(null)}
                    sx={{ mt: 1, color: "#666" }}
                  >
                    Remove
                  </Button>
                </Box>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  gap={2}
                  alignItems="center"
                  flexDirection={isSmallScreen ? "column" : "row"}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Drag and drop a screenshot here
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    id="file-input"
                  />
                  <label htmlFor="file-input">
                    <Button
                      component="span"
                      variant="outlined"
                      sx={{
                        borderColor: "#2AB3A3",
                        color: "#2AB3A3",
                        height: "31px",
                        backgroundColor: "transparent",
                        textTransform: "none",
                        borderRadius: "50px",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Browse here
                    </Button>
                  </label>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </MainLayout>
  );
};
