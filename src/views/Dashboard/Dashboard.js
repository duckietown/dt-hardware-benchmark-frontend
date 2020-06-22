import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { OverallCard } from 'bm_components'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={6} sm={12} xl={6} xs={12}>
          <OverallCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
