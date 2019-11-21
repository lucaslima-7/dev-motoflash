import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Card,
  Button,
  CardContent
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import TableCustom from 'app/main/components/table/TableCustom';
import { usersTableConfig } from './usersTableConfig';
import clsx from "clsx"
import Layout from 'app/main/components/layout/Layout';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faUserCheck, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import firebaseService from "app/config/firebase/index";
import { firestore } from 'firebase';

const styles = theme => ({
  panelOppened: {
    paddingBottom: 8,
    paddingTop: 0
  },
  panel: {
    boxShadow: "none",
    border: "1px solid lightgrey",
  }
})

const UsersPage = ({ classes }) => {
  const db = firestore()
  const refCustomTable = useRef()
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]
  const [lastNext, setLastUser] = useState(null)
  const [lastPrev, setFirstUser] = useState(null)
  const [countData, setCount] = useState(0)
  const [type, setType] = useState("next")

  useEffect(() => {
    const getAllUsersCount = async () => {
      const usersCollection = db.collection("users")
      const snap = await usersCollection.get()
      setCount(snap.docs.map(doc => doc.data()).length)
    }

    getAllUsersCount()
    if (refCustomTable.current) {
      refCustomTable.current.onQueryChange({ page: 0, totalCount: countData })
    }
  }, [db, countData])

  const getAllUsers = ({ limit, type }) => {
    console.log(type)
    if (type === "prev") {
      console.log(lastPrev && lastPrev.data())
      return new Promise(async (resolve, reject) => {
        const countRef = db.collection("users").orderBy("createdDate").endAt(lastPrev).limit(limit)
        const snapshot = await countRef.get()
        setLastUser(snapshot.docs[snapshot.docs.length - 1])
        setFirstUser(snapshot.docs[0])
        const users = snapshot.docs
        resolve({ users })
      })
    }

    return new Promise(async (resolve, reject) => {
      console.log(lastPrev && lastPrev.data())
      const countRef = db.collection("users").orderBy("createdDate").startAfter(lastNext).limit(limit)
      const snapshot = await countRef.get()
      setLastUser(snapshot.docs[snapshot.docs.length - 1])
      setFirstUser(snapshot.docs[0])
      const users = snapshot.docs
      resolve({ users })
    })
  }

  const getUserData = (query) => {
    console.log(query)
    return new Promise(async resolve => {
      const data = await getAllUsers({
        limit: query.pageSize,
        type
      })
      if (countData && (query.page + 1) * query.pageSize > countData) {
        setType("prev")
        setFirstUser(data.users[0])
      }
      resolve({
        data: data.users.map(doc => doc.data()),
        page: query.page,
        totalCount: countData
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
      <Grid container justify="center">
        <Grid item xs={12} className={"px-24 py-4"}>
          <Typography className={"text-left mt-8 font-700"} variant={"h4"}>Usuários</Typography>
        </Grid>
        <Grid item xs={12} className={"mb-24 mx-12"}>
          <Divider />
        </Grid>
        <Grid item xs={10} className="pl-12">
          <Grid item xs={12} className="mb-12">
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
          </Grid>
          <TableCustom
            forwardedRef={refCustomTable}
            data={query => getUserData(query)}
            config={usersTableConfig}
            filterChips={filterChips}
            showDateFilter={false}
            onChangeRowsPerPage={() => setLastUser(null)}
          />
        </Grid>
        <Grid item xs={2} className="px-12">
          <Card className={clsx("bg-green-100 text-right", classes.panel)}>
            <CardContent>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={3}>
                  <FontAwesomeIcon icon={faUserCheck} className="text-28" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">Ativos</Typography>
                  <Typography variant="h6">292</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={clsx("bg-red-100 mt-12 text-right", classes.panel)}>
            <CardContent>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={3}>
                  <FontAwesomeIcon icon={faUserTimes} className="text-28" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">Inativos</Typography>
                  <Typography variant="h6">271</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withStyles(styles)(UsersPage)