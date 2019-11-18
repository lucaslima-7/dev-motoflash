import React, { useState } from 'react';
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
import { couriersTableConfig } from './couriersTableConfig';
import clsx from "clsx"
import Layout from 'app/main/components/layout/Layout';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import firebaseService from "app/config/firebase/index";

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

const CouriersPage = ({ classes }) => {
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]

  const getCourierData = (query) => {
    return new Promise(async resolve => {
      const data = await firebaseService.getAllCouriers()
      resolve({
        data: data,
        page: query.page,
        totalCount: data.length
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
          <Typography className={"text-left mt-8 font-900"} variant={"h5"}>Motoristas</Typography>
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
            data={query => getCourierData(query)}
            config={couriersTableConfig}
            filterChips={filterChips}
          />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default withStyles(styles)(CouriersPage)