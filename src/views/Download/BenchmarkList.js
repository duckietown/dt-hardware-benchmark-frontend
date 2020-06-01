import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { session } from 'common/session'

import { ProductsToolbar, BenchmarkCard } from './components';
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [benchmarks, setBenchmarks] = useState([]);
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const retrieveBM = async (page) => {
      const res = await session.get('/hw_benchmark/files')
      setBenchmarks(res.data.data)
      setMaxPage(res.data.meta.last_page)
      setTotal(res.data.meta.total)
    }
    retrieveBM(page)
  }, [page])

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {benchmarks.map(bm => (
            <Grid
              item
              key={bm.uuid}
              lg={4}
              md={6}
              xs={12}
            >
              <BenchmarkCard benchmark={bm} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
          <Typography variant="caption">1-{page*25+benchmarks.length} of {total}</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductList;
