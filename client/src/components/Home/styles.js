import { makeStyles } from '@material-ui/core/styles';
import Background from '../../assets/background.jpg';

export default makeStyles((theme) => ({
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30vw',
    // backgroundImage: `url(${Background})`,
    backgroundColor: '#427882',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '15px 0 15px 0',
    textAlign: 'center',
    color: 'white',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '0 1rem',
    '@media (max-width: 812px)': {
      width: '90vw',
    },
  },
  title: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  descrition: {
    width: '30vw',
  },
  button: {
    width: 'auto',
    margin: '3rem auto',
    background: '#DA8364',
    color: 'white',
  },
}));
