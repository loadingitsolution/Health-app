import { Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCaptchaProps {
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
  siteKey: string;
  mt?: number;
  mb?: number;
}

export const ReCaptcha = ({
  onChange,
  onExpired,
  onError,
  siteKey,
  mt = 2,
  mb = 2,
}: ReCaptchaProps) => {
  return (
    <Box mt={mt} mb={mb} display="flex" justifyContent="center">
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={onChange}
        onExpired={onExpired}
        onErrored={onError}
        theme="light"
        size="normal"
      />
    </Box>
  );
};
