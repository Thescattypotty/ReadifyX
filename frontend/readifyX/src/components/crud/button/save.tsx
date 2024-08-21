import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveOutlined from "@mui/icons-material/SaveOutlined";

interface SimpleSaveButtonProps {
  loading?: boolean;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof SaveOutlined>;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleSaveButton: React.FC<SimpleSaveButtonProps> = ({
  loading = false,
  hideText = false,
  svgIconProps,
  children,
  onClick,
  sx,
  ...rest
}) => {
  return (
    <LoadingButton
      startIcon={!hideText && <SaveOutlined {...svgIconProps} />}
      loading={loading}
      sx={{ minWidth: 0, ...sx }}
      variant="contained"
      onClick={onClick}
      {...rest}
    >
      {hideText ? (
        <SaveOutlined fontSize="small" {...svgIconProps} />
      ) : (
        children
      )}
    </LoadingButton>
  );
};
