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
import history from "@history";
import ChipStatus from 'app/main/components/chipStatus/ChipStatus';
import { firestore } from 'firebase';
import { Paper, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { isNotBlank, isValidEmail } from "app/utils/ValidationUtil";
import ApiCourier from 'app/api/ApiCouriers';
import NumberFormatCustom from 'app/main/components/inputs/numberInput/NumberFormatCustom';

const CouriersDetailsPage = ({ match: { params } }) => {
  const db = firestore()
  const dispatch = useDispatch()
  const [courier, setCourier] = useState({
    fullName: "",
    email: "",
    mobilePhone: "",
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
          mobilePhone: snapshot.data().mobilePhone.substring(3),
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
      email: courier.email,
      mobilePhone: `+55${courier.mobilePhone}`,
      profilePhoto: "https://google.com.br",
      active: true
    }
    setLoading(true)
    try {
      await new ApiCourier().editCourier({
        options,
        id: params.courierId
      })
      dispatch(Actions.showMessageDialog('success', 'Entregador editado com sucesso'))
      history.push('/couriers')
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro, tente novamente'))
    } finally {
      setLoading(false)
    }
  }

  const setCourierActive = async status => {
    setLoading(true)
    const msgVariant = status ? 'reativado' : 'deletado'
    try {
      await new ApiCourier().activeCourier({ id: params.courierId, status })
      dispatch(Actions.showMessageDialog('success', `Entregador ${msgVariant} com sucesso!`))
      history.push('/couriers')
    } catch (error) {
      dispatch(Actions.showMessageDialog('error', 'Ocorreu um erro, tente novamente'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout showBackButton={'/couriers'}>
      <Grid container justify="flex-start" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Entregador</Typography>
          <Divider className="mb-12" />
        </Grid>
        {!courier.active && (
          <Grid item xs={12} className="mx-8 md:mx-12 my-12" style={{ background: "#FF8A80", borderRadius: 5, borderColor: "#FF8A80" }}>
            <Typography variant="body1" className={"p-8"} style={{ color: "#B71C1C" }}>
              <FontAwesomeIcon icon={faTimesCircle} className={"mr-12"} />
              Este entregador está inativado - para editar seus dados é necessário reativá-lo
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
                  disabled={loading || !courier.active}
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
                  disabled={loading || !courier.active}
                  value={courier.email}
                  onChange={e => setCourier({ ...courier, email: e.target.value })}
                  margin="dense"
                  variant="outlined"
                  InputProps={{ maxLength: 200 }}
                />
              </Grid>
              <Grid item xs={12} className={"mt-8"}>
                <NumberFormatCustom
                  fullWidth
                  disabled={loading || !courier.active}
                  id="mobilePhone"
                  name="mobilePhone"
                  label="Mobile Phone"
                  value={courier.mobilePhone}
                  format={'(##) #####-####'}
                  onBlur={e => setCourier({ ...courier, mobilePhone: e.target.value.replace(/\D+/g, '') })}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} className={"mt-8"}>
                <ListItem className={clsx('list-item px-0 pt-4')}>
                  <ListItemText
                    className="ml-4"
                    primary={"Status"}
                    classes={{ primary: 'text-14 font-700 list-item-text-primary' }} />
                  <ChipStatus status={courier.active ? 'ACTIVE' : 'INACTIVE'} />
                </ListItem>
              </Grid>
              <Grid item xs={12} className={"mt-16 text-right"}>
                {(courier && courier.active) ? (
                  <>
                    <Button
                      disabled={loading}
                      onClick={() => setCourierActive(false)}
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
                      onClick={() => setCourierActive(true)}
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