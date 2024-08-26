import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity, useList } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { UserResponse } from "../../interfaces";
import { Autocomplete, Box, Link, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

interface IOptions {
  label: string;
  link: string;
  category: string;
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const [value , setValue] = useState("");
  const [options , setOptions] = useState<IOptions[]>([]);

  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<UserResponse | null>();


  const { refetch: refetchUsers } = useList<UserResponse>({
    resource: "user",
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const userOptionGroup: IOptions[] = data.data.map((item) => {
          return{
            label: `${item.username} / ${item.email}`,
            link: `/users/show/${item.id}`,
            category: "users"
          }
        });
          if(userOptionGroup.length > 0) {
            setOptions((prevOptions) => [...prevOptions, ...userOptionGroup]);
          }
        }
      }
    },
  );
  useEffect(() => {
    setOptions([]);
    refetchUsers();
  }, [value, refetchUsers]);

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />
          <Stack direction="row" width="100%" justifyItems="flex-end" alignItems="center">
            <Autocomplete
              sx={{
                maxWidth: 550,
              }}
              id="search-autocomplete"
              options={options}
              filterOptions={(x) => x}
              disableClearable
              freeSolo
              fullWidth
              size="small"
              onInputChange={(event, value) => {
                if (event?.type === "change") {
                  setValue(value);
                }
              }}
              groupBy={(option) => option.category}
              renderOption={(props, option: IOptions) => {
                return (
                  <Link href={option.link} underline="none">
                    <Box
                      {...props}
                      component="li"
                      sx={{
                        display: "flex",
                        padding: "10px",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            md: "14px",
                            lg: "16px",
                          },
                        }}
                      >
                        {option.label}
                      </Typography>
                    </Box>
                  </Link>
                );
              }}
              renderInput={(params) => {
                return (
                  <Box
                    position="relative"
                    sx={{
                      "& .MuiFormLabel-root": {
                        paddingRight: "24px",
                      },
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    <TextField
                      {...params}
                      label={"Search ...."}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <SearchOutlined />
                    </IconButton>
                  </Box>
                );
              }}
            />
          </Stack>
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {user?.username && (
              <Stack
                direction="row"
                gap="16px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.username && (
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "inline-block",
                      },
                    }}
                    variant="subtitle2"
                  >
                    {user?.username}
                  </Typography>
                )}
                {/*<Avatar src={user?.avatar} alt={user?.name} />*/}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
