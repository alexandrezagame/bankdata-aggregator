import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export default makeStyles((theme) => ({
  container: {
    width: '200px',
    marginBottom: '16px',
    backgroundColor: '#427982',
    padding: '16px',
    height: 'auto',
  },
  merchantTitle: {
    color: '#F89672',
    textTransform: 'uppercase',
  },
  information: {
    color: 'white',
    fontSize: '16px',
  },
  large: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'contain',
    border: '1px solid #F89672',
  },
}));
