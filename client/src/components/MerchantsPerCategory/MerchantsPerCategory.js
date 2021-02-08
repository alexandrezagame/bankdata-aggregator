import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';
import noinfo from '../../assets/bike.svg';

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
                src={`https://logo.clearbit.com/${firstWord}.com?`}
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
        <>
          <div className={classes.noinfodiv}>
            <Typography variant="h5">
              Sorry, there is no information available.
            </Typography>
            <Typography variant="h6">Try another category.</Typography>

            <img src={noinfo} alt="bike" className={classes.noinfo} />
          </div>
        </>
      )}
    </>
  );
};

export default MerchantsPerCategory;
