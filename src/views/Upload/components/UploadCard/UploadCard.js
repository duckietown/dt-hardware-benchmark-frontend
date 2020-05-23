import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider
} from '@material-ui/core';

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


const DropzoneAreaExample = (filetype, onChange) => {
  
  return (
    <DropzoneArea
      onChange={onChange}
      acceptedFiles={[filetype.filetype]}
      filesLimit={1}
      showFileNamesInPreview={true}
    />
  )
}

const UploadCard = props => {
  const { className, product, ...rest } = props;

  const classes = useStyles();

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
          {product.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <DropzoneAreaExample filetype={product.filetype} onChange={product.onUpload}/>
      </CardActions>
    </Card>
  );
};

UploadCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default UploadCard;
