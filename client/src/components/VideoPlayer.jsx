import React, { useContext, useState } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../Context';
import MLPrediction from './MLPrediction';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, prediction } = useContext(SocketContext);
  const classes = useStyles();
  const [mlCalling, setMlCalling] = useState(false);
  return (
    <>
      {mlCalling && (
      <MLPrediction prediction={prediction} />
      )}
      <Grid container className={classes.gridContainer}>
        {stream && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <button onClick={() => setMlCalling(!mlCalling)} type="button"> Predict</button>

              <Typography variant="h5" gutterBottom>{name || 'UserName'}</Typography>
              <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>{call.name || 'Caller'}</Typography>
              <video playsInline ref={userVideo} autoPlay className={classes.video} />
            </Grid>
          </Paper>
        )}
      </Grid>
    </>
  );
};

export default VideoPlayer;
