import React from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Typography,
  Grid,
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
  root: {},
  imageContainer: {
    //height: 64,
    display: 'flex',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  graph: {
    width: 100,
    height: 50,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    borderRadius: '5px'
  },
  image: {
    width: '100%'
  },
}));

function rgb(r, g, b) {
  return { red: r, green: g, blue: b };
}
  
function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {
  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + diffRed * fade), 10),
    green: parseInt(Math.floor(color1.green + diffGreen * fade), 10),
    blue: parseInt(Math.floor(color1.blue + diffBlue * fade), 10)
  };

  return (
    'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')'
  );
}
  

const BM_Doughnut = ({overall, ...props}) => {

  const classes = useStyles();
  const theme = useTheme();

  const data = (score, color, text) => ({
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [color, theme.palette.ligth_grey],
        borderWidth: 4,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: [text, 'Room for improvement']
  });

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 60,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };


  return (
    <Grid container spacing={3} {...props}>
      {overall &&
        overall.map((e, i) => (
          <Grid xs={6} container key={e.uuid}>
            <Grid xs={12} item>
              <Doughnut
                className={classes.graph}
                data={data(
                  e.score,
                  colorGradient(
                    e.score / 100,
                    rgb(255, 0, 0),
                    rgb(255, 255, 0),
                    rgb(0, 255, 0)
                  ),
                  e.name
                )}
                options={options}
              />
            </Grid>
            <Grid xs={12} item>
              <Typography align="center" gutterBottom variant="h5">
                {e.name} - {e.score}
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  )
}

export default BM_Doughnut