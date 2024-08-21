import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import RefreshOutlined from "@mui/icons-material/RefreshOutlined";

interface SimpleRefreshButtonProps {
  loading?: boolean;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof RefreshOutlined>;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  sx?: any;
}

export const SimpleRefreshButton: React.FC<SimpleRefreshButtonProps> = ({
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
      startIcon={!hideText && <RefreshOutlined {...svgIconProps} />}
      loading={loading}
      loadingPosition={hideText ? "center" : "start"}
      onClick={onClick}
      sx={{ minWidth: 0, ...sx }}
      {...rest}
    >
      {hideText ? (
        <RefreshOutlined fontSize="small" {...svgIconProps} />
      ) : (
        children
      )}
    </LoadingButton>
  );
};
