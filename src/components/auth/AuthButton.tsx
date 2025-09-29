import { Button } from "@mui/material";
import { authSubmitButton } from "../../styleConstant";

interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "contained" | "outlined" | "text";
  fullWidth?: boolean;
  sx?: any;
  startIcon?: React.ReactNode;
}

export const AuthButton = ({
  children,
  onClick,
  disabled = false,
  variant = "contained",
  fullWidth = true,
  sx = {},
  startIcon,
}: AuthButtonProps) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      size="medium"
      sx={{ ...authSubmitButton, ...sx }}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
};
