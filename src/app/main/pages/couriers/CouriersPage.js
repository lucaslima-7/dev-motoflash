import React, { useState, useRef } from 'react';
import {
  Grid,
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Button,
  Card,
  CardContent
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import TableCustom from 'app/main/components/table/TableCustom';
import { couriersTableConfig } from './couriersTableConfig';
import Layout from 'app/main/components/layout/Layout';
import { firestore } from 'firebase';
import clsx from 'clsx';
import defaultTheme from 'app/config/themes/defaultTheme';
import NewCourierModal from './NewCourierModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const styles = theme => ({
  panelOppened: {
    paddingBottom: 8,
    paddingTop: 0
  },
  panel: {
    boxShadow: "none",
    border: "1px solid lightgrey",
  },
  bgDetails: {
    background: defaultTheme.palette.primary.light
  }
})

let first = [null]
let last = [null]
let count = 0

const CouriersPage = ({ classes, history }) => {
  const db = firestore()
  const refCustomTable = useRef()
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]
  const [offset, setOffset] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const couriersQuery = async query => {
    const { type, page } = await handleType(query)
    return getCouriersData(query, type, page)
  }

  const getAllCouriers = ({ limit, type, page }) => {
    if (type === "prev") {
      return new Promise(async (resolve, reject) => {
        const countRef = db.collection("couriers").orderBy("createdDate").startAt(first[page]).limit(limit)
        const snapshot = await countRef.get()
        last[page] = snapshot.docs[snapshot.docs.length - 1]
        first[page] = snapshot.docs[0]
        const couriers = snapshot.docs
        const count = snapshot.count
        resolve({ couriers, count })
      })
    }


    return new Promise(async (resolve, reject) => {
      let temp = null
      if (last[page - 1]) {
        temp = last[page - 1]
      }
      const countRef = db.collection("couriers").orderBy("createdDate").startAfter(temp).limit(limit)
      const snapshot = await countRef.get()
      last[page] = snapshot.docs[snapshot.docs.length - 1]
      first[page] = snapshot.docs[0]
      const couriers = snapshot.docs
      const count = snapshot.count
      resolve({ couriers, count })
    })
  }

  const getCouriersData = async (query, type, page) => {
    if (!count) {
      await getAllCouriersCount()
    }
    return new Promise(async resolve => {
      const data = await getAllCouriers({
        page,
        limit: query.pageSize,
        type
      })
      const couriers = data.couriers.map(doc => doc.data())
      resolve({
        data: couriers,
        page: query.page,
        totalCount: count
      })
    })
  }

  const getAllCouriersCount = async () => {
    const couriersCollection = db.collection("metadatas").doc("couriers")
    const snap = await couriersCollection.get()
    count = snap.data().count
  }

  const handleType = query => {
    return new Promise(resolve => {
      const newOffset = query.page * query.pageSize
      let type = "next"
      if (newOffset < offset) {
        type = "prev"
      }
      setOffset(newOffset)
      resolve({
        type,
        page: query.page
      })
    })
  }

  const filterChips = (
    <>
      <FormGroup row className={"items-center"}>
        <Typography color="primary" variant="body1" className={"mr-12 uppercase font-900"}>Status: </Typography>
        {newStatusList.map(item => {
          return (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    checked={item.name === selectedStatus}
                    color="primary"
                    onClick={() => item.name === selectedStatus ? null : setSelectedStatus(item.name)}
                  />
                }
                label={<Typography variant={"caption"} className={"font-700"}>{`${item.name}(${item.count})`}</Typography>}
              />
            </>
          )
        })}
      </FormGroup>
      <Button
        variant="contained"
        size="small"
        color="primary"
        className="float-right"
        onClick={() => console.log("Function to reset Filters")}>
        Clear Filters
      </Button>
    </>
  )

  return (
    <Layout>
      <Grid container justify="center" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Entregadores</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid item xs={12} className="px-12">
          {/* <Grid item xs={12} className="mb-12">
          {filterChips && (
            <ExpansionPanel className={classes.panel}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={"italic"}><FontAwesomeIcon icon={faFilter} /> Demais Filtros</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelOppened}>
                <Grid item xs={12} className={"float-left"}>
                  {filterChips}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )}
        </Grid> */}
          <TableCustom
            actions={[
              {
                icon: () => <FontAwesomeIcon icon={faPlusCircle} />,
                tooltip: "Adicionar",
                isFreeAction: true,
                onClick: () => setModalOpen(true)
              },
            ]}
            forwardedRef={refCustomTable}
            data={query => couriersQuery(query)}
            config={couriersTableConfig}
            filterChips={filterChips}
            showDateFilter={false}
          />
        </Grid>
        <NewCourierModal open={modalOpen} setOpen={setModalOpen} />
      </Grid>
    </Layout >
  );
}

export default withStyles(styles)(CouriersPage)