import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { UploadCard } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const upload = () => {
    console.log("uploading")
  }

  const handleChange = (files, key) => {
    console.log(files[0])
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>

        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UploadCard product={{ title: "Diagnostics", description: "JSON from Diagnostics Dashboard", filetype:".json", onUpload:(files)=>handleChange(files, 'diagnostics') }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UploadCard product={{ title: "Latencies", description: "ROS Bag from", filetype:".bag", onUpload:(files)=>handleChange(files, 'latencies') }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UploadCard product={{ title: "Meta", description: "JSON from bot", filetype:".json", onUpload:(files)=>handleChange(files, 'meta') }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <UploadCard product={{ title: "SD-Card", description: "JSON from bot", filetype:".json", onUpload:(files)=>handleChange(files, 'sd_card') }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Button variant="contained" color="primary" onClick={upload}>
              Upload
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UserList;
