import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import ApiUsers from "app/api/ApiUsers";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import { isNotBlank, isValidEmail, isValidPassword } from "app/utils/ValidationUtil";
import { formatApiError } from "app/utils/FirebaseErrors";

const styles = () => ({
  dialog: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

const NewUserModal = ({ classes, open, setOpen }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validateFields = () => {
    if (user.password !== user.confirmPassword) {
      return dispatch(Actions.showMessageDialog('warning', 'As senhas não conferem!'))
    }

    if (isNotBlank(user.fullName)) {
      if (isValidEmail(user.email)) {
        if (isValidPassword(user.password)) {
          addNewUser()
        } else {
          dispatch(Actions.showMessageDialog('warning', 'Senha inválida'))
        }
      } else {
        dispatch(Actions.showMessageDialog('warning', 'Email inválido'))
      }
    } else {
      dispatch(Actions.showMessageDialog('warning', 'Nome inválido'))
    }
  }

  const addNewUser = async () => {
    setLoading(true)
    const options = {
      name: user.fullName,
      email: user.email,
      password: user.password
    }
    try {
      await new ApiUsers().addUser(options)
      dispatch(Actions.showMessageDialog('success', 'Usuário criado com sucesso!'))
      setOpen(false)
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', formatApiError(error.response.data)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { margin: 0, maxWidth: 400 } }}>
      <DialogTitle disableTypography className={clsx(classes.dialog)}>
        <Typography
          variant="h6"
          color="primary"
          className={"font-700 text-left mr-24"}
        >
          Novo Cliente
          </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container justify={"center"}>
          <Grid item xs={12} className={"mt-8"}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Nome Completo"
              disabled={loading}
              value={user.fullName}
              onChange={e => setUser({ ...user, fullName: e.target.value })}
              margin="dense"
              variant="outlined"
              InputProps={{ maxLength: 200 }}
            />
          </Grid>
          <Grid item xs={12} className={"mt-8"}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="E-mail"
              disabled={loading}
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              margin="dense"
              variant="outlined"
              InputProps={{ maxLength: 200 }}
            />
          </Grid>
          <Grid item xs={12} className={"mt-8"}>
            <TextField
              fullWidth
              id="password-signup"
              margin={"dense"}
              label="Senha"
              variant="outlined"
              type={'password'}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className={"mt-8"}>
            <TextField
              fullWidth
              id="password-confirm"
              margin={"dense"}
              label="Confirme a Senha"
              variant="outlined"
              type={'password'}
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} className={"mt-16 text-right"}>
            <Button
              disabled={loading}
              onClick={() => validateFields()}
              color="primary"
              variant="contained"
              className="capitalize"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(NewUserModal)