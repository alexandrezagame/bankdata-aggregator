import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: 'transparent',
    color: '#427982',
    width: '50vw',
    padding: '16px',
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  welcomeImage: {
    width: '50%',
    height: 'auto',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cardsContent: {
    textAlign: 'justify',
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
