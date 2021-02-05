import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../Profile/styles';

const TopMerchants = ({ topMerchants }) => {
  const classes = useStyles();

  return topMerchants.slice(0, 5).map((merchant) => {
    return (
      <Typography paragraph>
        <p key={merchant.name}>
          <b className={classes.information}>{merchant.name}</b> - total spent
          in the last year: <b>{Math.abs(merchant.value).toFixed(0)} sek</b>
          <img
            className={classes.merchantLogo}
            src={`https://logo.clearbit.com/${merchant.name
              .split(/\s/)
              .join('')}.com`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
            }}
          ></img>
        </p>
      </Typography>
    );
  });
};

export default TopMerchants;
