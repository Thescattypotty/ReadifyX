import React from "react";
import {
  List,
  useDataGrid,
  EditButton,
  ShowButton,
  DateField,
  EmailField,
  DeleteButton,
} from "@refinedev/mui";

import {
  DataGrid,
  GridColDef
} from "@mui/x-data-grid";
import { ERole, UserResponse } from "../../interfaces";

export const UsersList = () => {
  const { dataGridProps } = useDataGrid<UserResponse>({
    resource: "user",
    syncWithLocation: true,
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "string",
        minWidth: 120,
      },
      {
        field: "username",
        headerName: "Username",
        type: "string",
        minWidth: 200,
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />;
        },
      },
      {
        field: "roles",
        headerName: "Roles",
        type: "string",
        minWidth: 300,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "string",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        type: "string",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );
  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
