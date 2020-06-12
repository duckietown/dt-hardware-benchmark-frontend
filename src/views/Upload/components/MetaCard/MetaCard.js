import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { session } from 'common/session';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const UploadCard = (props) => {
  const { className, onChange, ...rest } = props;

  const classes = useStyles();
  const [meta, setMeta] = useState({});
  const [meta_selected, setMeta_selected] = useState({});

  useEffect(() => {
    const retrieveBMmeta = async () => {
      const res = await session.get('/hw_benchmark/meta');
      const sel = {};
      console.log(res.data);
      res.data.dropdowns.forEach((element) => {
        sel[element.key] = element.content[element.content.length - 1];
      });
      setMeta_selected(sel);
      setMeta(res.data);
    };
    retrieveBMmeta();
  }, []);

  const handleChange = (event, key) => {
    const meta_clone = JSON.parse(JSON.stringify(meta_selected));
    meta_clone[key] = event.target.value;
    setMeta_selected(meta_clone);
    onChange(meta_clone);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h4">
          Manual Meta
        </Typography>
        <Typography align="center" variant="body1">
          Enter the Meta data, can not be retrieved from the measurments
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        {meta && meta['dropdowns']
          ? meta.dropdowns.map((dd) => (
              <div key={dd.key}>
                <InputLabel id="demo-simple-select-label">{dd.name}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={meta_selected[dd.key]}
                  onChange={(evt) => handleChange(evt, dd.key)}>
                  {dd.content.map((elem) => (
                    <MenuItem value={elem}>{elem}</MenuItem>
                  ))}
                </Select>
              </div>
            ))
          : ''}
      </CardActions>
      <Divider />
    </Card>
  );
};

UploadCard.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default UploadCard;
