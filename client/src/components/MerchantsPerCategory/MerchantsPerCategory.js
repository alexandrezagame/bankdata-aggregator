import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import useStyles from '../Profile/styles';

const MerchantsPerCategory = ({ name, value }) => {
  const classes = useStyles();
  // console.log('name', name);

  const cleanedRegex = name.replace(/[^a-zA-Z ]/g, ' ');

  let firstWord = cleanedRegex.replace(/ .*/, '');

  console.log(firstWord);

  return (
    <>
      <Card className={classes.cards}>
        <CardContent className={classes.cardsContent}>
          <Typography paragraph>
            {name} - {Math.abs(value).toFixed(0)} sek
          </Typography>
          <img
            className={classes.merchantLogo}
            src={`https://logo.clearbit.com/${firstWord}.com`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
            }}
          ></img>
        </CardContent>
      </Card>
    </>
  );
};

export default MerchantsPerCategory;
