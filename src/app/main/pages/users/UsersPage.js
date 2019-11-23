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

let first = [null]
let last = [null]

const UsersPage = ({ classes }) => {
  const db = firestore()
  const refCustomTable = useRef()
  const page = refCustomTable.current && refCustomTable.current.state.data
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]
  const [lastNext, setLastUser] = useState(null)
  const [lastPrev, setFirstUser] = useState(null)
  const [countData, setCount] = useState(0)
  const [offset, setOffset] = useState(0)


  useEffect(() => {
    const getAllUsersCount = async () => {
      const usersCollection = db.collection("users")
      const snap = await usersCollection.get()
      setCount(snap.docs.map(doc => doc.data()).length)
    }

    getAllUsersCount()
    if (refCustomTable.current) {
      console.log("Estou zerando essa budega")
      refCustomTable.current.onQueryChange({ totalCount: countData })
    }
  }, [db, countData])

  const getAllUsers = ({ limit, type, page }) => {
    console.log("last", last)
    console.log("first", first)

    if (type === "prev") {
      return new Promise(async (resolve, reject) => {
        console.log("first", first[page].data().name)
        console.log("last", last[page].data().name)
        const countRef = db.collection("users").orderBy("createdDate").startAt(first[page]).limit(limit)
        const snapshot = await countRef.get()
        last[page] = snapshot.docs[snapshot.docs.length - 1]
        first[page] = snapshot.docs[0]
        const users = snapshot.docs
        resolve({ users })
      })
    }


    return new Promise(async (resolve, reject) => {
      let temp = null
      if (last[page - 1]) {
        temp = last[page - 1]
      }
      console.log("temp", page - 1, temp)
      const countRef = db.collection("users").orderBy("createdDate").startAfter(temp).limit(limit)
      const snapshot = await countRef.get()
      last[page] = snapshot.docs[snapshot.docs.length - 1]
      first[page] = snapshot.docs[0]
      const users = snapshot.docs
      resolve({ users })
    })
  }

  // const getAllUsers = ({ limit, page }) => {
  //   return new Promise(async (resolve, reject) => {
  //     console.log("startAt", page * limit)
  //     const countRef = db.collection("users").orderBy("idNumber").startAt(page * limit).limit(limit)
  //     const snapshot = await countRef.get()
  //     const users = snapshot.docs
  //     resolve({ users })
  //   })
  // }

  const userTeste = async query => {
    const { type, page } = await handleType(query)
    return getUserData(query, type, page)
  }

  const getUserData = (query, type, page) => {
    return new Promise(async resolve => {
      console.log("entrei aqui")
      const data = await getAllUsers({
        page,
        limit: query.pageSize,
        type
      })

      const users = data.users.map(doc => doc.data())
      console.log("users", users.map(it => it.name))

      resolve({
        data: users,
        page: query.page,
        totalCount: countData
      })
    })
  }

  const handleType = query => {
    return new Promise(resolve => {
      const newOffset = query.page * query.pageSize
      console.log("CurrentPage", query.page)
      console.log("New", newOffset)
      console.log("Offset", offset)
      let type = "next"
      if (newOffset > offset) {
        console.log("next handle")
      } else if (newOffset < offset) {
        console.log("prev handle")
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
            data={query => userTeste(query)}
            config={usersTableConfig}
            filterChips={filterChips}
            showDateFilter={false}
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