import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Layout from 'app/main/components/layout/Layout';
import defaultTheme from 'app/config/themes/defaultTheme';
import withStyles from '@material-ui/core/styles/withStyles';
import NumberFormatCustom from 'app/main/components/inputs/numberInput/NumberFormatCustom';
import clsx from 'clsx';
import { firestore } from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  lineBetween: {
    '&:after': {
      top: "100%",
      display: "inline-block",
      overflow: "hidden",
      verticalAlign: "middle",
      marginLeft: 5,
      width: "20%",
      height: 1,
      content: '" "',
      border: `0.5px solid ${defaultTheme.palette.primary.main}`,
    }
  },
})

const ConfigurationPage = ({ classes }) => {
  const db = firestore()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [company, setCompany] = useState({
    acceptTime: 20000,
    courierCountPush: 5,
    priceMin: 5,
    pricePerKm: 4,
    pricePerWorkOrder: 1
  })

  useEffect(() => {
    const getCompanyInfo = async () => {
      setLoading(true)
      try {
        const companiesRef = db.collection('companies').doc("gGdovReizYh9fZSVUDUY")
        const snapshot = await companiesRef.get()
        setCompany({
          acceptTime: snapshot.data().acceptTime,
          courierCountPush: snapshot.data().courierCountPush,
          priceMin: snapshot.data().priceMin,
          pricePerKm: snapshot.data().pricePerKm,
          pricePerWorkOrder: snapshot.data().pricePerWorkOrder
        })
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getCompanyInfo()
  }, [db])

  const handleNumbers = event => {
    const formattedValue = event.target.value.replace(",", "")
    if (event.target.name === "priceMin") {
      setCompany({ ...company, priceMin: Number(formattedValue) })
    }

    if (event.target.name === "pricePerKm") {
      setCompany({ ...company, pricePerKm: Number(formattedValue) })
    }

    if (event.target.name === "pricePerWorkOrder") {
      setCompany({ ...company, pricePerWorkOrder: Number(formattedValue) })
    }
  }

  const updateCompanyDetails = () => {
    setLoading(true)
    if (company.acceptTime <= 0) {
      dispatch(Actions.showMessageDialog('warning', 'Tempo de aceitação inválido'))
      setLoading(false)
      return
    }

    if (company.courierCountPush <= 0) {
      dispatch(Actions.showMessageDialog('warning', 'Entregadores Notificados inválido'))
      setLoading(false)
      return
    }

    if (company.priceMin <= 0) {
      dispatch(Actions.showMessageDialog('warning', 'Preço por Minuto inválido'))
      setLoading(false)
      return
    }

    if (company.pricePerKm <= 0) {
      dispatch(Actions.showMessageDialog('warning', 'Preço por KM inválido'))
      setLoading(false)
      return
    }

    if (company.pricePerWorkOrder <= 0) {
      dispatch(Actions.showMessageDialog('warning', 'Preço por Corrida inválido'))
      setLoading(false)
      return
    }

    db.collection('companies').doc("gGdovReizYh9fZSVUDUY").update({ acceptTime: company.acceptTime })
    db.collection('companies').doc("gGdovReizYh9fZSVUDUY").update({ courierCountPush: company.courierCountPush })
    db.collection('companies').doc("gGdovReizYh9fZSVUDUY").update({ priceMin: company.priceMin })
    db.collection('companies').doc("gGdovReizYh9fZSVUDUY").update({ pricePerKm: company.pricePerKm })
    db.collection('companies').doc("gGdovReizYh9fZSVUDUY").update({ pricePerWorkOrder: company.pricePerWorkOrder })
    dispatch(Actions.showMessageDialog("success", "Dados Atualizados com sucesso"))
    setLoading(false)
  }

  return (
    <Layout>
      <Grid container justify="center" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Configurações</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid item xs={12} className="py-24 px-24">
          <Typography
            variant="caption"
            color={"primary"}
            className={clsx(classes.lineBetween, "font-900")}>
            Dados da Empresa Padrão
          </Typography>
        </Grid>
        <Grid item xs={12} className="px-24">
          <NumberFormatCustom
            fullWidth
            disabled={loading}
            thousandSeparator={","}
            decimalSeparator={"."}
            name="priceMin"
            label="Preço Mínimo R$"
            type="tel"
            fixedDecimalScale={true}
            decimalScale={2}
            defaultValue={5}
            value={company.priceMin}
            onBlur={e => handleNumbers(e)}
            style={{ maxWidth: 200 }}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className="mt-4 px-24">
          <NumberFormatCustom
            fullWidth
            disabled={loading}
            thousandSeparator={","}
            decimalSeparator={"."}
            name="pricePerKm"
            label="Preço Por KM R$"
            type="tel"
            fixedDecimalScale={true}
            decimalScale={2}
            defaultValue={4}
            value={company.pricePerKm}
            onBlur={e => handleNumbers(e)}
            style={{ maxWidth: 200 }}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className="mt-4 px-24">
          <NumberFormatCustom
            fullWidth
            disabled={loading}
            thousandSeparator={","}
            decimalSeparator={"."}
            name="pricePerWorkOrder"
            label="Preço Ganho R$"
            type="tel"
            fixedDecimalScale={true}
            decimalScale={2}
            defaultValue={1}
            value={company.pricePerWorkOrder}
            onBlur={e => handleNumbers(e)}
            style={{ maxWidth: 200 }}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className="mt-4 px-24">
          <NumberFormatCustom
            fullWidth
            disabled={loading}
            name="acceptTime"
            label="Tempo de Aceitação"
            type="tel"
            fixedDecimalScale={true}
            decimalScale={0}
            defaultValue={20}
            value={company.acceptTime / 1000}
            onBlur={e => setCompany({ ...company, acceptTime: e.target.value * 1000 })}
            style={{ maxWidth: 200 }}
            margin="dense"
            variant="outlined"
          />
          <Typography variant="caption" className={"float-left"}>
            * Este é o tempo que o entregador tem para aceitar uma corrida
          </Typography>
        </Grid>
        <Grid item xs={12} className="mt-4 px-24">
          <NumberFormatCustom
            fullWidth
            disabled={loading}
            name="courierCountPush"
            label="Entregadores Notificados"
            type="tel"
            fixedDecimalScale={true}
            decimalScale={0}
            defaultValue={5}
            value={company.courierCountPush}
            onBlur={e => setCompany({ ...company, courierCountPush: e.target.value })}
            style={{ maxWidth: 200 }}
            margin="dense"
            variant="outlined"
          />
          <Typography variant="caption" className={"float-left"}>
            * Este é o número de entregadores que receberão uma notificação em seus
            celulares
          </Typography>
        </Grid>
        <Grid item xs={12} className="my-20 text-right">
          <Button
            disabled={loading}
            onClick={() => updateCompanyDetails()}
            color="primary"
            variant="contained"
            className="capitalize shadow-none min-w-88"
          >
            {loading ? (
              <CircularProgress size={23} />
            ) : (<FontAwesomeIcon icon={faEdit} className="mr-12" />)}
            {loading ? "" : "Editar"}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withStyles(styles)(ConfigurationPage)