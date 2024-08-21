import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ShowProps } from "@refinedev/mui";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import {
  SimpleCreateButton,
  SimpleDeleteButton,
  SimpleEditButton,
  SimpleGoBackButton,
  SimpleRefreshButton,
} from "../button";


export interface CustomShowProps extends ShowProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onGoBack?: () => void;
  onCreate?: () => void; // New prop for Create button
  onRefresh?: () => void; // New prop for Refresh button
}

export const ShowEntity: React.FC<CustomShowProps> = ({
  title,
  canEdit,
  canDelete,
  isLoading = false,
  children,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  footerButtonProps,
  footerButtons,
  onEdit,
  onDelete,
  onGoBack,
  onCreate,
  onRefresh,
}) => {
  const goBack = onGoBack ?? (() => window.history.back());
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
            {title || "Show"}
          </Typography>
        }
        avatar={
          <SimpleGoBackButton to="#" onClick={goBack} /> // Use SimpleGoBackButton
        }
        action={
          <Box display="flex" gap="16px" {...(headerButtonProps ?? {})}>
            {canEdit && (
              <SimpleEditButton to="#" onClick={onEdit}>
                Edit
              </SimpleEditButton>
            )}
            {canDelete && (
              <SimpleDeleteButton
                onConfirm={handleDelete}
                confirmTitle="Are you sure you want to delete this item?"
                confirmOkText="Delete"
                confirmCancelText="Cancel"
              >
                Delete
              </SimpleDeleteButton>
            )}
            <SimpleCreateButton to="#" onClick={onCreate}>
              Create New
            </SimpleCreateButton>
            <SimpleRefreshButton onClick={onRefresh} />
          </Box>
        }
      />
      <CardContent {...(contentProps ?? {})}>
        {isLoading ? <Typography>Loading...</Typography> : children}
      </CardContent>
      <CardActions
        sx={{ padding: "16px" }}
        {...(footerButtonProps ?? {})}
      ></CardActions>
    </Card>
  );
};
