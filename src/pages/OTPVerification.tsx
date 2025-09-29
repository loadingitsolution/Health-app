import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { authPageContainerWide, authPageCard } from "../styleConstant";
import { AuthButton, AuthPageTitle, AuthLink, OtpInput } from "../components/auth";

export const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleVerifyOtp = () => {
    // In a real app, you would verify OTP here
    navigate("/reset-password");
  };

  const handleResendCode = () => {
    // In a real app, you would resend OTP here
    console.log("Resending OTP...");
  };

  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
  };

  return (
    <Box sx={authPageContainerWide}>
      <Box sx={authPageCard}>
        <AuthPageTitle 
          title="Enter a 6 digit Code"
          subtitle="Enter the 6 digit code that you recieved on your email."
        />

        <OtpInput onOtpChange={handleOtpChange} />

        {/* Resend Code */}
        <Box textAlign="center" mb={3}>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Code not recived ?{" "}
            <AuthLink variant="resend" onClick={handleResendCode}>
              RESEND
            </AuthLink>
          </Typography>
        </Box>

        {/* Submit Button */}
        <Box mb={3}>
          <AuthButton 
            onClick={handleVerifyOtp}
            disabled={otp.some((digit) => !digit)}
          >
            Submit
          </AuthButton>
        </Box>
      </Box>
    </Box>
  );
};