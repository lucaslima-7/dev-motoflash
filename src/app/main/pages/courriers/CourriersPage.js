import React, { useState } from 'react';
import {
  Grid,
  withStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Paper,
  Button
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";
import TableCustom from 'app/main/components/table/TableCustom';
import { tableConfig } from '../../pages/users/tableConfig';
import Layout from "app/main/components/layout/Layout";

const styles = theme => ({
})

const CourriersPage = ({ classes }) => {
  const [selectedStatus, setSelectedStatus] = useState("")
  const newStatusList = ["AVAILABLE", "CANCELED"]

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
      <Grid container className="mt-24">
        <Paper className={"px-24 py-12 rounded-8"}>
          <Grid item xs={12}>
            <Typography className={"text-left mt-8 font-700"} variant={"h5"}>Usuários</Typography>
          </Grid>
          <Grid item xs={12} className={"mb-24"}>
            <Divider />
          </Grid>
          <TableCustom config={tableConfig} filterChips={filterChips} />
        </Paper>
      </Grid>
    </Layout>
  );
}

export default withStyles(styles)(CourriersPage)