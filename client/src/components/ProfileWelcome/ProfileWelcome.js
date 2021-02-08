import React from 'react';
import { CardContent, Card, Typography } from '@material-ui/core';
import useStyles from './styles';
import welcomeImage from '../../assets/welcomeimage.svg';

const ProfileWelcome = () => {
  const classes = useStyles();

  return (
    <Card className={classes.cards}>
      <CardContent className={classes.cardsContent}>
        <Typography
          variant="h5"
          component="h5"
          className={classes.cardInformation}
        >
          <h3>
            This is a web app integrating the Tink API to fetch users' account
            and transaction data.
          </h3>
          <p>
            Click on the different sections on the side menu to display the
            information available.
          </p>
        </Typography>
        <img
          src={welcomeImage}
          alt="welcome Image"
          className={classes.welcomeImage}
        />
      </CardContent>
    </Card>
  );
};

export default ProfileWelcome;
