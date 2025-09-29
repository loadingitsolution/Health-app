import { Box, TextField } from "@mui/material";
import { useState } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onOtpChange?: (otp: string[]) => void;
}

export const OtpInput = ({
  length = 6,
  onComplete,
  onOtpChange,
}: OtpInputProps) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (onOtpChange) {
        onOtpChange(newOtp);
      }

      // Auto focus next input
      if (value && index < length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Call onComplete when all fields are filled
      if (newOtp.every((digit) => digit !== "") && onComplete) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <Box display="flex" justifyContent="center" gap={1.5} mb={4}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-${index}`}
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "20px",
            },
          }}
          sx={{
            width: "50px",
            "& .MuiOutlinedInput-root": {
              height: "50px",
            },
          }}
        />
      ))}
    </Box>
  );
};
