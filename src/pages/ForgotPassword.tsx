import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { AuthButton, AuthPageTitle, FormField } from "../components/auth";
import { authPageContainer } from "../styleConstant";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // In a real app, you would send OTP here
    navigate("/otp-verification");
  };

  return (
    <Box sx={authPageContainer}>
      <AuthPageTitle
        title="Forgot Your Password?"
        subtitle="Enter Your Email for the Verification Process, We will send a 6 digit code to your Email."
      />

      <FormField label="Email" placeholder="Example@email.com" />

      <Box mt={3}>
        <AuthButton onClick={handleSendOTP}>Submit</AuthButton>
      </Box>
    </Box>
  );
};
