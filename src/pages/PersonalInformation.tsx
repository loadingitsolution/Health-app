import { CalendarToday, ChevronLeft, Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import profilePhoto from "../assets/profile-photo.jpg";
import { MainLayout } from "../layout/MainLayout";

export const PersonalInformation = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 765px)");
  // Form state
  const [formData, setFormData] = useState({
    username: "MinLi",
    fullName: "Minmin",
    dateOfBirth: "01/01/1996",
    email: "minmin@gmail.com",
    cycleLength: "28",
    periodLength: "5",
    ovulationDay: "14",
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log("Saving changes:", formData);
    // You can add API call or other save logic here
  };

  return (
    <MainLayout>
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            position: "relative",
            padding: isSmallScreen ? "20px" : "0px",
            overflow: "auto",
            maxHeight: isSmallScreen ? "calc(100vh - 200px)" : "auto",
          }}
        >
          {/* Back Button - Outside the content */}
          <Box
            sx={{
              position: "absolute",
              top: isSmallScreen ? 40 : 20,
              left: isSmallScreen ? 20 : 0,
              zIndex: 1000,
            }}
          >
            <IconButton onClick={handleBackClick} sx={{ p: 0 }}>
              <ChevronLeft sx={{ color: "#666" }} />
            </IconButton>
          </Box>

          {/* Basic Information Section */}
          <Paper
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              mb: 3,
              boxShadow: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 2,
                p: 3,
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              Basic Information
            </Typography>
            <Box p={3}>
              {/* Profile Picture */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  mb: 3,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                    }}
                    src={profilePhoto}
                    alt="Profile"
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "#2AB3A3",
                      color: "white",
                      width: 24,
                      height: 24,
                      "&:hover": {
                        backgroundColor: "#1e8a7a",
                      },
                    }}
                  >
                    <Edit sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>

              {/* Form Fields */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 3,
                }}
              >
                {/* Left Column */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      Username
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          height: "40px",
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      Date of Birth
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <IconButton edge="end">
                            <CalendarToday sx={{ color: "#666" }} />
                          </IconButton>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          height: "40px",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Right Column */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      Full Name
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          height: "40px",
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: "#333",
                        mb: 1,
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      value={formData.email}
                      disabled
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#f5f5f5",
                          height: "40px",
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#6B7A9999",
                        fontSize: "10px",
                        mt: 0.5,
                        display: "block",
                      }}
                    >
                      Email information cannot be changed.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Menstrual Cycle Settings Section */}
          <Paper
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 3,
              mb: 4,
              boxShadow: "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                mb: 2,
                pb: 2,
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              Menstrual Cycle Settings
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 3,
              }}
            >
              {/* Left Column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "#333",
                      mb: 1,
                    }}
                  >
                    Average Menstrual Cycle Length (days)
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.cycleLength}
                    onChange={(e) =>
                      handleInputChange("cycleLength", e.target.value)
                    }
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "40px",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7A9999",
                      fontSize: "10px",
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Typically 10-60 days.
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "#333",
                      mb: 1,
                    }}
                  >
                    Average Ovulation Day (which day in the cycle)
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.ovulationDay}
                    onChange={(e) =>
                      handleInputChange("ovulationDay", e.target.value)
                    }
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "40px",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7A9999",
                      fontSize: "10px",
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    For example, if the cycle is 28 days, ovulation may occur
                    around day 14. This is optional.
                  </Typography>
                </Box>
              </Box>

              {/* Right Column */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "#333",
                      mb: 1,
                    }}
                  >
                    Average Menstrual Period Length (days)
                  </Typography>
                  <TextField
                    fullWidth
                    value={formData.periodLength}
                    onChange={(e) =>
                      handleInputChange("periodLength", e.target.value)
                    }
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        height: "40px",
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#6B7A9999",
                      fontSize: "10px",
                      mt: 0.5,
                      display: "block",
                    }}
                  >
                    Typically 1-15 days.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Save Changes Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              position: isSmallScreen ? "sticky" : "relative",
              bottom: isSmallScreen ? "2px" : 0,
            }}
          >
            <Button
              onClick={handleSaveChanges}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#2AB3A3",
                color: "white",
                borderRadius: "8px",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#1e8a7a",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};
