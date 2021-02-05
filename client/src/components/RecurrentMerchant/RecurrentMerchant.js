import React from 'react';
import { CardContent, Card, Typography } from '@material-ui/core';
import useStyles from '../Profile/styles';

const RecurrentMerchant = ({ merchant, totalAmount, totalRecurrences }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardContent className={classes.cardsContent}>
        <Typography className={classes.title}>
          Most Recurrent Merchant:{' '}
          <b className={classes.information}>{merchant}</b>
        </Typography>
        <Typography variant="h5" component="h5">
          Total spent in the last year:{' '}
          <b className={classes.information}>{totalAmount} sek</b>
          <br></br>
          Amount of transactions:{' '}
          <b className={classes.information}>{totalRecurrences}</b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecurrentMerchant;
