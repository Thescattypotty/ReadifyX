import { Chip, Stack, Typography } from "@mui/material";
import {
  DateField,
  EmailField,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

import { UserResponse } from "../../interfaces";
import { useEffect, useState } from "react";
import userDataProvider from "../../dataProvider/userDataProvider";
import { useNavigate, useParams } from "react-router-dom";
import { ShowEntity } from "../../components/crud/show";

export const UserShow = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [user, setUser] = useState<UserResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchUser = async () => {
		if (id) {
		setIsLoading(true);
		const userData = await userDataProvider.getOne(id);
		setUser(userData as UserResponse);
		setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [id]);

	const handleGoBack = () => navigate(-1);
	const handleEdit = () => navigate(`/users/edit/${id}`);
	
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
	const handleCreate = () => navigate(`/users/create`);
	const handleRefresh = () => id && fetchUser();

	if (user === null) {
		return (
		<ShowEntity
			title="Loading..."
			isLoading={true}
			onGoBack={handleGoBack}
			onRefresh={handleRefresh}
		/>
		);
	}
	return (
    <ShowEntity
      title={`User: ${user.username}`}
      isLoading={isLoading}
      onGoBack={handleGoBack}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      onRefresh={handleRefresh}
      canEdit={true}
      canDelete={true}
    >
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID
        </Typography>
        <TextField value={user.id} />

        <Typography variant="body1" fontWeight="bold">
          Username
        </Typography>
        <TextField value={user.username} />

        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <EmailField value={user.email} />

        <Typography variant="body1" fontWeight="bold">
          Roles
        </Typography>
        <Stack direction="row" spacing={1}>
          {user.roles.map((role) => (
            <Chip key={role} label={role} />
          ))}
        </Stack>

        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={user.createdAt} />

        <Typography variant="body1" fontWeight="bold">
          Updated At
        </Typography>
        <DateField value={user.updatedAt} />
      </Stack>
    </ShowEntity>
  );
};
