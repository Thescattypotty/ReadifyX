import React from "react";
import Button from "@mui/material/Button";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import { Link as RouterLink } from "react-router-dom";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

interface SimpleCreateButtonProps {
  to: string;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof AddBoxOutlined>;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleCreateButton: React.FC<SimpleCreateButtonProps> = ({
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
        startIcon={!hideText && <AddBoxOutlined {...svgIconProps} />}
        sx={{ minWidth: 0, ...sx }}
        variant="contained"
        onClick={handleClick}
        data-testid={RefineButtonTestIds.CreateButton}
        className={RefineButtonClassNames.CreateButton}
        {...rest}
      >
        {hideText ? (
          <AddBoxOutlined fontSize="small" {...svgIconProps} />
        ) : (
          children
        )}
      </Button>
    </RouterLink>
  );
};
