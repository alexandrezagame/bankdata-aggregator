import React from 'react';
import { CardContent, Card, Typography } from '@material-ui/core';
import useStyles from './styles';

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
          <p>
            Welcome to this app where you can look into the different data
            collected from your bank:
          </p>
          <p>
            Click on the different sections on the side menu to display the
            information.
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileWelcome;
