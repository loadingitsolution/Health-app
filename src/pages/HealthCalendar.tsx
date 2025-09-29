import {
  Add as AddIcon,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  DeleteIconWithBackground,
  QuickEditSvg,
  RemainderTooltipSvg,
  ReminderSvg,
  SymptomSvg,
  SymptomTooltipSvg,
} from "../assets";
import { CustomModal } from "../components";
import { InputBar } from "../components/chat/InputBar";
import { MainLayout } from "../layout/MainLayout";
import "../styles/calendar.css";

export const HealthCalendar = () => {
  const isSmallScreen = useMediaQuery("(max-width: 765px)");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [hasFirstMessage, setHasFirstMessage] = useState(false);
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      text: string;
      isAI: boolean;
      timestamp: string;
    }>
  >([]);
  const [plusMenuAnchor, setPlusMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "symptom" | "reminder" | "quick-edit" | null
  >(null);
  const [periodSwitch, setPeriodSwitch] = useState(false);
  const [selectedFlowVolume, setSelectedFlowVolume] = useState<string | null>(
    null
  );
  const [selectedMoodTags, setSelectedMoodTags] = useState<string[]>([]);
  const [calendarData, setCalendarData] = useState<{
    [key: string]: {
      quickEdit?: {
        flowVolume?: string | null;
        moodTags?: string[];
      };
      symptom?: string;
      reminder?: string;
      reminders?: Array<{
        id: string;
        title: string;
        time: string;
        description: string;
        completed: boolean;
      }>;
    };
  }>({});
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const plusMenuOpen = Boolean(plusMenuAnchor);

  const handlePlusClick = (event: React.MouseEvent<HTMLElement>) => {
    setPlusMenuAnchor(event.currentTarget);
  };

  const handlePlusClose = () => {
    setPlusMenuAnchor(null);
  };

  const handleSymptomClick = () => {
    setModalType("symptom");
    setIsModalOpen(true);
    handlePlusClose();
  };

  const handleReminderClick = () => {
    setModalType("reminder");
    setIsModalOpen(true);
    handlePlusClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleModalSave = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];

      if (modalType === "quick-edit") {
        setCalendarData((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            quickEdit: {
              flowVolume: selectedFlowVolume,
              moodTags: selectedMoodTags,
            },
          },
        }));
      } else if (modalType === "symptom") {
        setCalendarData((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            symptom: "Symptom recorded",
          },
        }));
      } else if (modalType === "reminder") {
        setCalendarData((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            reminder: "Reminder set",
          },
        }));
      }
    }
    console.log(`${modalType} saved`);
    handleModalClose();
  };

  const handleModalCancel = () => {
    console.log(`${modalType} cancelled`);
    handleModalClose();
  };

  const handleQuickEditOpen = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      const dayData = calendarData[dateKey];

      // Load existing data if available
      if (dayData?.quickEdit) {
        setSelectedFlowVolume(dayData.quickEdit.flowVolume || null);
        setSelectedMoodTags(dayData.quickEdit.moodTags || []);
      } else {
        setSelectedFlowVolume(null);
        setSelectedMoodTags([]);
      }
    }
    setIsModalOpen(true);
    setModalType("quick-edit");
  };

  const handleQuickEditClose = () => {
    setIsModalOpen(false);
    setModalType(null);
    setPeriodSwitch(false);
    setSelectedFlowVolume(null);
    setSelectedMoodTags([]);
  };

  const handleFlowVolumeSelect = (volume: string) => {
    setSelectedFlowVolume(volume);
  };

  const handleMoodTagToggle = (tag: string) => {
    setSelectedMoodTags([tag]); // Only allow one mood selection at a time
  };

  const handleEditDrawerOpen = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      const dayData = calendarData[dateKey];

      // Initialize with sample data if no reminders exist
      if (!dayData?.reminders || dayData.reminders.length === 0) {
        const sampleReminders = [
          {
            id: "1",
            title: "First Reminder",
            time: "9:00 AM",
            description:
              "💊 Take Iron Supplement — 9:00 AM\n🥗 Lunch: High-protein meal suggestion\n💧 Drink 8 glasses of water\n🩺 Track symptoms (headache, fatigue)",
            completed: false,
          },
          {
            id: "2",
            title: "Second Reminder",
            time: "9:00 AM",
            description:
              "💊 Take Iron Supplement — 9:00 AM\n🥗 Lunch: High-protein meal suggestion\n💧 Drink 8 glasses of water\n🩺 Track symptoms (headache, fatigue)",
            completed: false,
          },
        ];

        setCalendarData((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            reminders: sampleReminders,
          },
        }));
      }
    }
    setIsEditDrawerOpen(true);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };

  const handleEditReminder = () => {
    setModalType("reminder");
    setIsModalOpen(true);
    setIsEditDrawerOpen(false);
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setCalendarData((prev) => ({
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          reminders:
            prev[dateKey]?.reminders?.filter((r) => r.id !== reminderId) || [],
        },
      }));
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

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
        text: "Hello Xing Ming, I'm your health companion. I can help you track your cycle, answer health questions, and give nutrition advice. How would you like to start today?",
        isAI: true,
        timestamp: "Today",
      };

      setMessages([newMessage, aiResponse]);
      setHasFirstMessage(true);
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F7F8FA",
          borderRadius: "12px",
          overflow: "hidden",
          // height: "calc(100vh - 120px)",
        }}
      >
        <Box
          display="flex"
          paddingLeft={isSmallScreen ? "20px" : "80px"}
          paddingRight="20px"
          gap="20px"
          minHeight={isSmallScreen ? "auto" : "calc(100vh - 120px)"}
        >
          {/* Calendar Content */}
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "12px",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {/* Calendar Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              {!isSmallScreen && (
                <Button
                  onClick={handleToday}
                  sx={{
                    backgroundColor: "#2AB3A3",
                    color: "white",
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#1e8a7a",
                    },
                  }}
                >
                  Today
                </Button>
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton onClick={handlePreviousMonth}>
                  <ChevronLeft />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    minWidth: "100px",
                    textAlign: "center",
                  }}
                >
                  {getMonthName(currentDate)}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              <IconButton
                disabled={!selectedDate}
                onClick={handlePlusClick}
                sx={{
                  backgroundColor: selectedDate ? "#2AB3A3" : "#E0E0E0",
                  color: selectedDate ? "white" : "#999",
                  width: "48px",
                  height: "48px",
                  "&:hover": {
                    backgroundColor: selectedDate ? "#1e8a7a" : "#E0E0E0",
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            {/* React Calendar */}
            <Box>
              <Calendar
                value={currentDate}
                onChange={handleDateChange}
                showNeighboringMonth={true}
                className="health-calendar"
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const isSelected =
                      selectedDate &&
                      selectedDate.toDateString() === date.toDateString();
                    return isSelected ? "selected-tile" : "";
                  }
                  return "";
                }}
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const dateKey = date.toISOString().split("T")[0];
                    const dayData = calendarData[dateKey];

                    return (
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover .edit-icon": {
                            opacity: 1,
                          },
                        }}
                      >
                        {/* Quick Edit Data Display */}
                        {dayData?.quickEdit && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 2,
                              left: 2,
                              display: "flex",
                              gap: 0.5,
                              flexDirection: "column",
                              flexWrap: "nowrap",
                            }}
                          >
                            {dayData.quickEdit.flowVolume && (
                              <Box
                                sx={{
                                  fontSize: "8px",
                                  padding: "2px 4px",
                                  borderRadius: "8px",
                                  backgroundColor:
                                    dayData.quickEdit.flowVolume === "Light"
                                      ? "#4A90E2"
                                      : dayData.quickEdit.flowVolume ===
                                        "Medium"
                                      ? "#F4C542"
                                      : "#FF6F61",
                                  color: "white",
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {dayData.quickEdit.flowVolume}
                              </Box>
                            )}
                            {dayData.quickEdit.moodTags &&
                              dayData.quickEdit.moodTags.length > 0 && (
                                <Box
                                  sx={{
                                    fontSize: "8px",
                                    padding: "2px 4px",
                                    borderRadius: "8px",
                                    backgroundColor: "#2AB3A3",
                                    color: "white",
                                    fontWeight: "bold",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {dayData.quickEdit.moodTags[0]}
                                </Box>
                              )}
                          </Box>
                        )}

                        <Box
                          sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            display: "flex",
                            gap: 1,
                            flexDirection: "column",
                            flexWrap: "nowrap",
                          }}
                        >
                          {/* Symptom Icon */}
                          {dayData?.symptom && (
                            <Tooltip title={dayData.symptom}>
                              <Box>
                                <SymptomTooltipSvg />
                              </Box>
                            </Tooltip>
                          )}

                          {/* Reminder Icon */}
                          {dayData?.reminder && (
                            <Tooltip title={dayData.reminder}>
                              <Box>
                                <RemainderTooltipSvg />
                              </Box>
                            </Tooltip>
                          )}
                        </Box>

                        {/* Edit Icon - Opens modal when no data, drawer when data exists */}
                        <IconButton
                          className="edit-icon"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(date);
                            // Check if there's existing data
                            if (
                              dayData &&
                              (dayData.quickEdit ||
                                dayData.symptom ||
                                dayData.reminder ||
                                dayData.reminders)
                            ) {
                              handleEditDrawerOpen();
                            } else {
                              handleQuickEditOpen();
                            }
                          }}
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 2,
                            opacity: 0,
                            transition: "opacity 0.2s",
                          }}
                        >
                          <QuickEditSvg />
                        </IconButton>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
            </Box>

            {/* Bottom Actions - Hidden for now */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                padding: "10px",
              }}
            >
              <Button
                sx={{
                  backgroundColor: "transparent",
                  color: "#FF5F57 !important",
                  border: "1px solid #FF5F57 !important",
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                variant="outlined"
                color="error"
                size="small"
              >
                Predict menstrual period
              </Button>
            </Box>
          </Box>

          {/* Plus Button Dropdown Menu */}
          <Menu
            anchorEl={plusMenuAnchor}
            open={plusMenuOpen}
            onClose={handlePlusClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "white",
                "& .MuiMenuItem-root": {
                  color: "#333",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "20px",
                  padding: "12px 16px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                },
              },
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 1 }}>
              <Button
                onClick={handleSymptomClick}
                fullWidth
                startIcon={<SymptomSvg />}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "#2AB3A3",
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Symptom
              </Button>
            </Box>

            <Box sx={{ p: 1, pt: 0 }}>
              <Button
                onClick={handleReminderClick}
                fullWidth
                startIcon={<ReminderSvg />}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  backgroundColor: "#2AB3A3",
                  color: "white",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "14px",
                }}
              >
                Reminder
              </Button>
            </Box>
          </Menu>

          {/* Chat Interface */}
          {!isSmallScreen && (
            <Box
              sx={{
                width: { xs: "100%", sm: "350px", md: "400px", lg: "400px" },
                maxWidth: "400px",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Chat Header */}
              <Box
                sx={{
                  padding: "20px 0",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  AI health consultation
                </Typography>

                <Typography variant="body2" sx={{ color: "#666", mt: 0.5 }}>
                  Your personal companion for cycle tracking, nutrition, and
                  wellness.
                </Typography>
              </Box>

              {/* Chat Messages Area */}
              <Box
                sx={{
                  flex: 1,
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  overflow: "auto",
                  minHeight: "300px",
                }}
              >
                {hasFirstMessage &&
                  messages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        display: "flex",
                        justifyContent: msg.isAI ? "flex-start" : "flex-end",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Paper
                        sx={{
                          p: "12px 16px",
                          maxWidth: "80%",
                          backgroundColor: msg.isAI
                            ? "transparent"
                            : "#6B7A991A",
                          color: "#6B7A99",
                          borderRadius: msg.isAI ? 0 : "16px",
                          boxShadow: "none",
                          border: "none",
                        }}
                      >
                        <Typography variant="body2">{msg.text}</Typography>
                      </Paper>
                    </Box>
                  ))}
              </Box>

              {/* Chat Input */}
              <Box
                sx={{
                  paddingTop: "20px",
                  backgroundColor: "transparent",
                }}
              >
                <InputBar onSendMessage={handleSendMessage} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {/* Symptom Modal */}
      <CustomModal
        isOpen={isModalOpen && modalType === "symptom"}
        onClose={handleModalClose}
        subtitle="Add new Symptom"
        title={`Details: ${selectedDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        onSave={handleModalSave}
        onCancel={handleModalCancel}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >
        <Box sx={{ minHeight: "200px", padding: "16px 0" }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#333", fontWeight: 600 }}
            >
              Description*
            </Typography>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "auto",
                  backgroundColor: "white",
                },
              }}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Write your note or details here..."
            />
          </Box>
        </Box>
      </CustomModal>
      {/* Reminder Modal */}
      <CustomModal
        isOpen={isModalOpen && modalType === "reminder"}
        onClose={handleModalClose}
        subtitle="Add reminder"
        title={`Details: ${selectedDate?.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        onSave={handleModalSave}
        onCancel={handleModalCancel}
        saveButtonText="Save"
        cancelButtonText="Cancel"
      >
        <Box sx={{ minHeight: "300px", paddingTop: "16px" }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#6B7A99", fontWeight: 600 }}
            >
              Description*
            </Typography>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "auto",
                  backgroundColor: "white",
                },
              }}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Write your note or details here..."
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 1, color: "#6B7A99", fontWeight: 600 }}
            >
              Time
            </Typography>
            <TextField
              type="time"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "auto",
                  backgroundColor: "white",
                  borderRadius: "8px",
                },
              }}
            />
          </Box>

          <Box
            sx={{ pb: 1 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Typography variant="h6" sx={{ color: "#6B7A99", fontWeight: 600 }}>
              Repeat rules
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Switch
                color="primary"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#2AB3A3",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#2AB3A3",
                  },
                }}
              />
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                sx={{
                  color: "#2AB3A3",
                  "&.Mui-checked": {
                    color: "#2AB3A3",
                  },
                }}
              />
              <Typography
                variant="body1"
                sx={{ color: "#6B7A99", fontWeight: 500, fontSize: "12px" }}
              >
                Mark as completed
              </Typography>
            </Box>
          </Box>
        </Box>
      </CustomModal>
      {/* Quick Edit Modal */}
      <CustomModal
        isOpen={isModalOpen && modalType === "quick-edit"}
        onClose={handleQuickEditClose}
        title="Quick Edit"
        onSave={handleModalSave}
        onCancel={handleQuickEditClose}
        saveButtonText="Save"
        maxWidth="md"
        cancelButtonText="Cancel"
      >
        <Box>
          {/* Period Switch */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: "#6B7A99", fontWeight: 600 }}>
              Did your period come today?
            </Typography>
            <Switch
              checked={periodSwitch}
              onChange={(e) => setPeriodSwitch(e.target.checked)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#2AB3A3",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#2AB3A3",
                },
              }}
            />
          </Box>

          {/* Flow Volume Section */}
          <Box
            sx={{
              mb: 3,
              opacity: periodSwitch ? 1 : 0.5,
              pointerEvents: periodSwitch ? "auto" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: isSmallScreen ? "wrap" : "nowrap",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#6B7A99", fontWeight: 600 }}
            >
              Flow Volume:
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: isSmallScreen ? "wrap" : "nowrap",
              }}
            >
              {[
                { name: "Light", color: "#4A90E2" },
                { name: "Medium", color: "#F4C542" },
                { name: "High", color: "#FF6F61" },
              ].map((volume) => (
                <Button
                  key={volume.name}
                  variant="outlined"
                  size="small"
                  onClick={() => handleFlowVolumeSelect(volume.name)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    borderColor:
                      selectedFlowVolume === volume.name
                        ? volume.color
                        : volume.color,
                    color:
                      selectedFlowVolume === volume.name
                        ? "white"
                        : volume.color,
                    backgroundColor:
                      selectedFlowVolume === volume.name
                        ? volume.color
                        : "white",
                    "&:hover": {
                      borderColor: volume.color,
                      color:
                        selectedFlowVolume === volume.name
                          ? "white"
                          : volume.color,
                      backgroundColor:
                        selectedFlowVolume === volume.name
                          ? volume.color
                          : `${volume.color}20`,
                    },
                    minWidth: "80px",
                  }}
                >
                  {volume.name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Mood Tags Section */}
          <Box
            sx={{
              mb: 3,
              opacity: periodSwitch ? 1 : 0.5,
              pointerEvents: periodSwitch ? "auto" : "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: isSmallScreen ? "wrap" : "nowrap",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#6B7A99", fontWeight: 600 }}
            >
              Mood Tags:
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: isSmallScreen ? "wrap" : "nowrap",
                overflowX: "auto",
              }}
            >
              {[
                { emoji: "😊", text: "Happy", color: "#2AB3A3" },
                { emoji: "🧘‍♂️", text: "Calm", color: "#8DC63F" },
                { emoji: "😟", text: "Anxious", color: "#4A90E2" },
                { emoji: "😠", text: "Irritable", color: "#F4C542" },
                { emoji: "😔", text: "Low", color: "#FF6F61" },
              ].map((mood) => (
                <Button
                  key={mood.text}
                  variant="outlined"
                  size="small"
                  onClick={() => handleMoodTagToggle(mood.text)}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    borderColor: selectedMoodTags.includes(mood.text)
                      ? mood.color
                      : mood.color,
                    color: selectedMoodTags.includes(mood.text)
                      ? "white"
                      : mood.color,
                    backgroundColor: selectedMoodTags.includes(mood.text)
                      ? mood.color
                      : "white",
                    "&:hover": {
                      borderColor: mood.color,
                      color: selectedMoodTags.includes(mood.text)
                        ? "white"
                        : mood.color,
                      backgroundColor: selectedMoodTags.includes(mood.text)
                        ? mood.color
                        : `${mood.color}20`,
                    },
                    minWidth: "100px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {mood.emoji} {mood.text}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </CustomModal>

      {/* Edit Drawer */}
      <Drawer
        anchor="right"
        open={isEditDrawerOpen}
        onClose={handleEditDrawerClose}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : 500,
            backgroundColor: "white",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#6B7A99",
              }}
            >
              Reminders for
              {selectedDate?.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </Typography>

            <IconButton onClick={handleEditDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {selectedDate && (
            <List sx={{ width: "100%" }}>
              {calendarData[
                selectedDate.toISOString().split("T")[0]
              ]?.reminders?.map((reminder, index) => (
                <Box key={reminder.id}>
                  <ListItem
                    sx={{
                      backgroundColor: "transparent",
                      borderRadius: "12px",
                      mb: 2,
                      flexDirection: "column",
                      alignItems: "flex-start",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#333",
                          fontSize: "16px",
                        }}
                      >
                        {reminder.title}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEditReminder()}
                        >
                          <QuickEditSvg />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteReminder(reminder.id)}
                        >
                          <DeleteIconWithBackground />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        whiteSpace: "pre-line",
                        lineHeight: 1.6,
                        fontSize: "14px",
                      }}
                    >
                      {reminder.description}
                    </Typography>
                  </ListItem>
                  {index <
                    (calendarData[selectedDate.toISOString().split("T")[0]]
                      ?.reminders?.length || 0) -
                      1 && <Divider sx={{ my: 1 }} />}
                </Box>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </MainLayout>
  );
};
