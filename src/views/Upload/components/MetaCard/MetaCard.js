import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider, 
  LinearProgress
} from '@material-ui/core';
import {session} from 'common/session'

const useStyles = makeStyles(theme => ({
  root: {},
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

const UploadCard = props => {
  const { className, onChange, ...rest } = props;

  const classes = useStyles();
  const [dropdowns, setDropdowns] = useState([])

  useEffect(() => {
    const retrieveDDs = async() => {
      
    }  
  }, [])
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          Meta
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          Enter the Meta data, can not be retrieved from the measurments
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
      </CardActions>
        {dropdowns.map(dd => )}
      <Divider />
    </Card >
  );
};

UploadCard.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default UploadCard;
