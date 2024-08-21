import React from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

interface SimpleGoBackButtonProps {
  onClick?: () => void;
  to?: string; // Optional URL to redirect
  children?: React.ReactNode; // Optional children for button text
}

export const SimpleGoBackButton: React.FC<SimpleGoBackButtonProps> = ({
  onClick,
  to = "#", // Default URL is a placeholder
  ...rest
}) => {
  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else {
      window.history.back(); // Default behavior if no onClick handler is provided
    }
  };

  return (
    <IconButton onClick={handleGoBack} aria-label="go-back" style={{ textDecoration: "none" }} {...rest}>
        <ArrowBackIcon />
    </IconButton>
  );
};
