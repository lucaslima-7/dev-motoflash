import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Layout from 'app/main/components/layout/Layout';

const ConfigurationPage = ({ }) => {
  return (
    <Layout>
      <Grid container justify="center">
        <Grid item xs={12} className={"px-24 py-4"}>
          <Typography className={"text-left mt-8 font-700"} variant={"h4"}>Configurações</Typography>
        </Grid>
        <Grid item xs={12} className={"mb-24 mx-12"}>
          <Divider />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ConfigurationPage