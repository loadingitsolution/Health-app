import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleResetPassword = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    // In a real app, you would reset password here
    alert("Password reset successfully!");
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      width="388px"
      margin="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="calc(100vh - 201px)"
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ color: "#0C1421", fontSize: { xs: "24px", sm: "32px" }, pb: 3 }}
      >
        Reset Your Password
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        sx={{ color: "#6B7280", fontSize: { xs: "14px", sm: "16px" }, pb: 4 }}
      >
        Please enter your new password and confirm it to reset your account
        password.
      </Typography>

      {/* New Password Field */}
      <Box mb={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          New Password
        </Typography>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={formData.password}
          onChange={handleInputChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Confirm Password Field */}
      <Box mb={4}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={toggleConfirmPasswordVisibility}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Reset Password Button */}
      <Box mb={3}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{ py: 1.5 }}
          onClick={handleResetPassword}
          disabled={!formData.password || !formData.confirmPassword}
        >
          Reset Password
        </Button>
      </Box>

      {/* Back to Login */}
      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};
