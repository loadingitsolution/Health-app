import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { KeyboardArrowDown, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router";
import profilePhoto from "../assets/profile-photo.jpg";
import logoutPhoto from "../assets/logout.png";
import { CustomModal } from "../components/CustomModal";
import {
  SideBarIconOne,
  SideBarIconTwo,
  SideBarIconThree,
  ChatIcon,
} from "../assets";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 765px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSelectMode = () => {
    setMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Handle logout logic here
    console.log("User logged out");
    setLogoutModalOpen(false);
    // You could navigate to login page or clear user session
  };

  const handleLogoutCancel = () => {
    setLogoutModalOpen(false);
  };

  const handleReportIssueClick = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F7F8FA",
        position: "relative",
        // paddingBottom: isSmallScreen ? "80px" : 0,
      }}
    >
      {/* Header - Always visible at top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
          width: "100%",
          backgroundColor: "#F7F8FA",
          zIndex: 1000,
        }}
      >
        {/* Logo on the left */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "##4D5E80", fontSize: "18px" }}
        >
          健康助手
        </Typography>

        {/* Profile dropdown on the right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#EAECF0",
            borderRadius: "8px",
            padding: "4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              ml: 1,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
            onClick={handleClick}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={profilePhoto}
              alt="Profile"
            />
            <Typography variant="body2" sx={{ color: "#333" }}>
              Hello Xing Ming
            </Typography>
            <KeyboardArrowDown sx={{ color: "#666" }} />
          </Box>
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
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
          <MenuItem onClick={handleClose}>New Chat</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/personal-information");
            }}
          >
            Edit Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              Notifications
              <ChevronRight sx={{ fontSize: "16px", color: "#666" }} />
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose}>Language</MenuItem>
          <MenuItem onClick={handleClose}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              Help & Support
              <ChevronRight sx={{ fontSize: "16px", color: "#666" }} />
            </Box>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              Settings
              <ChevronRight sx={{ fontSize: "16px", color: "#666" }} />
            </Box>
          </MenuItem>
          <MenuItem
            onClick={handleLogoutClick}
            sx={{
              color: "#FF5F57 !important",
              fontWeight: 900,
              fontSize: "14px",
              lineHeight: "20px",
              "&:hover": {
                backgroundColor: "rgba(211, 47, 47, 0.04)",
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>

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
          <MenuItem>Pin conversation</MenuItem>
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
            }}
          >
            Clear chat history
          </MenuItem>
          <MenuItem onClick={handleReportIssueClick}>Report an issue</MenuItem>
        </Menu>
      </Box>
      {/* Sidebar Tabs - Responsive positioning */}
      <Box
        sx={{
          position: "absolute",
          // Desktop positioning (left side, middle)
          ...(isSmallScreen
            ? {}
            : {
                left: 0,
                top: "calc(50% + 60px)", // Adjust for header height
                transform: "translateY(-50%)",
                height: "250px",
                flexDirection: "column",
              }),
          // Mobile positioning (bottom center)
          ...(isSmallScreen
            ? {
                bottom: "14px",
                height: "56px",
                left: "138px",
                transform: "translateX(-50%)",
                alignItems: "center",
                flexDirection: "row",
                width: "240px",
              }
            : {}),
          backgroundColor: "white",
          borderRadius: isSmallScreen ? "12px" : "12px 12px 0 0",
          padding: "16px",
          display: "flex",
          gap: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 10,
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={() => setSelectedTab(0)}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: selectedTab === 0 ? "#2AB3A3" : "transparent",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: selectedTab === 0 ? "#2AB3A3" : "#f0f0f0",
            },
            "& svg path": {
              fill: selectedTab === 0 ? "white" : "#C3CAD9",
            },
          }}
        >
          <SideBarIconOne />
        </IconButton>
        <IconButton
          onClick={() => setSelectedTab(1)}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: selectedTab === 1 ? "#2AB3A3" : "transparent",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: selectedTab === 1 ? "#2AB3A3" : "#f0f0f0",
            },
            "& svg path": {
              fill: selectedTab === 1 ? "white" : "#C3CAD9",
            },
          }}
        >
          <SideBarIconTwo />
        </IconButton>
        <IconButton
          onClick={() => setSelectedTab(2)}
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: selectedTab === 2 ? "#2AB3A3" : "transparent",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: selectedTab === 2 ? "#2AB3A3" : "#f0f0f0",
            },
            "& svg path": {
              fill: selectedTab === 2 ? "white" : "#C3CAD9",
            },
          }}
        >
          <SideBarIconThree />
        </IconButton>
      </Box>

      {/* Mobile-only Chat Button - Separate from main navigation */}
      {isSmallScreen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "14px",
            right: "20px",
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={() => navigate("/health-chat")}
            sx={{
              width: "56px",
              height: "56px",
              border: "1px solid #2AB3A3",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(42, 179, 163, 0.3)",
              "&:hover": {
                backgroundColor: "#1e8a7a",
                boxShadow: "0 6px 16px rgba(42, 179, 163, 0.4)",
              },
            }}
          >
            <ChatIcon />
          </IconButton>
        </Box>
      )}

      {children}

      {/* Logout Confirmation Modal */}
      <CustomModal
        isOpen={logoutModalOpen}
        onClose={handleLogoutCancel}
        title="Log Out?"
        onSave={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        saveButtonText="LogOut"
        cancelButtonText="Cancel"
        showCloseIcon={false}
        maxWidth="sm"
        saveButtonColor="#FF5F57"
        saveButtonHoverColor="#E53E3E"
      >
        <Box sx={{ textAlign: "center" }}>
          {/* Logout Photo */}
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <img
              src={logoutPhoto}
              alt="Logout"
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
            Are you sure you want to log out of your account?
            <br />
            You'll need to sign in again to access your health data and AI
            assistant.
          </Typography>
        </Box>
      </CustomModal>
    </Box>
  );
};
