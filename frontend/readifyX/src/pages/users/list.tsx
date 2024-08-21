import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  ShowButton,
} from "@refinedev/mui";
import React, { useEffect, useState } from "react";
import userDataProvider from "../../dataProvider/userDataProvider";
import { UserResponse } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardHeader, Typography } from "@mui/material";

import { RefinePageHeaderClassNames } from "@refinedev/ui-types";
import {
  SimpleCreateButton,
  SimpleGoBackButton,
  SimpleRefreshButton,
} from "../../components/crud/button";

export const UsersList = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
      const users = await userDataProvider.getList();
      setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
          await userDataProvider.delete(id);
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
    };
    const handleGoBack = () => navigate(-1);

    const handleRefresh = () => fetchUsers();

    const handleCreate = () => navigate(`/users/create`);

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "string",
                minWidth: 120
            },
            {
                field: "username",
                headerName: "Username",
                type: "string",
                minWidth: 200
            },
            {
                field: "email",
                headerName: "Email",
                type: "string",
                minWidth: 250,
                renderCell: function render({value}){
                    return<EmailField value={value} />;
                }
            },
            {
                field: "roles",
                headerName: "Roles",
                type: "string",
                minWidth: 300
            },
            {
                field: "createdAt",
                headerName: "Created At",
                type: "string",
                minWidth: 250,
                renderCell: function render({value}){
                    return <DateField value={value}/>;
                },
            },
            {
                field: "updatedAt",
                headerName: "Updated At",
                type: "string",
                minWidth: 250,
                renderCell: function render({value}){
                    return <DateField value={value}/>;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                renderCell: function render({ row }){
                    return(
                        <>
                            <EditButton hideText recordItemId={row.id} onClick={() => navigate(`/users/edit/${row.id}`)}/>
                            <ShowButton hideText recordItemId={row.id} onClick={() => navigate(`/users/show/${row.id}`)}/>
                            <DeleteButton hideText recordItemId={row.id} onClick={() => handleDelete(row.id)}/>
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],[]
    );
    return (
      <>
        <Card>
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
              <Typography
                variant="h5"
                className={RefinePageHeaderClassNames.Title}
              >
                Users
              </Typography>
            }
            avatar={
                <SimpleGoBackButton to="#" onClick={handleGoBack} /> 
            }
            action={
                <Box display="flex" gap="16px">
                    <SimpleCreateButton to="#" onClick={handleCreate}>
                        Create
                    </SimpleCreateButton>
                    <SimpleRefreshButton onClick={handleRefresh} />
                </Box>
            }
          ></CardHeader>
        </Card>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid rows={users} columns={columns} autoHeight />
        </div>
      </>
    );
};
