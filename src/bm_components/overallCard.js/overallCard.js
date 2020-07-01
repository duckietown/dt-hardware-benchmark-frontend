import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { session } from 'common/session';
import { BMCardContent } from 'bm_components';

const useStyles = makeStyles((theme) => ({
  root: {},
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  clickable: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
}));


const OverallCard = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const [overall, setOverall] = useState(null)

  useEffect(() => {
    const retrieveBM = async () => {
      const res = await session.get('/hw_benchmark/score');
      console.log(res.data)
      setOverall(res.data)
    };
    retrieveBM();
  }, []);


  return (
    <Card {...rest} $
      className={
        clsx(classes.root, className)}>
      <CardContent>
        <BMCardContent overall={overall}/>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
          style={{ marginTop: 10 }}>
          Overall Average
        </Typography>
        <Typography align="center" variant="body1">
          only manually accepted are displayed
        </Typography>
      </CardContent>
    </Card>
  );
};

OverallCard.propTypes = {
  className: PropTypes.string
};

export default OverallCard;
