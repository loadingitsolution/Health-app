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
  Grid,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  DeleteIconWithBackground,
  EmptyDrawerImage,
  QuickEditSvg,
  RemainderTooltipSvg,
  SymptomTooltipSvg,
} from "../assets";
import { CustomModal } from "../components";
import { InputBar } from "../components/chat/InputBar";
import { MainLayout } from "../layout/MainLayout";
import { tabsWrapper, TitleWithIcon } from "../styleConstant";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "symptom" | "reminder" | "quick-edit" | "health-log" | null
  >(null);
  const [periodSwitch, setPeriodSwitch] = useState(false);
  const [selectedFlowVolume, setSelectedFlowVolume] = useState<string | null>(
    null
  );
  const [selectedMoodTags, setSelectedMoodTags] = useState<string[]>([]);
  const [modalSelectedDate, setModalSelectedDate] = useState<Date | null>(null);
  const [reminderType, setReminderType] = useState<string>("");
  const [repeatRule, setRepeatRule] = useState<string>("");
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
        reminderType?: string;
        time: string;
        description: string;
        completed: boolean;
      }>;
      symptoms?: Array<{
        id: string;
        title: string;
        symptomType?: string;
        description: string;
        completed: boolean;
      }>;
    };
  }>({});
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isEmptyStateDrawerOpen, setIsEmptyStateDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"reminders" | "symptoms">(
    "reminders"
  );

  const handlePlusClick = () => {
    setActiveTab("reminders");
    setModalType("health-log");
    setModalSelectedDate(null); // Reset modal date so user can select
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalSelectedDate(null);
    // Keep selectedDate to maintain tile highlighting
    setPeriodSwitch(false);
    setSelectedFlowVolume(null);
    setSelectedMoodTags([]);
    setReminderType("");
    setRepeatRule("");
  };

  const handleModalSave = () => {
    const dateToUse = modalSelectedDate || selectedDate;
    if (dateToUse) {
      // Create date key in local timezone format (YYYY-MM-DD)
      const dateKey = formatDateForInput(dateToUse);

      // Update calendar view to show the month of the selected date
      setCurrentDate(
        new Date(dateToUse.getFullYear(), dateToUse.getMonth(), 1)
      );

      // Keep the selected date highlighted
      setSelectedDate(dateToUse);

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
      } else if (modalType === "health-log") {
        if (activeTab === "symptoms") {
          setCalendarData((prev) => ({
            ...prev,
            [dateKey]: {
              ...prev[dateKey],
              symptom: "Symptom recorded",
              quickEdit: {
                flowVolume: selectedFlowVolume,
                moodTags: selectedMoodTags,
              },
            },
          }));
        } else if (activeTab === "reminders") {
          setCalendarData((prev) => ({
            ...prev,
            [dateKey]: {
              ...prev[dateKey],
              reminder: "Reminder set",
              quickEdit: {
                flowVolume: selectedFlowVolume,
                moodTags: selectedMoodTags,
              },
            },
          }));
        }
      }
    }
    console.log(`${modalType} saved`);
    handleModalClose();
  };

  const handleModalCancel = () => {
    console.log(`${modalType} cancelled`);
    handleModalClose();
  };

  const handleQuickEditClose = () => {
    setIsModalOpen(false);
    setModalType(null);
    setPeriodSwitch(false);
    setSelectedFlowVolume(null);
    setSelectedMoodTags([]);
    setReminderType("");
    setRepeatRule("");
  };

  const handleFlowVolumeSelect = (volume: string) => {
    setSelectedFlowVolume(volume);
  };

  const handleMoodTagToggle = (tag: string) => {
    setSelectedMoodTags([tag]); // Only allow one mood selection at a time
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: "reminders" | "symptoms"
  ) => {
    setActiveTab(newValue);
  };

  // Helper function to format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleEditDrawerOpen = () => {
    if (selectedDate) {
      const dateKey = formatDateForInput(selectedDate);
      const dayData = calendarData[dateKey];

      // Initialize with sample data if no data exists
      if (!dayData?.reminders || dayData.reminders.length === 0) {
        const sampleReminders = [
          {
            id: "1",
            title: "First Reminder",
            reminderType: "Medication Reminder",
            time: "8:00 AM",
            description: "Take iron supplement with breakfast",
            completed: false,
          },
          {
            id: "2",
            title: "Second Reminder",
            reminderType: "Hydration Reminder",
            time: "3:00 PM",
            description: "Drink 2 glasses of water to stay hydrated",
            completed: false,
          },
          {
            id: "3",
            title: "Third Reminder",
            reminderType: "Exercise Reminder",
            time: "6:00 PM",
            description: "30 minutes of light exercise or walking",
            completed: false,
          },
          {
            id: "4",
            title: "Fourth Reminder",
            reminderType: "Evening Medication",
            time: "9:00 PM",
            description: "Take calcium supplement before bed",
            completed: false,
          },
        ];

        const sampleSymptoms = [
          {
            id: "1",
            title: "First Symptom",
            symptomType: "Headache",
            description:
              "Mild headache since morning, lasted 2 hours. Took ibuprofen.",
            completed: false,
          },
          {
            id: "2",
            title: "Second Symptom",
            symptomType: "Cramps",
            description:
              "Lower abdominal cramps, pain level: medium. Used heating pad.",
            completed: false,
          },
          {
            id: "3",
            title: "Third Symptom",
            symptomType: "Fatigue",
            description: "Feeling tired and low energy throughout the day",
            completed: false,
          },
          {
            id: "4",
            title: "Fourth Symptom",
            symptomType: "Mood Changes",
            description: "Feeling more irritable than usual, mood swings",
            completed: false,
          },
          {
            id: "5",
            title: "Fifth Symptom",
            symptomType: "Bloating",
            description: "Mild bloating and discomfort in the afternoon",
            completed: false,
          },
        ];

        setCalendarData((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            reminders: sampleReminders,
            symptoms: sampleSymptoms,
          },
        }));
      }
    }
    setIsEditDrawerOpen(true);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };

  const handleEmptyStateDrawerClose = () => {
    setIsEmptyStateDrawerOpen(false);
  };

  const handleAddManually = () => {
    setModalSelectedDate(selectedDate);
    setActiveTab("reminders");
    setModalType("health-log");
    setIsModalOpen(true);
    setIsEmptyStateDrawerOpen(false);
  };

  const handleChatWithAI = () => {
    setIsEmptyStateDrawerOpen(false);

    // Auto-send message to chat
    const messageText = `Hi Xing Ming 👋\nYou haven't added anything for ${selectedDate?.toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    )} yet.\nWould you like to record a symptom or set a reminder for that day?`;

    handleSendMessage(messageText);
  };

  const handleEditReminder = () => {
    setActiveTab("reminders");
    setModalType("health-log");
    setModalSelectedDate(selectedDate);
    setIsModalOpen(true);
    setIsEditDrawerOpen(false);
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (selectedDate) {
      const dateKey = formatDateForInput(selectedDate);
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

  const handleDeleteSymptom = (symptomId: string) => {
    if (selectedDate) {
      const dateKey = formatDateForInput(selectedDate);
      setCalendarData((prev) => ({
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          symptoms:
            prev[dateKey]?.symptoms?.filter((s) => s.id !== symptomId) || [],
        },
      }));
    }
  };

  const handleMarkReminderCompleted = (reminderId: string) => {
    if (selectedDate) {
      const dateKey = formatDateForInput(selectedDate);
      setCalendarData((prev) => ({
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          reminders:
            prev[dateKey]?.reminders?.map((reminder) =>
              reminder.id === reminderId
                ? { ...reminder, completed: !reminder.completed }
                : reminder
            ) || [],
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
      // Always set the selected date to the clicked date
      setSelectedDate(value);
      console.log("Selected date:", value.toDateString()); // Debug log

      // Check if there's existing data for this date
      const dateKey = formatDateForInput(value);
      const dayData = calendarData[dateKey];

      if (
        dayData &&
        (dayData.quickEdit ||
          dayData.symptom ||
          dayData.reminder ||
          dayData.reminders)
      ) {
        // If data exists, open drawer
        handleEditDrawerOpen();
      } else {
        // If no data exists, open empty state drawer
        setIsEmptyStateDrawerOpen(true);
      }
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
                onClick={handlePlusClick}
                sx={{
                  backgroundColor: "#2AB3A3",
                  color: "white",
                  width: "48px",
                  height: "48px",
                  "&:hover": {
                    backgroundColor: "#1e8a7a",
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
                    const dateKey = formatDateForInput(date);
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

                        {/* Edit Icon - Always opens modal */}
                        <Box
                          className="edit-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDate(date);
                            setModalSelectedDate(date);
                            setActiveTab("reminders");
                            setModalType("health-log");
                            setIsModalOpen(true);
                          }}
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 2,
                            opacity: 0,
                            transition: "opacity 0.2s",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            "&:hover": {
                              backgroundColor: "rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <QuickEditSvg />
                        </Box>
                      </Box>
                    );
                  }
                  return null;
                }}
              />
            </Box>

            {/* Bottom Actions - Hidden for now */}
            {/* <Box
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
            </Box> */}
          </Box>

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

      {/* Health Log Modal */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CustomModal
          isOpen={isModalOpen && modalType === "health-log"}
          onClose={handleModalClose}
          title="Health Log"
          onSave={handleModalSave}
          onCancel={handleModalCancel}
          saveButtonText="Save"
          cancelButtonText="Cancel"
          maxWidth="md"
        >
          <Box sx={{ minHeight: "400px" }}>
            {/* Date Selection */}
            <Box sx={{ pb: 2 }}>
              <DatePicker
                label="Select Date"
                value={modalSelectedDate || selectedDate}
                onChange={(newValue) => {
                  setModalSelectedDate(newValue);
                }}
                disabled={modalSelectedDate !== null || selectedDate !== null}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    placeholder: "Select a date",
                  },
                }}
              />
            </Box>

            {/* Tabs - Full Width */}
            <Box sx={tabsWrapper}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab label="Reminders" value="reminders" />
                <Tab label="Symptoms" value="symptoms" />
              </Tabs>
            </Box>

            {/* Tab Content - Different content for each tab */}
            <Box>
              {/* Reminder Type Select - Only for Reminders tab */}
              {activeTab === "reminders" && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, color: "#333", fontWeight: 600 }}
                  >
                    Type*
                  </Typography>
                  <Select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    fullWidth
                    variant="outlined"
                    displayEmpty
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      <em>Select type</em>
                    </MenuItem>
                    <MenuItem value="Menstruation">Menstruation</MenuItem>
                    <MenuItem value="Medication">Medication</MenuItem>
                    <MenuItem value="Exercise">Exercise</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </Box>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, color: "#333", fontWeight: 600 }}
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
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box mb={1}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, color: "#333", fontWeight: 600 }}
                    >
                      Time
                    </Typography>
                    <TextField
                      type="time"
                      fullWidth
                      variant="outlined"
                      placeholder="--:-- --"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "auto",
                          backgroundColor: "white",
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </Box>

                  {/* Repeat Rules - Only for Reminders tab */}
                  {activeTab === "reminders" && (
                    <Box
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: isSmallScreen ? "wrap" : "nowrap",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#333",
                          fontWeight: 600,
                          minWidth: "120px",
                          flexShrink: 0,
                        }}
                      >
                        Repeat rules
                      </Typography>
                      <Select
                        value={repeatRule}
                        onChange={(e) => setRepeatRule(e.target.value)}
                        fullWidth
                        variant="outlined"
                        displayEmpty
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            borderRadius: "8px",
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          <em>Select repeat rule</em>
                        </MenuItem>
                        <MenuItem value="Does not repeat">
                          Does not repeat
                        </MenuItem>
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Weekly on Monday">
                          Weekly on Monday
                        </MenuItem>
                        <MenuItem value="Annually on October 13">
                          Annually on October 13
                        </MenuItem>
                        <MenuItem value="Custom">Custom...</MenuItem>
                      </Select>
                    </Box>
                  )}

                  {/* Mark as completed - Only for Reminders tab */}
                  {activeTab === "reminders" && (
                    <Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Checkbox
                          sx={{
                            color: "#2AB3A3",
                            padding: 0,
                            "&.Mui-checked": {
                              color: "#2AB3A3",
                            },
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#333",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          Mark as completed
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>

              {/* Period Tracking Section - Only show in Symptoms tab */}
              {activeTab === "symptoms" && (
                <Box pt={1}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#333", fontWeight: 600 }}
                    >
                      Did your period come today?
                    </Typography>
                    <Switch
                      checked={periodSwitch}
                      onChange={(e) => setPeriodSwitch(e.target.checked)}
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#2AB3A3",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
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
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: isSmallScreen ? "wrap" : "nowrap",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, color: "#333", fontWeight: 600 }}
                    >
                      Flow Volume:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
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
                            borderColor: volume.color,
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
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: isSmallScreen ? "wrap" : "nowrap",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, color: "#333", fontWeight: 600 }}
                    >
                      Mood Tags:
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexWrap: "wrap",
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
                            borderColor: mood.color,
                            color: selectedMoodTags.includes(mood.text)
                              ? "white"
                              : mood.color,
                            backgroundColor: selectedMoodTags.includes(
                              mood.text
                            )
                              ? mood.color
                              : "white",
                            "&:hover": {
                              borderColor: mood.color,
                              color: selectedMoodTags.includes(mood.text)
                                ? "white"
                                : mood.color,
                              backgroundColor: selectedMoodTags.includes(
                                mood.text
                              )
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
              )}
            </Box>
          </Box>
        </CustomModal>
      </LocalizationProvider>

      {/* Edit Drawer */}
      <Drawer
        anchor="right"
        open={isEditDrawerOpen}
        onClose={handleEditDrawerClose}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : 600,
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
              Existing Records for{" "}
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
            <Box>
              {/* Reminders Section */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    ...TitleWithIcon,
                    fontWeight: "bold",
                    color: "#333",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <RemainderTooltipSvg /> Reminders
                </Typography>

                <List sx={{ width: "100%" }}>
                  {calendarData[
                    formatDateForInput(selectedDate)
                  ]?.reminders?.map((reminder, index) => (
                    <Box key={reminder.id}>
                      <ListItem
                        sx={{
                          backgroundColor: "transparent",
                          mb: 2,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          p: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                                color: "#6B7A99",
                                fontSize: "14px",
                              }}
                            >
                              {reminder.title}
                            </Typography>

                            <Box display="flex" flexDirection="row" gap={1}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#2AB3A3",
                                  whiteSpace: "pre-line",
                                  fontStyle: "italic",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                {reminder.reminderType}
                              </Typography>

                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#6B7A99",
                                  whiteSpace: "pre-line",
                                  lineHeight: 1.6,
                                  fontSize: "12px",
                                }}
                              >
                                {reminder.time}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: "#6B7A99",
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                                fontSize: "14px",
                              }}
                            >
                              {reminder.description}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            {/* Mark as completed button */}
                            <Button
                              onClick={() =>
                                handleMarkReminderCompleted(reminder.id)
                              }
                              sx={{
                                backgroundColor: "#6B7A99",
                                fontSize: "12px",
                                color: "#FFF",
                                fontWeight: 400,
                                textTransform: "none",
                                borderRadius: "4px",
                                px: 2,
                                py: 0.5,
                                minWidth: "auto",
                                height: "28px",
                                "&:hover": {
                                  backgroundColor: "#5a6b7a",
                                },
                              }}
                            >
                              Mark as completed
                            </Button>
                            <Box
                              onClick={() => handleEditReminder()}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                "&:hover": {
                                  backgroundColor: "rgba(42, 179, 163, 0.1)",
                                },
                              }}
                            >
                              <QuickEditSvg />
                            </Box>
                            <Box
                              onClick={() => handleDeleteReminder(reminder.id)}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 95, 87, 0.1)",
                                },
                              }}
                            >
                              <DeleteIconWithBackground />
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                      {index <
                        (calendarData[formatDateForInput(selectedDate)]
                          ?.reminders?.length || 0) -
                          1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </List>
              </Box>

              {/* Symptoms Section */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    ...TitleWithIcon,
                    fontWeight: "bold",
                    color: "#333",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <SymptomTooltipSvg /> Symptoms
                </Typography>
                <List sx={{ width: "100%" }}>
                  {calendarData[
                    formatDateForInput(selectedDate)
                  ]?.symptoms?.map((symptom, index) => (
                    // <Box key={symptom.id}>
                    //   <ListItem
                    //     sx={{
                    //       backgroundColor: "#F8F9FA",
                    //       borderRadius: "12px",
                    //       mb: 2,
                    //       flexDirection: "column",
                    //       alignItems: "flex-start",
                    //       p: 2,
                    //     }}
                    //   >
                    //     <Box
                    //       sx={{
                    //         display: "flex",
                    //         justifyContent: "space-between",
                    //         alignItems: "center",
                    //         width: "100%",
                    //         mb: 1,
                    //       }}
                    //     >
                    //       <Typography
                    //         variant="h6"
                    //         sx={{
                    //           fontWeight: "bold",
                    //           color: "#333",
                    //           fontSize: "16px",
                    //         }}
                    //       >
                    //         {symptom.title}
                    //       </Typography>
                    //       <Box sx={{ display: "flex", gap: 1 }}>
                    //         <Box
                    //           onClick={() => {
                    //             setActiveTab("symptoms");
                    //             setModalType("health-log");
                    //             setIsModalOpen(true);
                    //             setIsEditDrawerOpen(false);
                    //           }}
                    //           sx={{
                    //             cursor: "pointer",
                    //             display: "flex",
                    //             alignItems: "center",
                    //             justifyContent: "center",
                    //             width: "32px",
                    //             height: "32px",
                    //             borderRadius: "50%",
                    //             "&:hover": {
                    //               backgroundColor: "rgba(42, 179, 163, 0.1)",
                    //             },
                    //           }}
                    //         >
                    //           <QuickEditSvg />
                    //         </Box>
                    //         <Box
                    //           onClick={() => handleDeleteSymptom(symptom.id)}
                    //           sx={{
                    //             cursor: "pointer",
                    //             display: "flex",
                    //             alignItems: "center",
                    //             justifyContent: "center",
                    //             width: "32px",
                    //             height: "32px",
                    //             borderRadius: "50%",
                    //             "&:hover": {
                    //               backgroundColor: "rgba(255, 95, 87, 0.1)",
                    //             },
                    //           }}
                    //         >
                    //           <DeleteIconWithBackground />
                    //         </Box>
                    //       </Box>
                    //     </Box>

                    //     <Typography
                    //       variant="body2"
                    //       sx={{
                    //         color: "#666",
                    //         whiteSpace: "pre-line",
                    //         lineHeight: 1.6,
                    //         fontSize: "14px",
                    //       }}
                    //     >
                    //       {symptom.description}
                    //     </Typography>
                    //   </ListItem>
                    //   {index <
                    //     (calendarData[formatDateForInput(selectedDate)]
                    //       ?.symptoms?.length || 0) -
                    //       1 && <Divider sx={{ my: 1 }} />}
                    // </Box>
                    <Box key={symptom.id}>
                      <ListItem
                        sx={{
                          backgroundColor: "transparent",
                          borderRadius: "12px",
                          mb: 2,
                          flexDirection: "column",
                          alignItems: "flex-start",
                          p: 0,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            width: "100%",
                            mb: 1,
                          }}
                        >
                          <Box display="flex" flexDirection="column" gap={1}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: "600",
                                color: "#6B7A99",
                                fontSize: "14px",
                              }}
                            >
                              {symptom.title}
                            </Typography>

                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#2AB3A3",
                                  whiteSpace: "pre-line",
                                  fontStyle: "italic",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                }}
                              >
                                {symptom.symptomType}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{
                                color: "#6B7A99",
                                whiteSpace: "pre-line",
                                lineHeight: 1.6,
                                fontSize: "14px",
                              }}
                            >
                              {symptom.description}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Box
                              onClick={() => {
                                setActiveTab("symptoms");
                                setModalType("health-log");
                                setModalSelectedDate(selectedDate);
                                setIsModalOpen(true);
                                setIsEditDrawerOpen(false);
                              }}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                "&:hover": {
                                  backgroundColor: "rgba(42, 179, 163, 0.1)",
                                },
                              }}
                            >
                              <QuickEditSvg />
                            </Box>
                            <Box
                              onClick={() => handleDeleteSymptom(symptom.id)}
                              sx={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 95, 87, 0.1)",
                                },
                              }}
                            >
                              <DeleteIconWithBackground />
                            </Box>
                          </Box>
                        </Box>
                      </ListItem>
                      {index <
                        (calendarData[formatDateForInput(selectedDate)]
                          ?.symptoms?.length || 0) -
                          1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Empty State Drawer */}
      <Drawer
        anchor="right"
        open={isEmptyStateDrawerOpen}
        onClose={handleEmptyStateDrawerClose}
        PaperProps={{
          sx: {
            width: isSmallScreen ? "100%" : 600,
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
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Select a date"}
            </Typography>

            <IconButton onClick={handleEmptyStateDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              textAlign: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                mb: 2,
              }}
            >
              <img src={EmptyDrawerImage} alt="Empty drawer" />
            </Box>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#6B7A99",
                fontSize: "18px",
                mb: 1,
              }}
            >
              No records yet for today.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6B7A99",
                fontSize: "14px",
                maxWidth: "400px",
                mb: 3,
              }}
            >
              Start by adding your symptoms or reminders to keep your health
              insights accurate.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Button
                fullWidth
                onClick={handleAddManually}
                sx={{
                  backgroundColor: "#2AB3A3",
                  color: "white",
                  borderRadius: "20px",
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#1e8a7a",
                  },
                }}
              >
                Add manually
              </Button>

              <Button
                fullWidth
                onClick={handleChatWithAI}
                variant="outlined"
                sx={{
                  borderColor: "#2AB3A3",
                  color: "#2AB3A3",
                  backgroundColor: "transparent",
                  borderRadius: "20px",
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: "bold",
                  border: "2px solid #2AB3A3",
                  "&:hover": {
                    borderColor: "#1e8a7a",
                    color: "#1e8a7a",
                    backgroundColor: "rgba(42, 179, 163, 0.04)",
                    border: "2px solid #1e8a7a",
                  },
                }}
              >
                Chat with AI
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </MainLayout>
  );
};
