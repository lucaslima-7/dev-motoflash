import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Layout from 'app/main/components/layout/Layout';

const ConfigurationPage = () => {
  return (
    <Layout>
      <Grid container justify="center" className="px-16 py-12">
        <Grid item xs={12} className="px-24">
          <Typography variant="h5" color="primary" className="font-900">Configurações</Typography>
          <Divider className="mb-12" />
        </Grid>
        <Grid item xs={12} className="py-24 px-12">

        </Grid>
      </Grid>
    </Layout>
  )
}

export default ConfigurationPage