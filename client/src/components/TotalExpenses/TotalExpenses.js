import React, { useState } from 'react';
import CountUp from 'react-countup';
import { CardContent, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
// import CircularProgress from '@material-ui/core/CircularProgress';

const TotalExpenses = ({ expenses }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardContent className={classes.cardsContent}>
        <Typography className={classes.cardInformation}>
          <p>
            Your total expenses are:{' '}
            <b className={classes.information}>
              <CountUp start={0} end={+expenses} duration={2.5} separator="," />{' '}
              sek
            </b>
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TotalExpenses;
