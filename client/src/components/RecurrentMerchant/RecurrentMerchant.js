import React from 'react';
import { CardContent, Card, Typography } from '@material-ui/core';
import useStyles from './styles';

const RecurrentMerchant = ({ merchant, totalAmount, totalRecurrences }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardContent className={classes.cardsContent}>
        <Typography
          variant="h5"
          component="h5"
          className={classes.cardInformation}
        >
          <p>
            Most Recurrent Merchant:
            <b className={classes.information}> {merchant}</b>
          </p>
          <p>
            Total spent in the last year:
            <b className={classes.information}> {totalAmount} sek</b>
          </p>
          <p>
            Amount of transactions:
            <b className={classes.information}> {totalRecurrences}</b>
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecurrentMerchant;
