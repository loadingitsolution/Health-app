import { Box, Typography } from "@mui/material";
import { AuthLogo } from "../assets";
import {
  authLayoutContainer,
  authLayoutHeader,
  authLayoutFormArea,
  authLayoutFormWrapper,
  authLayoutFooter,
  authLayoutCopyright,
} from "../styleConstant";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const getFullYear = new Date().getFullYear();
  return (
    <Box sx={authLayoutContainer}>
      {/* Fixed Header */}
      <Box sx={authLayoutHeader}>
        <AuthLogo />
      </Box>

      {/* Scrollable Form Area */}
      <Box sx={authLayoutFormArea}>
        <Box sx={authLayoutFormWrapper}>{children}</Box>
      </Box>

      {/* Fixed Footer */}
      <Box sx={authLayoutFooter}>
        <Typography sx={authLayoutCopyright}>
          © {getFullYear} ALL RIGHTS RESERVED
        </Typography>
      </Box>
    </Box>
  );
};
