import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    return <DropzoneArea onChange={this.handleChange.bind(this)} />;
  }
}

const ProductCard = (props) => {
  const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Typography align="center" gutterBottom variant="h4">
          {product.title}
        </Typography>
        <Typography align="center" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <DropzoneAreaExample />
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
