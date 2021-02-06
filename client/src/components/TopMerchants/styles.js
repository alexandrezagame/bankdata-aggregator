import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export default makeStyles((theme) => ({
  container: {
    width: '200px',
    marginBottom: '16px',
    backgroundColor: '#427982',
    padding: '16px',
    minHeight: '250px',
    position: 'relative',
  },
  information: {
    color: 'white',
    fontSize: '16px',
  },
  merchantTitle: {
    color: '#F89672',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  merchantDescription: {
    position: 'absolute',
    bottom: '0',
    marginBottom: '16px',
  },
  large: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'contain',
    border: '1px solid #F89672',
    position: 'absolute',
    bottom: '20px',
    marginBottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));
