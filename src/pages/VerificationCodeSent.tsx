import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { authPageContainerWide, authPageCard } from "../styleConstant";
import { AuthButton, AuthPageTitle } from "../components/auth";

export const VerificationCodeSent = () => {
  const navigate = useNavigate();

  const handleGoToEmail = () => {
    // In a real app, you might open the user's email client
    console.log("Opening email client...");
  };

  const handleVerify = () => {
    // Navigate to OTP verification page
    navigate("/otp-verification");
  };

  return (
    <Box sx={authPageContainerWide}>
      <Box sx={authPageCard}>
        <AuthPageTitle
          title="Verification Code Sent"
          subtitle="Verification Code has been sent to you Email Address To Verify your email address please go to your email and enter a 6 digits code into next screen."
        />

        {/* Action Buttons */}
        <Box mb={3}>
          <AuthButton
            onClick={handleGoToEmail}
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Go to your Email
          </AuthButton>
        </Box>

        <Box mb={3}>
          <AuthButton onClick={handleVerify}>Verify</AuthButton>
        </Box>
      </Box>
    </Box>
  );
};
