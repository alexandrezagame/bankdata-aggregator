import React from 'react';
import { Typography, Card, Avatar } from '@material-ui/core';
import useStyles from './styles';

const TopMerchants = ({ topMerchants }) => {
  const classes = useStyles();

  return topMerchants.slice(0, 5).map((merchant) => {
    return (
      <>
        <Card className={classes.container}>
          <Typography
            paragraph
            key={merchant.value}
            className={classes.information}
          >
            <p className={classes.merchantTitle}>
              <b>{merchant.name}</b>
            </p>
            <p className={classes.merchantDescription}>
              Total spent:
              <b> {Math.abs(merchant.value).toFixed(0)} sek</b>
            </p>
          </Typography>
          <Avatar
            className={classes.large}
            alt={merchant.name}
            src={`https://logo.clearbit.com/${merchant.name
              .split(/\s/)
              .join('')}.com`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
            }}
          ></Avatar>
        </Card>
      </>
    );
  });
};

export default TopMerchants;
