import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';
import { session } from 'common/session';
import { api_url } from 'config';
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


const BenchmarkCard = (props) => {
  const { className, benchmark, ...rest } = props;
  const date = new Date(benchmark.last_modified);

  const classes = useStyles();

  

  const download = async () => {
    const res = await session.get('/hw_benchmark/files/' + benchmark.uuid);

    const blob = new Blob([res.data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, benchmark.uuid + '.json');
  };

  const open_image = () => {
    const url = `${api_url}hw_benchmark/files/${benchmark.uuid}.png`;
    window.open(url, '_blank');
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <BMCardContent overall={benchmark.body.overall}/>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
          style={{ marginTop: 10 }}>
          {benchmark.body.meta.bot_type}, {benchmark.body.meta.release},{' '}
          {benchmark.body.meta.target}
        </Typography>
        <Typography align="center" variant="body1">
          {benchmark.uuid}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container justify="space-between">
          <Grid className={classes.statsItem} item>
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              {date.toLocaleString('en-US')}
            </Typography>
          </Grid>
          <Grid className={classes.clickable} item onClick={open_image}>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Image
            </Typography>
          </Grid>
          <Grid className={classes.clickable} item onClick={download}>
            <GetAppIcon className={classes.statsIcon} />
            <Typography display="inline" variant="body2">
              Download
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

BenchmarkCard.propTypes = {
  className: PropTypes.string,
  benchmark: PropTypes.object.isRequired
};

export default BenchmarkCard;
