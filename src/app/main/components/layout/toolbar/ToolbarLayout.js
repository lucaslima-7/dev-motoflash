import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import UserMenu from 'app/main/components/user-menu/UserMenu';

const ToolbarLayout = (props) => {
  return (
    <AppBar className="bg-white flex shadow-none relative z-10">
      <Toolbar className="self-end p-0 px-16">
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}

export default ToolbarLayout;