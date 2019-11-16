import React from 'react';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';
import NavbarLayout from './NavbarLayout';
import { useSelector } from 'react-redux';

const navbarWidth = 200;

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 4,
    [theme.breakpoints.up('lg')]: {
      width: navbarWidth,
      minWidth: navbarWidth
    }
  },
  wrapperFolded: {
    [theme.breakpoints.up('lg')]: {
      width: 64,
      minWidth: 64
    }
  },
  navbar: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: navbarWidth,
    minWidth: navbarWidth,
    height: '100%',
    background: "white",
    zIndex: 4,
    left: 0,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    }),
    boxShadow: theme.shadows[3]
  },
  folded: {
    position: 'absolute',
    width: 64,
    minWidth: 64,
    top: 0,
    bottom: 0
  },
  navbarContent: {
    flex: '1 1 auto',
    background: "white"
  },
});

const NavbarWrapperLayout = ({ classes }) => {
  const { navMenu } = useSelector(({ bk }) => bk);
  const folded = navMenu.folded;

  return (
    <div className={clsx(classes.wrapper, folded && classes.wrapperFolded)}>
      <div className={clsx(classes.navbar, folded && classes.folded)}>
        <NavbarLayout className={classes.navbarContent} />
      </div>
    </div>
  );
}

export default withStyles(styles)(NavbarWrapperLayout);