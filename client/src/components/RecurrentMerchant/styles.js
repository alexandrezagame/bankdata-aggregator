import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: '#427982',
    color: 'white',
    width: '50vw',
    padding: '16px',
    margin: '0 auto',
    borderRadius: '15px 0 15px 0',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },

    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
