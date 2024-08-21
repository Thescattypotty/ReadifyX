import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
} from "@refinedev/ui-types";

interface SimpleDeleteButtonProps {
  onConfirm: () => void;
  confirmTitle?: string;
  confirmOkText?: string;
  confirmCancelText?: string;
  hideText?: boolean;
  svgIconProps?: React.ComponentProps<typeof DeleteOutline>;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  sx?: any;
  children?: React.ReactNode;
}

export const SimpleDeleteButton: React.FC<SimpleDeleteButtonProps> = ({
  onConfirm,
  confirmTitle = "Are you sure?",
  confirmOkText = "Delete",
  confirmCancelText = "Cancel",
  hideText = false,
  svgIconProps,
  disabled = false,
  loading = false,
  title,
  sx,
  children,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <div>
      <LoadingButton
        color="error"
        onClick={() => setOpen(true)}
        disabled={disabled}
        loading={loading}
        startIcon={!hideText && <DeleteOutline {...svgIconProps} />}
        title={title}
        sx={{ minWidth: 0, ...sx }}
        loadingPosition={hideText ? "center" : "start"}
        data-testid={RefineButtonTestIds.DeleteButton}
        className={RefineButtonClassNames.DeleteButton}
        {...rest}
      >
        {hideText ? (
          <DeleteOutline fontSize="small" {...svgIconProps} />
        ) : (
          children
        )}
      </LoadingButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmTitle}</DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpen(false)}>{confirmCancelText}</Button>
          <Button color="error" onClick={handleConfirm} autoFocus>
            {confirmOkText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
