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
import NumberFormatCustom from 'app/main/components/inputs/NumberFormatCustom';

const NewCourierModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [courier, setCourier] = useState({
    fullName: "",
    email: ""
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
      // await new ApiCustomers().createCustomer(customer)
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
            Novo Motoboy
          </Typography>
        </DialogContentText>
        <Divider />
        <Grid container justify={"center"} className="mb-12">
          <Grid item xs={12}>
            <Typography variant={"h6"}>Dados Básicos</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
              onChange={e => setCourier({ ...courier, email: e.target.value })}
              margin="dense"
              variant="outlined"
              InputProps={{ maxLength: 200 }}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant={"h6"}>Detalhes do Equipamento</Typography>
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
              InputProps={{ maxLength: 200 }}
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
              InputProps={{ maxLength: 200 }}
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
              value={equipment.year}
              onChange={e => setEquipment({ ...equipment, year: e.target.value })}
              margin="dense"
              variant="outlined"
              InputProps={{ maxLength: 200 }}
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