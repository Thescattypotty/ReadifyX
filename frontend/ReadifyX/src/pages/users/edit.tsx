import { Autocomplete, Box, Chip, Select, Stack, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { ERole, UserRequest } from "../../interfaces";

export const UserEdit = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm<UserRequest>({});

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("username", {
            required: "This field is required",
          })}
          error={!!errors?.username}
          helperText={(errors as any)?.username?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Username"}
          name="username"
        />
        <TextField
          {...register("email", {
            required: "This field is required",
          })}
          error={!!errors?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label={"Email"}
          name="email"
        />
        <Typography variant="body1" fontWeight="bold">
          Roles
        </Typography>
        <Controller
          name="roles"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              fullWidth
              renderValue={(selected) => (
                <Stack direction="row" spacing={1}>
                  {(selected as ERole[]).map((role) => (
                    <Chip key={role} label={role} />
                  ))}
                </Stack>
              )}
            >
              {Object.values(ERole).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Box>
    </Edit>
  );
  
};