import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: '#427982',
    color: '#fff',
    width: '50vw',
    padding: '16px',
    height: '80vh',
    margin: '0 auto',
    borderRadius: '15px 0 15px 0',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    // boxShadow:
    //   '0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 0), 0px 0px 0px 0px rgb(0 0 0 0)',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  info: {
    color: '#F89672',
  },
  welcomeImage: {
    width: '80%',
    height: '50vh',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
  },
  cardsContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  cardInformation: {
    margin: '0 auto',
    fontSize: '1.5rem',
  },
}));
