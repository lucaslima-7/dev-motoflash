import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ApiUsers from "app/api/ApiUsers";

const NewUserModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const addNewUser = async () => {
    setLoading(true)
    const options = {
      name: user.fullName,
      email: user.email,
      password: user.password
    }
    try {
      await new ApiUsers().addUser(options)
      setOpen(false)
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { margin: 0, maxWidth: 400 } }}>
      <DialogContent className={"p-10"}>
        <DialogContentText>
          <Typography
            variant="h6"
            color="primary"
            className={"uppercase font-700 text-left mb-8 mt-24 mx-24"}
          >
            Novo Cliente
          </Typography>
        </DialogContentText>
        <Divider />
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={() => setOpen(false)}
          color="primary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          disabled={loading}
          onClick={() => addNewUser()}
          color="primary"
          variant="contained"
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewUserModal