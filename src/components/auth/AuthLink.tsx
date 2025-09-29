import { Link } from "@mui/material";
import { authLinkStyle, authResendLink } from "../../styleConstant";

interface AuthLinkProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "resend";
  sx?: any;
}

export const AuthLink = ({
  children,
  onClick,
  variant = "primary",
  sx = {},
}: AuthLinkProps) => {
  const linkStyle = variant === "resend" ? authResendLink : authLinkStyle;

  return (
    <Link onClick={onClick} sx={{ ...linkStyle, ...sx }}>
      {children}
    </Link>
  );
};
