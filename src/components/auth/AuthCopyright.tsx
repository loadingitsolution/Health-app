import { Box, Typography } from "@mui/material";
import { authCopyright } from "../../styleConstant";

export const AuthCopyright = () => {
  return (
    <Box sx={authCopyright}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: "14px" }}
      >
        © 2023 ALL RIGHTS RESERVED
      </Typography>
    </Box>
  );
};
