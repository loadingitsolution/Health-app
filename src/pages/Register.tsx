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

export const Register = () => {
  const navigate = useNavigate();

  return (
    <Box width="388px" margin="auto">
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ color: "#0C1421", fontSize: { xs: "24px", sm: "36px" }, pb: 2 }}
      >
        Create an account ✒
      </Typography>

      <Typography
        variant="body1"
        textAlign="center"
        sx={{ color: "#6B7280", fontSize: { xs: "14px", sm: "16px" }, pb: 4 }}
      >
        A new journey begins today. It's your route to shape.
        <br />
        Sign up to streamline your freight and bids.
      </Typography>

      <Box mt={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Email
        </Typography>
        <TextField fullWidth placeholder="Example@email.com" />
      </Box>

      <Box mt={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Phone Number
        </Typography>
        <TextField fullWidth placeholder="021 54 86 539" />
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

      <Box mt={2}>
        <Typography variant="body2" fontWeight={400} mb={1}>
          Confirm Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          placeholder="at least 8 characters"
        />
      </Box>

      {/* Sign Up Button */}
      <Box mt={3}>
        <Button fullWidth variant="contained" size="medium" sx={{ py: 1.5 }}>
          Sign Up
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
          Sign up with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          size="medium"
          sx={{ ...loginButtonVia, mb: 0 }}
          startIcon={<WeChatIcon />}
        >
          Sign up with WeChat
        </Button>
      </Box>

      <Box pt={5} textAlign="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "16px" }}
        >
          Already have an account?
          <Link
            onClick={() => navigate("/")}
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
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};
