import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '12.5rem',
    marginBottom: '1rem',
    backgroundColor: '#427982',

    minHeight: '15.625rem',
    position: 'relative',
  },
  information: {
    color: 'white',
  },
  merchantTitle: {
    fontSize: '1rem',
    color: '#F89672',
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
  large: {
    width: '6.25rem',
    height: '6.25rem',
    borderRadius: '50%',
    border: '1px solid #F89672',
    position: 'absolute',
    bottom: '1.5rem',
    marginTop: '2rem',

    marginBottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  MuiAvatar: {
    img: {
      // handle correctly non-square images
      objectFit: 'contain',
      height: '100%',
    },
  },
}));
