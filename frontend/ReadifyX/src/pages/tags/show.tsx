import { Chip, Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

import { TagResponse } from "../../interfaces";

export const TagShow = () => {
    const { queryResult } = useShow<TagResponse>({});

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
            Name
          </Typography>
          <TextField value={record.name} />

          <Typography variant="body1" fontWeight="bold">
            Created At
          </Typography>
          <DateField value={record.createdAt} />
        </Stack>
      </Show>
    );
};