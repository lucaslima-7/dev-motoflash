import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import clsx from "clsx";
import { Grid, withStyles } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";

const styles = theme => ({
  mainBackground: {
    height: "100vh",
    background: "linear-gradient(to right, #ff3636, #ff5551, #ff6f6b, #ff8684, #ff9c9c);"
  }
})

const MainPage = ({ classes, history }) => {
  const { uid } = useSelector(({ bk }) => bk.user)

  useEffect(() => {
    if (!uid) {
      return
    }
    history.push('/users')
  }, [uid, history])


  return (
    <Grid container justify={"center"} className={clsx(classes.mainBackground, "py-40")}>
      <Grid item xs={10} sm={5} md={4} lg={3}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(withRouter(MainPage))