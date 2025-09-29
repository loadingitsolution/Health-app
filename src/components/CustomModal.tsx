import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";
import { type FC } from "react";
import type { CustomModalProps } from "../types";

export const CustomModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  onSave,
  onCancel,
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  saveButtonDisabled = false,
  cancelButtonDisabled = false,
  showCloseIcon = true,
  maxWidth = "sm",
  fullWidth = true,
  fullScreen = false,
  saveButtonColor = "#2AB3A3",
  saveButtonHoverColor = "#1e8a7a",
}) => {
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Zoom}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          minHeight: fullScreen ? "100vh" : "auto",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Box sx={{ flex: 1, pr: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "900",
              color: "#6B7A99",
              fontSize: "18px",
            }}
          >
            {title}
          </Typography>
        </Box>

        {showCloseIcon && (
          <IconButton
            onClick={onClose}
            sx={{
              color: "#999",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#666",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          padding: "24px",
          paddingBottom: "0",
          "&.MuiDialogContent-root": {
            paddingTop: subtitle ? "16px" : "24px",
          },
        }}
      >
        <>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: "#6B7A99",
                fontSize: "14px",
                fontWeight: 900,
                pb: 1,
              }}
            >
              {subtitle}
            </Typography>
          )}
          {children}
        </>
      </DialogContent>

      {/* Actions */}
      {(onSave || onCancel) && (
        <DialogActions
          sx={{
            padding: "24px",
            gap: 2,
          }}
        >
          <Button
            onClick={handleCancel}
            disabled={cancelButtonDisabled}
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              color: "#666",
              backgroundColor: "#D4D8DC",
              "&:hover": {
                backgroundColor: "#D4D8DC",
              },
            }}
          >
            {cancelButtonText}
          </Button>

          <Button
            onClick={handleSave}
            disabled={saveButtonDisabled}
            variant="contained"
            fullWidth
            sx={{
              textTransform: "none",
              fontWeight: 500,
              fontSize: "14px",
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: saveButtonColor,
              "&:hover": {
                backgroundColor: saveButtonHoverColor,
              },
              "&:disabled": {
                backgroundColor: "#E0E0E0",
                color: "#999",
              },
            }}
          >
            {saveButtonText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
