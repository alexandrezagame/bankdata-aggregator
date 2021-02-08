import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

const MerchantsPerCategory = ({ name, value }) => {
  const classes = useStyles();

  const cleanedRegex = name.replace(/[^a-zA-Z& ]/g, ' ');
  let firstWord = cleanedRegex.replace(/ .*/, '');

  return (
    <>
      {name !== 'error' ? (
        <Card className={classes.container}>
          <CardContent className={classes.cardsContent}>
            <Typography paragraph className={classes.information}>
              <p className={classes.merchantTitle}>{name}</p>
              <p className={classes.merchantDescription}>
                Total spent:
                <b> {Math.abs(value).toFixed(0)} sek</b>
              </p>
            </Typography>

            <CardMedia>
              <img
                className={classes.images}
                src={`https://logo.clearbit.com/${firstWord}.com?size=100`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
                }}
                alt={firstWord}
              />
            </CardMedia>
          </CardContent>
        </Card>
      ) : (
        <p>No information available!</p>
      )}
    </>
  );
};

export default MerchantsPerCategory;
