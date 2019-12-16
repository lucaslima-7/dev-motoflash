import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Link,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography
} from "@material-ui/core";
import { isValidEmail, isValidPassword } from "app/utils/ValidationUtil";
import { formatAuthError } from "app/utils/FirebaseErrors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { auth } from 'firebase';

const LoginForm = ({ history }) => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = ({ email, password }) => {
    if (isValidEmail(email)) {
      if (isValidPassword(password)) {
        submitLoginWithFireBase({ email, password })
      } else {
        dispatch(Actions.showMessageDialog('warning', 'Senha inválida'))
      }
    } else {
      dispatch(Actions.showMessageDialog('warning', 'Email inválido'))
    }
  }

  const submitLoginWithFireBase = async ({ email, password }) => {
    setLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', formatAuthError(error)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid container justify="center" alignContent="center">
      <Grid item xs={7}>
        <Paper className={"rounded-1 p-24 shadow-lighter"}>
          <div className={"max-w-128"}>
            <img src={"/assets/images/logos/MOTOFLASH_5.svg"} alt="Logo" />
          </div>
          <Grid container justify="center">
            {step === 0 && (
              <>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="email-login"
                    label="E-mail"
                    variant="outlined"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password-login"
                    margin={"dense"}
                    label="Senha"
                    variant="outlined"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    onKeyDown={(e) => e.keyCode === 13 ? handleSubmit({ email: loginData.email, password: loginData.password }) : null}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FontAwesomeIcon icon={faEye} className="text-14" />
                          ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="text-14" />
                            )}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} className={"my-24"}>
                  <Link
                    className="float-right font-700"
                    color="primary"
                    component="button"
                    variant="body1"
                    onClick={() => setStep(0)}
                  >
                    Esqueceu a Senha?
                </Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    disabled={loading}
                    color="primary"
                    className={"float-right capitalize shadow-none"}
                    variant="contained"
                    onClick={() => handleSubmit({ email: loginData.email, password: loginData.password })}>
                    {loading ? "Verificando..." : "Login"}
                  </Button>
                </Grid>
              </>
            )}
            {step === 2 && (
              <>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Coloque seu email e clique em recuperar senha
                    para que possamos enviar um email com as instruções!
                </Typography>
                </Grid>
                <Grid item xs={12} className={"my-8"}>
                  <TextField
                    fullWidth
                    id="email-signup"
                    label="Email"
                    variant="outlined"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} className={"mt-12"}>
                  <Button
                    fullWidth
                    disabled={loading}
                    color="primary"
                    className={"float-right"}
                    variant="contained"
                    onClick={() => console.log("Clicado")}>
                    {loading ? "Enviando..." : "Recuperar Senha"}
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper >
      </Grid>
    </Grid>
  )
}

export default withRouter(LoginForm)