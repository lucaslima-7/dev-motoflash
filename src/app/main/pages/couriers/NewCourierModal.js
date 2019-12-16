import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NumberFormatCustom from 'app/main/components/inputs/numberInput/NumberFormatCustom';
import ApiCourier from "app/api/ApiCouriers";
import { formatApiError } from "app/utils/FirebaseErrors";
import withStyles from "@material-ui/core/styles/withStyles";
import MaskedTextField from "app/main/components/inputs/maskedInput/MaskedTextField";

const styles = () => ({
  dialog: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

const NewCourierModal = ({ classes, open, setOpen }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [courier, setCourier] = useState({
    name: "",
    email: "",
    password: "motoflash123",
    cnh: false,
    cnhNumber: "",
    mobilePhone: ""
  })
  const [currentEquipment, setcurrentEquipment] = useState({
    brand: "",
    model: "",
    plate: "",
    year: new Date().getFullYear()
  })

  const addNewCourier = async () => {
    setLoading(true)
    const postObj = {
      ...courier,
      ...currentEquipment
    }
    try {
      await new ApiCourier().addCourier(postObj)
      dispatch(Actions.showMessageDialog('success', 'Usuário criado com sucesso!'))
      setOpen(false)
    } catch (error) {
      console.log(error)
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
          Novo Entregador
          </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent className={"p-10"}>
        <Grid container justify={"center"} className="mb-12">
          <Grid item xs={12} className={"mt-8"}>
            <ListItem className={clsx('list-item px-0 pt-4')}>
              <ListItemText
                className="ml-4"
                primary={"Veículo"}
                classes={{ primary: 'text-14 font-700 list-item-text-primary' }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={courier.cnh}
                    color={"primary"}
                    onClick={() => setCourier({ ...courier, cnh: true })}
                  />
                }
                label={"Moto"}
                labelPlacement="end"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!courier.cnh}
                    color={"primary"}
                    onClick={() => setCourier({ ...courier, cnh: !courier.cnh })}
                  />
                }
                label={"Bicicleta"}
                labelPlacement="end"
              />
            </ListItem>
          </Grid>
        </Grid>
        <Grid item xs={12} className={"mt-8"}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nome Completo"
            disabled={loading}
            value={courier.name}
            onChange={e => setCourier({ ...courier, name: e.target.value })}
            margin="dense"
            variant="outlined"
            InputProps={{ maxLength: 100 }}
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
            InputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12} className={"mt-8"}>
          <NumberFormatCustom
            fullWidth
            id="mobilePhone"
            name="mobilePhone"
            label="Celular"
            disabled={loading}
            value={courier.mobilePhone}
            format={'(##) #####-####'}
            onBlur={e => setCourier({ ...courier, mobilePhone: e.target.value })}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        {courier.cnh && (
          <Grid item xs={12} className={"mt-8"}>
            <NumberFormatCustom
              fullWidth
              id="cnhNumber"
              name="cnhNumber"
              label="Número da CNH"
              disabled={loading}
              value={courier.cnhNumber}
              format={'###########'}
              onBlur={e => setCourier({ ...courier, cnhNumber: e.target.value })}
              margin="dense"
              variant="outlined"
            />
          </Grid>
        )}
        {courier.cnh && (
          <Grid container justify="center" className={"mt-16"}>
            <Grid item xs={12}>
              <Typography variant={"h6"} color="primary">Detalhes da Moto</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className="mb-16" />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <TextField
                fullWidth
                id="brand"
                name="brand"
                label="Marca"
                disabled={loading}
                value={currentEquipment.brand}
                onChange={e => setcurrentEquipment({ ...currentEquipment, brand: e.target.value })}
                margin="dense"
                variant="outlined"
                InputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <TextField
                fullWidth
                id="model"
                name="model"
                label="Modelo"
                disabled={loading}
                value={currentEquipment.model}
                onChange={e => setcurrentEquipment({ ...currentEquipment, model: e.target.value })}
                margin="dense"
                variant="outlined"
                InputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <MaskedTextField
                fullWidth
                id="plate"
                name="plate"
                label="Placa"
                disabled={loading}
                value={currentEquipment.plate}
                mask={[/[a-zA-Z]/, /[a-zA-Z]/, /[a-zA-Z]/, '-', /\d/, /\d/, /\d/, /\d/]}
                onBlur={e => setcurrentEquipment({ ...currentEquipment, plate: e.target.value })}
                margin="dense"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <TextField
                fullWidth
                id="year"
                name="year"
                label="Ano"
                disabled={loading}
                value={Number(currentEquipment.year)}
                onChange={e => setcurrentEquipment({ ...currentEquipment, year: Number(e.target.value) })}
                margin="dense"
                variant="outlined"
                InputProps={{ maxLength: 4 }}
              />
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} className={"mt-8"}>
          <Typography variant="caption" className={"text-right"}>
            * Os motoboys são criados com a senha motoflash123.
            Solicite que eles mudem a senha direto pelo aplicativo.
          </Typography>
        </Grid>
        <Grid item xs={12} className={"mt-16 text-right"}>
          <Button
            disabled={loading}
            onClick={() => addNewCourier()}
            color="primary"
            variant="contained"
            className={"capitalize"}
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(NewCourierModal)