import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cards: {
    marginBottom: '2rem',
    backgroundColor: '#03424B',
    color: 'white',
    width: '50vw',
    padding: '1rem',
    margin: '0 auto',
  },
  bannerText: {
    margin: '0 auto',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#427882',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  information: {
    color: '#F89672',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  logo: {
    width: '104px',
    marginLeft: '70px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  merchantLogo: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  title: {
    fontSize: 24,
  },
  menuTitles: {
    marginLeft: '20px',
  },
}));
