import React, { useEffect, useState } from 'react';
import Layout from 'app/main/components/layout/Layout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { firestore } from 'firebase';
import { Paper, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const UserDetailsPage = ({ match: { params } }) => {
  const db = firestore()
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    active: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true)
      try {
        const usersRef = db.collection('users').doc(params.userId)
        const snapshot = await usersRef.get()
        setUser({
          fullName: snapshot.data().name,
          email: snapshot.data().email,
          active: snapshot.data().active
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getUserInfo()
  }, [params.userId, db])

  const editUser = () => {
    console.log("funcionando")
  }

  return (
    <Layout showBackButton={'/users'}>
      <Grid container justify="flex-start">
        <Grid item xs={12} className={"px-24 py-4"}>
          <Typography className={"text-left mt-8 font-700"} variant={"h4"}>
            Detalhes do Usuário
          </Typography>
        </Grid>
        <Grid item xs={12} className={"mb-24 mx-12"}>
          <Divider />
        </Grid>
        <Grid item xs={5} className="px-12">
          <Paper className="p-12">
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
                <ListItem className={clsx('list-item px-0 pt-4')}>
                  <ListItemText
                    className="ml-4"
                    primary={"Status"}
                    classes={{ primary: 'text-14 font-700 list-item-text-primary' }} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.active}
                        color={"primary"}
                        onClick={() => setUser({ ...user, active: true })}
                      />
                    }
                    label={"Ativo"}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!user.active}
                        color={"primary"}
                        onClick={() => setUser({ ...user, active: !user.active })}
                      />
                    }
                    label={"Inativo"}
                    labelPlacement="end"
                  />
                </ListItem>
              </Grid>
              <Grid item xs={12} className={"mt-16"}>
                <Button
                  disabled={loading}
                  onClick={() => editUser()}
                  variant="contained"
                  className="bg-red-A400 hover:bg-red-700 float-left shadow-none"
                >
                  {loading ? (
                    <CircularProgress size={23} className="mr-12" />
                  ) : (<FontAwesomeIcon icon={faTrashAlt} className="mr-12" />)}
                  {loading ? "Carregando..." : "Deletar"}
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => editUser()}
                  color="primary"
                  variant="contained"
                  className="float-right shadow-none"
                >
                  {loading ? (
                    <CircularProgress size={23} className="mr-12" />
                  ) : (<FontAwesomeIcon icon={faEdit} className="mr-12" />)}
                  {loading ? "Carregando..." : "Editar"}
                </Button>
              </Grid>
            </Grid>

          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default UserDetailsPage