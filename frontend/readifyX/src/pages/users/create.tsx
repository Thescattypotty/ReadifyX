import { UserRequest, UserResponse } from "../../interfaces";
import { useState } from "react";
import userDataProvider from "../../dataProvider/userDataProvider";
import { useNavigate } from "react-router-dom";
import { EditOrSaveEntity } from "../../components/crud/edit";
import { ERole } from "../../interfaces";

import {
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const UserCreate = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserRequest>({
    username: "",
    email: "",
    roles: [],
    password: "",
  });
  const [passwordMatch, setPasswordMatch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleGoBack = () => navigate(-1);

  const handleSave = async () => {
    if (user.password !== passwordMatch) {
      setErrors({ passwordMatch: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    try {
      await userDataProvider.create(user);
      navigate(`/users`);
    } catch (error) {
      console.log("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleChangeRoles = (event: SelectChangeEvent<ERole[]>) => {
    const { value } = event.target;
    setUser((prev) => (prev ? { ...prev, roles: value as ERole[] } : prev));
  };

  const handlePasswordMatchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordMatch(event.target.value);
  };

  return (
    <EditOrSaveEntity
      title={"Create User"}
      isLoading={isLoading}
      onSave={handleSave}
      onGoBack={handleGoBack}
    >
      <Stack spacing={2}>
        <Typography variant="body1" fontWeight="bold">
          Username
        </Typography>
        <TextField
          name="username"
          value={user.username}
          onChange={handleChangeText}
          fullWidth
        />

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <TextField
          name="email"
          value={user.email}
          onChange={handleChangeText}
          fullWidth
        />

        <Typography variant="body1" fontWeight="bold">
          Roles
        </Typography>
        <Select
          name="roles"
          multiple
          value={user.roles}
          onChange={handleChangeRoles}
          renderValue={(selected) => (
            <Stack direction="row" spacing={1}>
              {(selected as ERole[]).map((role) => (
                <Chip key={role} label={role} />
              ))}
            </Stack>
          )}
          fullWidth
        >
          {Object.values(ERole).map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>

        <Typography variant="body1" fontWeight="bold">
          Password
        </Typography>
        <TextField
          name="password"
          type="password"
          value={user.password}
          onChange={handleChangeText}
          fullWidth
          error={!!errors.passwordMatch}
          helperText={errors.passwordMatch}
        />

        <Typography variant="body1" fontWeight="bold">
          Confirm Password
        </Typography>
        <TextField
          name="passwordMatch"
          type="password"
          value={passwordMatch}
          onChange={handlePasswordMatchChange}
          fullWidth
          error={!!errors.passwordMatch}
          helperText={errors.passwordMatch}
        />
      </Stack>
    </EditOrSaveEntity>
  );
};
