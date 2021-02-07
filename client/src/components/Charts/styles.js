import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chart: {
    marginTop: '2rem',
    width: '50%',
    margin: '15px auto',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '15px 0',
    },
  },
  title: {
    color: '#F89672',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '24px',
  },
}));
