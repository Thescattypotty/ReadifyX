import React from "react";
import Button from "@mui/material/Button";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { Link as RouterLink } from "react-router-dom";

interface SimpleShowButtonProps {
  to: string;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof VisibilityOutlined>;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleShowButton: React.FC<SimpleShowButtonProps> = ({
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
        startIcon={!hideText && <VisibilityOutlined {...svgIconProps} />}
        sx={{ minWidth: 0, ...sx }}
        onClick={handleClick}
        {...rest}
      >
        {hideText ? (
          <VisibilityOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children
        )}
      </Button>
    </RouterLink>
  );
};
