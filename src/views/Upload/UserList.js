import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { UploadCard } from './components';
import files_config from './files_config'

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
  const [files, set_files] = useState({})
  const [progress, set_progress] = useState({})
  const [complete, setComplete] = useState(false)

  const upload = () => {
    console.log("uploading")
  }

  useEffect(()=> {
    let complete = true
    files_config.forEach(file => {complete = complete && files[file.key] != null })
    setComplete(complete)
  }, [files])

  const updateProgressState = (key, value) => {
    const progress_clone = JSON.parse(JSON.stringify(progress))
    progress_clone[key] = value
    set_progress(progress_clone)
  }

  const updateFileState = (key, value) => {
    const files_clone = JSON.parse(JSON.stringify(files))
    files_clone[key] = value
    set_files(files_clone)
  }

  const handleChange = (up, key) => {
    if (up[0]) {
      getAsText(up[0], key)
    }
  }

  const getAsText = (readFile, key) => {

    var reader = new FileReader();
    reader.readAsText(readFile, "base64");

    reader.onprogress = evt => updateProgress(evt, key);
    reader.onload = evt => loaded(evt, key);
    reader.onerror = errorHandler;
  }

  const updateProgress = (evt, key) => {
    if (evt.lengthComputable) {
      var loaded = (evt.loaded / evt.total);
      if (loaded < 1) {
        console.log(loaded)
        updateProgressState(key, loaded*100)
      }
    }
  }

  const loaded = (evt, key) => {
    var fileString = evt.target.result;
    // Do testing here
    updateProgressState(key, 100)
    updateFileState(key, fileString)
  }

  const errorHandler = (evt) => {
    if (evt.target.error.name == "NotReadableError") {
      console.error("file not readable")
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>

        <Grid
          container
          spacing={4}
        >

          {files_config.map((f, i) => <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
            key={i}
          >
            <UploadCard progress={progress[f.key] || 0} product={{ title: f.title, description: f.description, filetype: f.filetype, onUpload: (files) => handleChange(files, f.key) }} />
          </Grid>)}
          <Button variant="contained" color="primary" onClick={upload} disabled={!complete}>
            Upload  
          </Button>
        </Grid>
      </div>
    </div>
  );
};

export default UserList;
