import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { UploadCard, MetaCard } from './components';
import files_config from './files_config';
import { session } from 'common/session';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const postFiles = async (data, meta) => {
  console.log(JSON.stringify(meta));
  data.append('meta', JSON.stringify(meta));

  const result = await session.post('/hw_benchmark/files', data);
  console.log(result);
};

const UserList = () => {
  const classes = useStyles();
  const [data, ] = useState(new FormData());
  const [progress, ] = useState({});
  const [meta, set_meta] = useState({});
  const [complete, ] = useState(true);

  const upload = () => {
    postFiles(data, meta);
  };
  /*useEffect(() => {
    let complete = true
    files_config.forEach(file => { complete = complete && files[file.key] != null })
    setComplete(complete)
  }, [files]) */

  const handleChange = (up, key) => {
    if (up[0]) {
      //getAsText(up[0], key)
      // updateFileState(key, up[0])
      data.append(key, up[0]);
    }
  };


  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={4}>
          {files_config.map((f, i) => (
            <Grid item lg={4} sm={6} xl={6} xs={12} key={i}>
              <UploadCard
                progress={progress[f.key] || 0}
                product={{
                  title: f.title,
                  description: f.description,
                  filetype: f.filetype,
                  onUpload: (files) => handleChange(files, f.key)
                }}
              />
            </Grid>
          ))}
          <Grid item lg={4} sm={6} xl={6} xs={12}>
            <MetaCard onChange={set_meta} />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={upload}
          disabled={!complete}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UserList;
