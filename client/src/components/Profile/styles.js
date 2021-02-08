import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#427982',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    backgroundColor: '#427982',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  closingButton: {
    color: '#427982',
    margin: '0',
    padding: '0 0 0 0.5rem',
    width: '30px',
    height: '30px',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // margin: '0 auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  logo: {
    width: '110px',
    height: 'auto',
    margin: '0 auto',
    cursor: 'pointer',
  },
  banner: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    backgroundColor: '#427982',
  },
  bannerDate: {
    color: '#F89672',
  },
  logout: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translate(-50%)',
  },
  copyright: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%)',
    fontSize: '0.5rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formSelect: {
    width: '150px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuTitles: {
    marginLeft: '20px',
  },
  sectionTitle: {
    color: '#F89672',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '24px',
  },
  merchantsCards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
}));
