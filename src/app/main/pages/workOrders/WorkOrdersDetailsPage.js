import CancelWorkOrderDialog, { } from './CancelWorkOrderDialog';
import React, { useEffect, useState } from 'react';
import Layout from 'app/main/components/layout/Layout';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { firestore } from 'firebase';
import Paper from '@material-ui/core/Paper';
import { unixtimestampToDate } from 'app/utils/DateUtil';
import NumberUtil from 'app/utils/NumberUtil';
import ChipStatus from 'app/main/components/chipStatus/ChipStatus';
import { transformAddress } from 'app/utils/TransformUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner'
import defaultTheme from 'app/config/themes/defaultTheme';

const WorkOrdersDetailsPage = ({ match: { params } }) => {
  const db = firestore()
  const [workOrder, setWorkOrder] = useState({
    userId: "",
    createdDate: "",
    price: "",
    status: ""
  })
  const [courier, setCourier] = useState({})
  const [points, setPoints] = useState([])
  const [open, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getWorkOrderInfo = async () => {
      setLoading(true)
      try {
        const workOrdersRef = db.collection('workorders').doc(params.workOrderId)
        const snapshot = await workOrdersRef.get()
        setWorkOrder({
          userId: snapshot.data().userId,
          price: snapshot.data().quotation.price,
          createdDate: snapshot.data().createdDate,
          status: snapshot.data().status
        })
        setPoints(snapshot.data().points)
        setCourier(snapshot.data().courier ? snapshot.data().courier : {})
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getWorkOrderInfo()
  }, [params.workOrderId, db])

  return (
    <Layout showBackButton={'/workOrders'}>
      <Grid container justify="flex-start" className="px-24 py-12">
        <Grid item xs={12} className="px-24 mb-16">
          <Typography variant="h5" color="primary" className="font-900">Detalhes da Corrida</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid container justify="flex-start" className="px-24 pt-16">
          <Grid item xs={5}>
            <Paper className="shadow-lighter p-20">
              {loading ? (
                <Grid item xs={12} className="py-12">
                  <Loader
                    type="Puff"
                    color={defaultTheme.palette.primary.main}
                    height={70}
                    width={70} />
                </Grid>
              ) : (
                  <Grid container justify={"center"}>
                    <Grid item xs={12} className={"mt-8"}>
                      <Grid item className="my-12">
                        <ChipStatus status={workOrder.status} />
                      </Grid>
                      <list>
                        <ListItem className="px-4">
                          <Typography>
                            <span className="font-700">Valor: </span>
                            {NumberUtil.getDoubleAsCurrency(workOrder.price)}
                          </Typography>
                        </ListItem>
                        <ListItem className="px-4">
                          <Typography>
                            <span className="font-700">Data: </span>
                            {unixtimestampToDate(workOrder.createdDate.seconds * 1000)}
                          </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem className="px-4">
                          <Typography>
                            <span className="font-700">Atribuída Para: </span>
                            {courier.name ? courier.name : " - "}
                          </Typography>
                        </ListItem>
                        <ListItem className="justify-end px-4">
                          {workOrder.status === "PENDING" && (
                            <Button
                              size="small"
                              onClick={() => setModalOpen(true)}
                              variant="contained"
                              className="capitalize text-white text-red-900 bg-red-A100 hover:bg-red-A200 mr-8 shadow-none"
                            >
                              <FontAwesomeIcon icon={faTimes} className="mr-12" />
                              Cancelar
                            </Button>
                          )}
                        </ListItem>
                      </list>
                    </Grid>
                  </Grid>
                )}
            </Paper>
          </Grid>
          <Grid item xs={5} className="px-12">
            <Paper className="shadow-lighter p-20">
              <Grid container justify={"center"}>
                <Grid item xs={12}>
                  <Typography color="primary" variant="h6">Pontos</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                {loading ? (
                  <Grid item xs={12} className="py-12">
                    <Loader
                      type="Puff"
                      color={defaultTheme.palette.primary.main}
                      height={70}
                      width={70} />
                  </Grid>
                ) : points.length > 0 ? (
                  <>
                    <Grid item xs={12} className={"mt-8 p-4"}>
                      <Typography className="font-700">
                        Coleta:
                  </Typography>
                      <Typography>
                        <span className="font-700">Local: </span>
                        {transformAddress(points[0].address)}
                      </Typography>
                      <Grid item className="float-right my-12">
                        <ChipStatus status={points[0].status} />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} className={"mt-8 p-4"}>
                      <Typography className="font-700">
                        Entrega:
                    </Typography>
                      <Typography>
                        <span className="font-700">Local: </span>
                        {transformAddress(points[1].address)}
                      </Typography>
                      <Grid item className="float-right my-12">
                        <ChipStatus status={points[1].status} />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                      "Nenhum Ponto"
                    )}
              </Grid>
            </Paper>
          </Grid>
        </Grid >
      </Grid >
      <CancelWorkOrderDialog id={params.workOrderId} open={open} setOpen={setModalOpen} />
    </Layout >
  )
}

export default WorkOrdersDetailsPage