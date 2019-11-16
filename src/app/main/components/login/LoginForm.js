import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { logoutUser, registerWithFirebase, submitLoginWithFireBase } from 'app/api/ApiFirebase'

const LoginForm = ({ history }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Paper className={"rounded-8 shadow-lg p-10"}>
        {/* TODO BackOffice Logo */}
        <Grid item xs={12} className={"my-8"}>
          <Typography color="primary" variant="h4" className={"text-center font-700"}>
            Foodie Backoffice
          </Typography>
        </Grid>
        <Grid container justify="center">
          {step === 0 && (
            <>
              <Grid item xs={12} className={"my-8"}>
                <TextField
                  fullWidth
                  id="email-login"
                  label="Email"
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
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
              <Grid item xs={12} className={"my-12"}>
                <Link
                  className="float-right"
                  color="primary"
                  component="button"
                  variant="body1"
                  onClick={() => setStep(2)}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  disabled={loading}
                  color="primary"
                  className={"float-right"}
                  variant="contained"
                  onClick={() => submitLoginWithFireBase({ email: loginData.email, password: loginData.password })}>
                  {loading ? "Verifying..." : "Sign In"}
                </Button>
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
              <Grid item xs={12} className={"my-8"}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  value={signUpData.username}
                  onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} className={"my-8"}>
                <TextField
                  fullWidth
                  id="email-signup"
                  label="Email"
                  variant="outlined"
                  value={signUpData.email}
                  onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} className={"my-8"}>
                <TextField
                  fullWidth
                  id="password-signup"
                  margin={"dense"}
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password-confirm"
                  margin={"dense"}
                  label="Confirm Password"
                  variant="outlined"
                  type={'password'}
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} className={"mt-12"}>
                <Button
                  fullWidth
                  disabled={loading}
                  color="primary"
                  className={"float-right"}
                  variant="contained"
                  onClick={() => registerWithFirebase({ email: signUpData.email, password: signUpData.password })}>
                  {loading ? "Creating..." : "Sign Up"}
                </Button>
              </Grid>
            </>
          )}
          {step === 2 && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Enter your email so we can send you a password
                  recover link!
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
                  {loading ? "Loading..." : "Send Recover Link"}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper >
      {step !== 2 && (
        <Paper className={"rounded-8 shadow-lg p-16 mt-12"}>
          <Grid container justify="space-between" alignItems="center">
            {step === 0 && (
              <>
                <Grid item xs={6}>
                  <Typography>
                    New here?
                </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size={"small"}
                    color="primary"
                    className="float-right"
                    variant="contained"
                    onClick={() => setStep(1)}>
                    Request Access
                  <FontAwesomeIcon icon={faChevronRight} className={"ml-8"} />
                  </Button>
                </Grid>
              </>
            )}
            {step === 1 && (
              <>
                <Grid item xs={6}>
                  <Typography>
                    Do you have an account?
                </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    size={"small"}
                    color="primary"
                    className="float-right"
                    variant="contained"
                    onClick={() => setStep(0)}>
                    <FontAwesomeIcon icon={faChevronLeft} className={"mr-8"} />
                    Sign In
                </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      )}
    </>
  )
}

export default withRouter(LoginForm)