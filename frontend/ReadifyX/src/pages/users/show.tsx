import { Chip, Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  EmailField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { UserResponse } from "../../interfaces";

export const UserShow = () => {

    const { queryResult } = useShow<UserResponse>({});

    const { data, isLoading } = queryResult;

    const record = data?.data;

    if(!record)
    {
        return <Show isLoading={isLoading}></Show>
    }

    return (
      <Show isLoading={isLoading}>
        <Stack gap={1}>
          <Typography variant="body1" fontWeight="bold">
            ID
          </Typography>
          <TextField value={record.id} />

          <Typography variant="body1" fontWeight="bold">
            Username
          </Typography>
          <TextField value={record.username} />

          <Typography variant="body1" fontWeight="bold">
            Email
          </Typography>
          <EmailField value={record.email} />

          <Typography variant="body1" fontWeight="bold">
            Roles
          </Typography>
          <Stack direction="row" spacing={1}>
            {record.roles.map((role) => (
              <Chip key={role} label={role} />
            ))}
          </Stack>

          <Typography variant="body1" fontWeight="bold">
            Created At
          </Typography>
          <DateField value={record.createdAt} />

          <Typography variant="body1" fontWeight="bold">
            Updated At
          </Typography>
          <DateField value={record.updatedAt} />
        </Stack>
      </Show>
    );
};
