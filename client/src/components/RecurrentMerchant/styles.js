import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  cards: {
    backgroundColor: '#427982',
    color: 'white',
    width: 'auto',
    padding: '16px',
    margin: '0 auto',
    width: '40vw',
  },
  cardsContent: {
    textAlign: 'justify',
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
