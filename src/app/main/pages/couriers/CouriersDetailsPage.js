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
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import ChipStatus from 'app/main/components/chipStatus/ChipStatus';
import { firestore } from 'firebase';
import { Paper, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { isNotBlank, isValidEmail } from "app/utils/ValidationUtil";
import ApiCourier from 'app/api/ApiCouriers';

const CouriersDetailsPage = ({ match: { params } }) => {
  const db = firestore()
  const dispatch = useDispatch()
  const [courier, setCourier] = useState({
    fullName: "",
    email: "",
    active: true
  })
  const [courierEquipment, setEquipment] = useState({
    brand: "-",
    model: "-",
    plate: "-",
    year: "-"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getCourierInfo = async () => {
      setLoading(true)
      try {
        const couriersRef = db.collection('couriers').doc(params.courierId)
        const snapshot = await couriersRef.get()
        console.log(snapshot.data())
        setCourier({
          fullName: snapshot.data().name,
          email: snapshot.data().email,
          active: snapshot.data().active
        })
        setEquipment({
          brand: snapshot.data().currentEquipment.brand,
          model: snapshot.data().currentEquipment.model,
          plate: snapshot.data().currentEquipment.plate,
          year: snapshot.data().currentEquipment.year
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getCourierInfo()
  }, [params.courierId, db])

  const validateFields = () => {
    if (isNotBlank(courier.fullName)) {
      if (isValidEmail(courier.email)) {
        editCourier()
      } else {
        dispatch(Actions.showMessageDialog('warning', 'Email inválido'))
      }
    } else {
      dispatch(Actions.showMessageDialog('warning', 'Nome inválido'))
    }
  }

  const editCourier = async () => {
    const options = {
      name: courier.fullName,
      email: courier.email
    }
    setLoading(true)
    try {
      await new ApiCourier().editUser({
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
    <Layout showBackButton={'/couriers'}>
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
                  value={courier.fullName}
                  onChange={e => setCourier({ ...courier, fullName: e.target.value })}
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
                  value={courier.email}
                  onChange={e => setCourier({ ...courier, email: e.target.value })}
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
                  <ChipStatus status={courier.active ? 'ATIVO' : 'INATIVO'} />
                </ListItem>
              </Grid>
              <Grid item xs={12} className={"mt-16 text-right"}>
                <Button
                  disabled={loading}
                  onClick={() => editCourier()}
                  variant="contained"
                  className="capitalize text-white bg-red-A400 hover:bg-red-700 mr-8"
                >
                  {loading ? (
                    <CircularProgress size={23} />
                  ) : (<FontAwesomeIcon icon={faTrashAlt} className="mr-12" />)}
                  {loading ? "" : "Deletar"}
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => editCourier()}
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
        <Grid item xs={12} md={6} lg={4} className="px-12">
          <Paper className="shadow-lighter p-20">
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">Veículo</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} className="my-12">
                <list>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Marca: </span>
                      {courierEquipment.brand}
                    </Typography>
                  </ListItem>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Modelo: </span>
                      {courierEquipment.model}
                    </Typography>
                  </ListItem>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Placa: </span>
                      {courierEquipment.plate}
                    </Typography>
                  </ListItem>
                  <ListItem className="px-4">
                    <Typography>
                      <span className="font-700">Ano: </span>
                      {courierEquipment.year}
                    </Typography>
                  </ListItem>
                </list>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default CouriersDetailsPage