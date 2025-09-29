import { Typography, type SxProps, type Theme } from "@mui/material";
import { authPageTitle, authPageSubtitle } from "../../styleConstant";

interface AuthPageTitleProps {
  title: string;
  subtitle?: string;
  titleVariant?: "h3" | "h4" | "h5";
  titleSx?: SxProps<Theme>;
}

export const AuthPageTitle = ({
  title,
  subtitle,
  titleVariant = "h4",
  titleSx = {},
}: AuthPageTitleProps) => {
  return (
    <>
      <Typography
        variant={titleVariant}
        sx={{ ...authPageTitle, ...titleSx } as SxProps<Theme>}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" sx={authPageSubtitle}>
          {subtitle}
        </Typography>
      )}
    </>
  );
};
