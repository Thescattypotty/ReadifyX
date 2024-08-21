import React from "react";
import Button from "@mui/material/Button";
import ListOutlined from "@mui/icons-material/ListOutlined";
import { Link as RouterLink } from "react-router-dom";

interface SimpleListButtonProps {
  to: string;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof ListOutlined>;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleListButton: React.FC<SimpleListButtonProps> = ({
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
        startIcon={!hideText && <ListOutlined {...svgIconProps} />}
        sx={{ minWidth: 0, ...sx }}
        onClick={handleClick}
        {...rest}
      >
        {hideText ? (
          <ListOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children
        )}
      </Button>
    </RouterLink>
  );
};
