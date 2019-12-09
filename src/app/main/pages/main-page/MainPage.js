import React from 'react'
import clsx from "clsx";
import defaultTheme from 'app/config/themes/defaultTheme';
import { Grid, withStyles, Typography } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";

const styles = theme => ({
  mainBackground: {
    textAlign: 'center',
    backgroundColor: "#FFF",
    minHeight: '100vh',
    height: '100%'
  },
  formGradient: {
    textAlign: 'center',
    minHeight: '100vh',
    height: '100%',
    background: `linear-gradient(54deg, ${defaultTheme.palette.primary.light}  20%, ${defaultTheme.palette.primary.main} 85%);`
  },
  logo: {
    width: "100%",
    display: "block",
    paddingLeft: 32
  }
})

const MainPage = ({ classes, history }) => {
  return (
    <Grid container justify="center" alignItems="center" className={clsx("h-screen")}>
      <Grid item xs={12} sm={5} className={clsx(classes.formGradient, "px-36 flex items-center")}>
        <LoginForm />
      </Grid>
      <Grid item xs={12} sm={7} className={clsx(classes.mainBackground, "flex py-96")}>
        <Grid container justify="flex-start">
          <Grid item xs={12}>
            <Typography
              variant="h3"
              className="text-left px-60 font-700"
            >
              Painel de Controle
            </Typography>
            <Typography variant={"body1"} className="text-left px-60 mt-20">
              Este é o painel de controle Motoflash!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(MainPage)