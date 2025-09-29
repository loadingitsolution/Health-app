import type { ReactNode } from "react";

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSave?: () => void;
  onCancel?: () => void;
  saveButtonText?: string;
  cancelButtonText?: string;
  saveButtonDisabled?: boolean;
  cancelButtonDisabled?: boolean;
  showCloseIcon?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  fullScreen?: boolean;
  saveButtonColor?: string;
  saveButtonHoverColor?: string;
}
