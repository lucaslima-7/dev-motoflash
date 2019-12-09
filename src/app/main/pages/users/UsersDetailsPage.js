import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from 'app/store/actions';
import Layout from 'app/main/components/layout/Layout';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChipStatus from 'app/main/components/chipStatus/ChipStatus';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { firestore } from 'firebase';
import { Paper, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import ApiUsers from 'app/api/ApiUsers';
import { isNotBlank, isValidEmail, isValidPassword } from "app/utils/ValidationUtil";
import { formatAuthError, formatApiError } from "app/utils/FirebaseErrors";

const UserDetailsPage = ({ match: { params } }) => {
  const db = firestore()
  const dispatch = useDispatch()
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

  const validateFields = () => {
    if (isNotBlank(user.fullName)) {
      if (isValidEmail(user.email)) {
        editUser()
      } else {
        dispatch(Actions.showMessageDialog('warning', 'Email inválido'))
      }
    } else {
      dispatch(Actions.showMessageDialog('warning', 'Nome inválido'))
    }
  }

  const editUser = async () => {
    const options = {
      name: user.fullName,
      email: user.email
    }
    setLoading(true)
    try {
      await new ApiUsers().editUser({
        options,
        id: params.userId
      })
      dispatch(Actions.showMessageDialog('success', 'Usuário editado com sucesso'))
    } catch (error) {
      console.log(error)
      dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro, tente novamente'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout showBackButton={'/users'}>
      <Grid container justify="flex-start" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Usuários</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid item xs={12} md={6} lg={4} className="px-12">
          <Paper className="shadow-lighter p-20">
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
                  <ChipStatus status={user.active ? 'ATIVO' : 'INATIVO'} />
                </ListItem>
              </Grid>
              <Grid item xs={12} className={"mt-16 text-right"}>
                <Button
                  disabled={loading}
                  onClick={() => editUser()}
                  variant="contained"
                  className="capitalize text-white bg-red-A400 hover:bg-red-700 mr-8 shadow-none"
                >
                  {loading ? (
                    <CircularProgress size={23} />
                  ) : (<FontAwesomeIcon icon={faTrashAlt} className="mr-12" />)}
                  {loading ? "" : "Deletar"}
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => validateFields()}
                  color="primary"
                  variant="contained"
                  className="capitalize shadow-none"
                >
                  {loading ? (
                    <CircularProgress size={23} />
                  ) : (<FontAwesomeIcon icon={faEdit} className="mr-12" />)}
                  {loading ? "" : "Editar"}
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