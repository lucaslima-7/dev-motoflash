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
import { Paper, CircularProgress, Card } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const CouriersDetailsPage = ({ match: { params } }) => {
  const db = firestore()
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

  const editCourier = () => {
    console.log("funcionando")
  }

  return (
    <Layout showBackButton={'/couriers'}>
      <Grid container justify="flex-start">
        <Grid item xs={12} className={"px-24 py-4"}>
          <Typography className={"text-left mt-8 font-700"} variant={"h4"}>
            Detalhes do Motoboy
          </Typography>
        </Grid>
        <Grid item xs={12} className={"mb-24 mx-12"}>
          <Divider />
        </Grid>
        <Grid item xs={5} className="px-12">
          <Paper elevation={3} className="p-12">
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
                  inputProps={{ maxLength: 200 }}
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
                  inputProps={{ maxLength: 200 }}
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
                        checked={courier.active}
                        color={"primary"}
                        onClick={() => setCourier({ ...courier, active: true })}
                      />
                    }
                    label={"Ativo"}
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!courier.active}
                        color={"primary"}
                        onClick={() => setCourier({ ...courier, active: !courier.active })}
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
                  onClick={() => editCourier()}
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
                  onClick={() => editCourier()}
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
        <Grid item xs={5} className="px-12">
          <Paper elevation={3} className="p-16">
            <Grid container justify="center">
              <Grid item xs={12}>
                <Typography variant="h6">Detalhes da Moto</Typography>
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