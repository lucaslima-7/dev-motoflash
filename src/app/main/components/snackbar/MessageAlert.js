import React from 'react';
import clsx from 'clsx';
import { Snackbar, SnackbarContent, withStyles, IconButton, Slide } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green, yellow, red } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[300],
  },
  info: {
    backgroundColor: amber[300],
  },
  warning: {
    backgroundColor: yellow[300],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ContentWrapper = ({ classes, className, message, onClose, variant, ...other }) => {
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

const MessageAlert = ({ variant, message }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      TransitionComponent={<Slide direction="down" />}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <ContentWrapper
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  )
}

export default withStyles(styles)(MessageAlert)