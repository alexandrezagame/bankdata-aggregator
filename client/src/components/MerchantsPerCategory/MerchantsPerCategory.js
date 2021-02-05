import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../Profile/styles';

const MerchantsPerCategory = ({ name, value }) => {
  const classes = useStyles();
  console.log('name', name);
  console.log('value', value);
  return (
    <Typography paragraph>
      {name} - {Math.abs(value).toFixed(0)} sek
    </Typography>
  );
};

export default MerchantsPerCategory;
