import React, { useState } from "react";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import NumberFormatCustom from 'app/main/components/inputs/numberInput/NumberFormatCustom';
import MaskedTextField from 'app/main/components/inputs/maskedInput/MaskedTextField';
import ApiCourier from "app/api/ApiCouriers";

const NewCourierModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [courier, setCourier] = useState({
    fullName: "",
    email: "",
    password: "motoflash123",
    haveCNH: false,
    cnhNumber: "",
    rg: "",
    mobilePhone: ""
  })
  const [equipment, setEquipment] = useState({
    brand: "",
    model: "",
    plate: "",
    year: ""
  })

  const addNewCourier = async () => {
    setLoading(true)
    const postObj = {
      ...courier,
      ...equipment
    }
    try {
      await new ApiCourier().addCourier(postObj)
      setOpen(false)
    } catch (error) {
      console.log("error")
    } finally {
      setLoading(false)
    }
  }

  const handleMobilePhone = value => {
    const formattedValue = value.replace(/\D/g, "")
    setCourier({ ...courier, mobilePhone: `+55${formattedValue}` })
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
            Novo Motoboy
          </Typography>
        </DialogContentText>
        <Divider />
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
                    checked={courier.haveCNH}
                    color={"primary"}
                    onClick={() => setCourier({ ...courier, haveCNH: true })}
                  />
                }
                label={"Moto"}
                labelPlacement="end"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!courier.haveCNH}
                    color={"primary"}
                    onClick={() => setCourier({ ...courier, haveCNH: !courier.haveCNH })}
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
            id="fullName"
            name="fullName"
            label="Nome Completo"
            disabled={loading}
            value={courier.fullName}
            onChange={e => setCourier({ ...courier, fullName: e.target.value })}
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
            label="Mobile Phone"
            disabled={loading}
            value={courier.mobilePhone}
            format={'(##) #####-####'}
            onBlur={e => handleMobilePhone(e.target.value)}
            margin="dense"
            variant="outlined"
          />
        </Grid>
        {courier.haveCNH ? (
          <Grid item xs={12} className={"mt-8"}>
            <NumberFormatCustom
              fullWidth
              id="cnhNumber"
              name="cnhNumber"
              label="Número da CNH"
              disabled={loading}
              value={courier.cnhNumber}
              format={'###########'}
              onBlur={e => setCourier({ ...courier, chnNumber: e.target.value })}
              margin="dense"
              variant="outlined"
            />
          </Grid>
        ) : (
            <Grid item xs={12} className={"mt-8"}>
              <MaskedTextField
                fullWidth
                id="rg"
                name="rg"
                label="RG"
                disabled={loading}
                value={courier.rg}
                mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /(\dxX)/]}
                onBlur={e => setCourier({ ...courier, rg: e.target.value })}
                margin="dense"
                variant="outlined"
              />
            </Grid>
          )}
        {courier.haveCNH && (
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography variant={"h6"}>Detalhes da Moto</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <TextField
                fullWidth
                id="brand"
                name="brand"
                label="Marca"
                disabled={loading}
                value={equipment.brand}
                onChange={e => setEquipment({ ...equipment, brand: e.target.value })}
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
                value={equipment.model}
                onChange={e => setEquipment({ ...equipment, model: e.target.value })}
                margin="dense"
                variant="outlined"
                InputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <NumberFormatCustom
                fullWidth
                id="plate"
                name="plate"
                label="Placa"
                value={equipment.plate}
                onChange={e => setEquipment({ ...equipment, plate: e.target.value })}
                margin="dense"
                variant="outlined"
                format={'   -####'}
              />
            </Grid>
            <Grid item xs={12} className={"mt-8"}>
              <TextField
                fullWidth
                id="year"
                name="year"
                label="Ano"
                disabled={loading}
                value={Number(equipment.year)}
                onChange={e => setEquipment({ ...equipment, year: Number(e.target.value) })}
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
          onClick={() => addNewCourier()}
          color="primary"
          variant="contained"
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewCourierModal