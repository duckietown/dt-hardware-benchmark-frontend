import React from 'react';
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


const DropzoneAreaExample = props => {
  const { filetype, onUpload, ...rest } = props;
  return (
    <DropzoneArea
      onChange={onUpload}
      acceptedFiles={[filetype]}
      filesLimit={1}
      showFileNamesInPreview={true}
    />
  )
}

const UploadCard = props => {
  const { className, product, progress, ...rest } = props;

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
        <DropzoneAreaExample filetype={product.filetype} onUpload={product.onUpload} />
      </CardActions>

      <Divider />
      <LinearProgress variant="determinate" value={progress} />
    </Card >
  );
};

UploadCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default UploadCard;
