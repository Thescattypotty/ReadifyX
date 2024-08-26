import {
  Box,
  Chip,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "@refinedev/react-hook-form";
import { TagRequest } from "../../interfaces";
import { Create } from "@refinedev/mui";

export const TagCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<TagRequest>({});

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
            {...register("name", {
                required: "This field is required",
            })}
            error={!!errors?.name}
            helperText={(errors as any)?.name?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label={"Name"}
            name="name"

        />

      </Box>
    </Create>
  );
};
