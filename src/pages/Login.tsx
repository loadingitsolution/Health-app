import {
  Box,
  TextField,
  Typography,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { loginButtonVia } from "../styleConstant";
import { GoogleIcon, WeChatIcon } from "../assets";
import { useNavigate } from "react-router";
import { ReCaptcha } from "../components/auth";
import { useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    setIsRecaptchaVerified(!!token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setIsRecaptchaVerified(false);
  };

  const handleSignIn = () => {
    if (!isRecaptchaVerified) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }
    // Add your login logic here
    console.log("Login with token:", recaptchaToken);
  };

  return (
    <Box width="388px" margin="auto">
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ color: "#0C1421", fontSize: { xs: "24px", sm: "36px" }, pb: 5 }}
      >
        Welcome Back 👋
      </Typography>

      <Box mt={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Email
        </Typography>
        <TextField fullWidth placeholder="Example@email.com" />
      </Box>

      <Box mt={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="at least 8 characters"
        />
      </Box>

      {/* Forgot Password Link */}
      <Box mt={1} textAlign="right">
        <Link
          onClick={() => navigate("/forgot-password")}
          variant="body2"
          sx={{
            color: "#1E4AE9",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      {/* reCAPTCHA */}
      <ReCaptcha
        siteKey={
          import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
          "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        } // Uses env var or test key as fallback
        onChange={handleRecaptchaChange}
        onExpired={handleRecaptchaExpired}
        mt={2}
        mb={2}
      />

      {/* Sign In Button */}
      <Box mt={3}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{ py: 1.5 }}
          onClick={handleSignIn}
          disabled={!isRecaptchaVerified}
        >
          Sign in
        </Button>
      </Box>

      {/* Divider */}
      <Box mt={3} mb={3}>
        <Divider>
          <Typography variant="body2" color="text.secondary">
            Or
          </Typography>
        </Divider>
      </Box>

      <Box my={3}>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          sx={loginButtonVia}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          sx={{ ...loginButtonVia, mb: 0 }}
          startIcon={<WeChatIcon />}
        >
          Sign in with WeChat
        </Button>
      </Box>

      <Box pt={5} textAlign="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          Don't have an account?
          <Link
            onClick={() => navigate("/register")}
            color="primary"
            sx={{
              fontSize: "16px",
              color: "#1E4AE9",
              pl: 1,
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
