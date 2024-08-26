import {
  Autocomplete,
  Box,
  Chip,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { ERole } from "../../interfaces";
import { Controller } from "react-hook-form";

interface UserFormData {
  username: string;
  email: string;
  password: string;
  roles: ERole[];
}

export const UserCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<UserFormData>({});

  const password = watch("password", "");


  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
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
        <TextField
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors?.password}
          helperText={(errors as any)?.password?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="password"
          label={"Password"}
          name="password"
        />
        <TextField
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          error={!!errors?.confirmPassword}
          helperText={(errors as any)?.confirmPassword?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="password"
          label={"Confirm Password"}
          name="confirmPassword"
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
    </Create>
  );
};
