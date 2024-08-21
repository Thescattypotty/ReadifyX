import React from "react";
import Button from "@mui/material/Button";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Link as RouterLink } from "react-router-dom";

interface SimpleEditButtonProps {
  to: string;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof EditOutlined>;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleEditButton: React.FC<SimpleEditButtonProps> = ({
  to,
  hideText = false,
  svgIconProps,
  children,
  disabled = false,
  onClick,
  sx,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Button
        disabled={disabled}
        startIcon={!hideText && <EditOutlined {...svgIconProps} />}
        sx={{ minWidth: 0, ...sx }}
        onClick={handleClick}
        {...rest}
      >
        {hideText ? (
          <EditOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children
        )}
      </Button>
    </RouterLink>
  );
};
