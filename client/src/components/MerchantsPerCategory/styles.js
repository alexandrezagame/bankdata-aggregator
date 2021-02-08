import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '14.375rem',
    margin: '1rem',
    // backgroundColor: '#427982',
    backgroundColor: '#F89672',
    borderRadius: '15px 0 15px 0',
    minHeight: '16.625rem',
    position: 'relative',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
  information: {
    color: '#fff',
  },
  merchantTitle: {
    fontSize: '1rem',
    color: '#427982',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  merchantDescription: {
    fontSize: '1rem',
    position: 'absolute',
    width: '100%',
    bottom: '0',
    textAlign: 'center',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '1rem',
  },
  images: {
    width: '9.375rem',
    height: '9.375rem',
    borderRadius: '50%',
    border: '1px solid #F89672',
    position: 'absolute',
    bottom: '1.5rem',
    marginBottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundSize: 'contain',
    backgroundPosition: 'top center',
    objectFit: 'contain',
  },
  noinfodiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#427982',
  },
  noinfo: {
    width: 'auto',
    height: '70vh',
  },
}));
