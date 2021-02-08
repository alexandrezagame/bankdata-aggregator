import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: 'transparent',
    color: '#427982',
    width: '50vw',
    padding: '16px',
    margin: '0 auto',
    border: 'none',

    boxShadow:
      '0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 0), 0px 0px 0px 0px rgb(0 0 0 0)',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  welcomeImage: {
    width: '80%',
    height: 'auto',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
  information: {
    color: '#F89672',
  },
}));
