import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "app/store/actions";
import { AppBar, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import Navigation from './Navigation';
import pageAccess from 'app/auth/AuthorizationRoles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const NavbarLayout = (props) => {
  const dispatch = useDispatch();
  const { navMenu } = useSelector(({ bk }) => bk);
  const folded = navMenu.folded;
  const menus = [
    {
      'id': 'main',
      'title': 'Main',
      'type': 'item',
      'url': '/main',
      auth: pageAccess.mainPage,
      'icon': 'people'
    },
    {
      'id': 'courriers',
      'title': 'Courriers',
      'type': 'item',
      'url': '/courriers',
      auth: pageAccess.courriers,
      'icon': 'menu'
    },
  ]

  return (
    <div className={clsx("flex flex-col overflow-hidden h-full", props.className)}>
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className="flex flex-row items-center flex-shrink h-64 min-h-64 pr-12"
      >
        <div className="flex flex-1 pr-8">
          {/* Motoflash Logo */}
        </div>
        <IconButton
          className={"w-40 h-40 p-0"}
          onClick={() => { dispatch(Actions.foldNavbar(true)) }}
          color="inherit"
        >
          <FontAwesomeIcon icon={folded ? faChevronRight : faChevronLeft} className="text-14" />
        </IconButton>
      </AppBar>
      <Navigation navigation={menus} />
    </div>
  );
}

export default NavbarLayout;