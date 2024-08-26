import {
  Box,
  TextField
} from "@mui/material";
import { TagRequest } from "../../interfaces";
import { useForm } from "@refinedev/react-hook-form";
import { Edit } from "@refinedev/mui";


export const TagEdit = () => {
    const {
      saveButtonProps,
      refineCore: { formLoading },
      register,
      control,
      formState: { errors },
    } = useForm<TagRequest>({});

    return (
      <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
      </Edit>
    );
};