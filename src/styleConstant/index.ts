import { type SxProps, type Theme } from "@mui/material";
import { theme } from "../theme/theme";

export const loginButtonVia = {
  py: 1.5,
  mb: 2,
  backgroundColor: "#F3F6FA",
  color: "#313957",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  border: 0,

  "&:hover": {
    backgroundColor: "#F3F6FA",
  },
};

// AuthLayout styles
export const authLayoutContainer = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  padding: "20px",
};

export const authLayoutHeader = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pb: 3,
  flexShrink: 0,

  [theme.breakpoints.down("sm")]: {
    "& svg": {
      width: "156px",
    },
  },
};

export const authLayoutFormArea = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  overflowY: "auto",
  paddingY: 2,
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#D1D5DB",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#9CA3AF",
  },
};

export const authLayoutFormWrapper = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const authLayoutFooter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pt: 3,
  flexShrink: 0,
};

export const authLayoutCopyright = {
  color: "#A0B0C0",
  fontSize: "16px",
};

// Common Auth Page Styles
export const authPageContainer = {
  width: "388px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "calc(100vh - 201px)",
};

export const authPageContainerWide = {
  maxWidth: "479px",
  width: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "calc(100vh - 201px)",
};

export const authPageCard = {
  backgroundColor: "#F3F6FA",
  padding: { xs: "30px 20px", sm: "30px 50px" },
  borderRadius: 2,
};

export const authPageTitle: SxProps<Theme> = {
  color: "#0C1421",
  fontSize: { xs: "24px", sm: "32px" },
  textAlign: "center",
  pb: 3,
};

export const authPageSubtitle: SxProps<Theme> = {
  color: "#6B7280",
  fontSize: { xs: "14px", sm: "16px" },
  textAlign: "center",
  pb: 4,
};

export const authFieldLabel = {
  fontWeight: 500,
  mb: 1,
};

export const authSubmitButton = {
  py: 1.5,
};

export const authLinkStyle = {
  color: "#1E4AE9",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

export const authResendLink = {
  color: "#32CD32",
  textTransform: "uppercase",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
};

export const authCopyright = {
  fontSize: "14px",
  textAlign: "center",
  pt: 5,
};

export const tabsWrapper = {
  mb: 2,
  "& .MuiTabs-list": {
    border: "1px solid #2AB3A399",
    borderRadius: "12px",
    padding: "2px",
  },
  "& .MuiTab-root": {
    textTransform: "none",
    fontWeight: 700,
    fontSize: "13px",
    minHeight: "38px",
    color: "#2AB3A399",
  },
  "& .Mui-selected": {
    backgroundColor: "#2AB3A3 !important",
    color: "#FFF !important",
    borderRadius: "12px",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
};

export const TitleWithIcon = {
  svg: {
    path: {
      fill: "#6B7A99",
    },
  },
};
