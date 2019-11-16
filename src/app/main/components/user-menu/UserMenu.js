import React, { useState } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { logoutUser } from 'app/api/ApiFirebase'

const UserMenu = (props) => {
  const { user } = useSelector(({ bk }) => bk);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <React.Fragment>
      <Button className="h-64 float-right" onClick={userMenuClick}>
        {user.profilePic ?
          (
            <Avatar className="" alt="user photo" src={user.profilePic} />
          )
          :
          (
            <Avatar className="">
              {user.displayName}
            </Avatar>
          )
        }

        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.displayName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.role.toString()}
          </Typography>
        </div>

        <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: "py-8"
        }}
      >
        <MenuItem
          onClick={() => {
            logoutUser()
            userMenuClose();
          }}
        >
          <ListItemIcon className="min-w-40">
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText className="pl-0" primary="Logout" />
        </MenuItem>
      </Popover>
    </React.Fragment>
  );
}

export default UserMenu;