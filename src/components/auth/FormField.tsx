import { Box, TextField, Typography, type InputProps } from "@mui/material";
import { authFieldLabel } from "../../styleConstant";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  InputProps?: InputProps;
  mt?: number;
  mb?: number;
  multiline?: boolean;
  rows?: number;
}

export const FormField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  InputProps,
  mt = 2,
  mb = 0,
  multiline = false,
  rows = 4,
}: FormFieldProps) => {
  return (
    <Box mt={mt} mb={mb}>
      <Typography variant="body2" sx={authFieldLabel}>
        {label}
      </Typography>
      <TextField
        fullWidth
        type={type}
        multiline={multiline}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={InputProps}
      />
    </Box>
  );
};
