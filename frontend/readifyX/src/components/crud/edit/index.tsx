import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { EditProps } from "@refinedev/mui";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import {
  SimpleSaveButton,
  SimpleDeleteButton,
  SimpleGoBackButton,
  SimpleRefreshButton,
  SimpleListButton,
} from "../button";

export interface CustomEditProps extends EditProps {
  onSave?: () => void;
  onDelete?: () => void;
  onGoBack?: () => void;
  onRefresh?: () => void;
}

export const EditOrSaveEntity: React.FC<CustomEditProps> = ({
  title,
  isLoading = false,
  children,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  footerButtonProps,
  footerButtons,
  onSave,
  onDelete,
  onGoBack,
  onRefresh,
}) => {
  const goBack = onGoBack ?? (() => window.history.back());
  const handleSave = onSave ?? (() => {});
  const handleDelete = onDelete ?? (() => {});

  return (
    <Card {...(wrapperProps ?? {})}>
      <CardHeader
        sx={{
          display: "flex",
          flexWrap: "wrap",
          ".MuiCardHeader-actions": {
            margin: 0,
            alignSelf: "center",
          },
        }}
        title={
          <Typography variant="h5" className={RefinePageHeaderClassNames.Title}>
            {title || "Edit"}
          </Typography>
        }
        avatar={
          <SimpleGoBackButton to="#" onClick={goBack} /> // Use SimpleGoBackButton
        }
        action={
          <Box display="flex" gap="16px" {...(headerButtonProps ?? {})}>
            <SimpleListButton to="#" onClick={() => window.history.back()}>
              Back to List
            </SimpleListButton>
            <SimpleRefreshButton onClick={onRefresh} />
          </Box>
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>
        {isLoading ? <Typography>Loading...</Typography> : children}
      </CardContent>
      <CardActions sx={{ padding: "16px" }} {...(footerButtonProps ?? {})}>
        <Box display="flex" gap="16px">
          {onDelete && (
            <SimpleDeleteButton
              onConfirm={handleDelete}
              confirmTitle="Are you sure you want to delete this item?"
              confirmOkText="Delete"
              confirmCancelText="Cancel"
            >
              Delete
            </SimpleDeleteButton>
          )}
          <SimpleSaveButton onClick={handleSave}>Save</SimpleSaveButton>
        </Box>
      </CardActions>
    </Card>
  );
};
