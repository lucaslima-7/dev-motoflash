import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Actions from "app/store/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import clsx from "clsx";
import ApiWorkOrder from "app/api/ApiWorkOrder";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { formatApiError } from "app/utils/FirebaseErrors";
import history from "@history";

const styles = () => ({
  dialog: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
})

const CancelWorkOrderDialog = ({ classes, open, setOpen, id }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const cancelWorkOrder = async () => {
    setLoading(true)
    try {
      await new ApiWorkOrder().cancelWorkOrder({
        id
      })
      dispatch(Actions.showMessageDialog('success', 'Corrida cancelada com sucesso!'))
      setOpen(false)
      history.push('/workOrders')
    } catch (error) {
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
          Cancelar Corrida
          </Typography>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid item xs={12} className={"p-0 py-20"}>
          <Typography variant="body1">Tem certeza que deseja cancelar esta corrida?</Typography>
          <Typography variant="caption" className={"font-900"}>
            <FontAwesomeIcon icon={faExclamationTriangle} color={"#FCBA03"} className={"mr-8"} />
            Essa opção não poderá ser desfeita!
            </Typography>
        </Grid>
        <Grid item xs={12} className={"my-16 text-right"}>
          <Button
            className="mr-4 capitalize"
            disabled={loading}
            variant="outlined"
            onClick={() => setOpen(false)} color="primary">
            Não
            </Button>
          <Button
            disabled={loading}
            onClick={() => cancelWorkOrder()}
            color="primary"
            variant="contained"
            className="capitalize"
          >
            {loading ? "Cancelando..." : "Sim"}
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(CancelWorkOrderDialog)