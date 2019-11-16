import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import UserMenu from 'app/main/components/user-menu/UserMenu';

const ToolbarLayout = (props) => {
  return (
    <AppBar className="flex shadow-none relative z-10" color="primary">
      <Toolbar className="self-end p-0 px-12">
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarLayout;