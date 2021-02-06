import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: '#427982',
    color: 'white',
    width: 'auto',
    padding: '16px',
    margin: '0 auto',
    width: '40vw',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  cardsContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  cardInformation: {
    fontSize: '1.5rem',
  },
  information: {
    color: '#F89672',
  },
}));
