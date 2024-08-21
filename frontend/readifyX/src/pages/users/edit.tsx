import { UserRequest, UserResponse } from "../../interfaces";
import { useEffect, useState } from "react";
import userDataProvider from "../../dataProvider/userDataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { EditOrSaveEntity } from "../../components/crud/edit";
import {
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ERole } from "../../interfaces";

export const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userUpdate, setUserUpdate] = useState<UserRequest | null>(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    if (id) {
      setIsLoading(true);
      const userData = await userDataProvider.getOne(id);
      setUser(userData as UserResponse);
      setUserUpdate({
        username: userData.username,
        email: userData.email,
        roles: userData.roles,
        password: null,
      });
      setIsLoading(false);
    }
  };
  const handleGoBack = () => navigate(-1);

  const handleSave = async () => {
    if (id && userUpdate) {
      try {
        await userDataProvider.update(id, userUpdate);
        navigate(`/users/show/${id}`);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };
  const handleDelete = async () => {
    if (id) {
      try {
        await userDataProvider.delete(id);
        navigate(`/users`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleRefresh = () => id && fetchUser();

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserUpdate((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleChangeRoles = (event: SelectChangeEvent<ERole[]>) => {
    const { value } = event.target;
    setUserUpdate((prev) =>
      prev ? { ...prev, roles: value as ERole[] } : prev
    );
  };

  if (user === null) {
    return (
      <EditOrSaveEntity
        title="Loading..."
        isLoading={true}
        onGoBack={handleGoBack}
        onRefresh={handleRefresh}
      />
    );
  }

  return (
    <EditOrSaveEntity
      title={`Edit User: ${user?.username || ""}`}
      isLoading={isLoading}
      onSave={handleSave}
      onDelete={handleDelete}
      onGoBack={handleGoBack}
      onRefresh={handleRefresh}
    >
      <Stack spacing={2}>
        <Typography variant="body1" fontWeight="bold">
          Username
        </Typography>
        <TextField
          name="username"
          value={userUpdate?.username || ""}
          onChange={handleChangeText}
          fullWidth
        />

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <TextField
          name="email"
          value={userUpdate?.email || ""}
          onChange={handleChangeText}
          fullWidth
        />

        <Typography variant="body1" fontWeight="bold">
          Roles
        </Typography>
        <Select
          name="roles"
          multiple
          value={userUpdate?.roles || []}
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
          value={userUpdate?.password || ""}
          onChange={handleChangeText}
          fullWidth
        />
      </Stack>
    </EditOrSaveEntity>
  );
};
