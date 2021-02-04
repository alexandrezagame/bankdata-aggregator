import React from 'react';
import { Typography, Button, Card, CardActionArea } from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
import useStyles from './styles';
import Emoji from '../emoji';

const Home = () => {
  const classes = useStyles();

  const fetchData = async () => {
    const data = await (await fetch('http://localhost:8080/api/auth')).json();
    console.log(data);
    window.location = data.url;
  };

  return (
    <Card>
      <CardActionArea
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Typography variant="h4" gutterBottom className={classes.title}>
          Hi <Emoji symbol="👋" label="wave" /> Please connect to your bank to
          check your financial information.
        </Typography>
        <Typography variant="h5" className={classes.description}>
          Connect by clicking on the button bellow!{' '}
          <Emoji symbol="👇" label="point" />
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          size="medium"
          type="submit"
          onClick={() => fetchData()}
        >
          Connect
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default Home;
