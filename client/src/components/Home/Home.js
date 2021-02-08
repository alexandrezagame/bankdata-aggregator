import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Card,
  CardActionArea,
  TextareaAutosize,
} from '@material-ui/core';
// import { MenuIcon } from '@material-ui/icons';
import useStyles from './styles';
import Emoji from '../emoji';
import {
  getAccessToken,
  getAccessTokenFromRefresh,
} from '../../services/authService';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const baseURLDev = 'http://localhost:8080';
const baseURLProd = 'https://monity-backend.herokuapp.com';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const classes = useStyles();

  useEffect(async () => {
    const token = await getAccessTokenFromRefresh();
    setLoading(false);
    if (token) {
      history.push('/profile');
    }
  }, []);

  const fetchData = async () => {
    const data = await (await fetch(`${baseURLDev}/api/auth`)).json();

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
          onClick={() => (loading ? null : fetchData())}
        >
          {loading ? <CircularProgress /> : 'Connect'}
        </Button>
      </CardActionArea>
    </Card>
  );
};

export default Home;
