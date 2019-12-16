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
import history from "@history";
import { firestore } from 'firebase';
import { Paper, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import ApiUsers from 'app/api/ApiUsers';
import { isNotBlank, isValidEmail } from "app/utils/ValidationUtil";
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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

  const setUserActive = async status => {
    setLoading(true)
    const msgVariant = status ? 'reativado' : 'deletado'
    try {
      await new ApiUsers().activeUser({ id: params.userId, status })
      dispatch(Actions.showMessageDialog('success', `Usuário ${msgVariant} com sucesso!`))
      history.push('/users')
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
          <Typography variant="h5" color="primary" className="font-900">Usuário</Typography>
          <Divider className="mb-12" />
        </Grid>
        {!user.active && (
          <Grid item xs={12} className="mx-8 md:mx-12 my-12" style={{ background: "#FF8A80", borderRadius: 5, borderColor: "#FF8A80" }}>
            <Typography variant="body1" className={"p-8"} style={{ color: "#B71C1C" }}>
              <FontAwesomeIcon icon={faTimesCircle} className={"mr-12"} />
              Este usuário está inativado - para editar seus dados é necessário reativá-lo
          </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={6} lg={4} className="px-12">
          <Paper className="shadow-lighter p-20">
            <Grid container justify={"center"}>
              <Grid item xs={12} className={"mt-8"}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Nome Completo"
                  disabled={loading || !user.active}
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
                  disabled={loading || !user.active}
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
                  <ChipStatus status={user.active ? 'ACTIVE' : 'INACTIVE'} />
                </ListItem>
              </Grid>
              <Grid item xs={12} className={"mt-16 text-right"}>
                {(user && user.active) ? (
                  <>
                    <Button
                      disabled={loading}
                      onClick={() => setUserActive(false)}
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
                  </>
                ) : (
                    <Button
                      disabled={loading}
                      onClick={() => setUserActive(true)}
                      variant="contained"
                      className="capitalize text-white bg-green-A400 hover:bg-green-700 mr-8 shadow-none"
                    >
                      {loading ? (
                        <CircularProgress size={23} />
                      ) : (<FontAwesomeIcon icon={faCheck} className="mr-12" />)}
                      {loading ? "" : "Ativar"}
                    </Button>
                  )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default UserDetailsPage