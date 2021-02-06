import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;
export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  bannerText: {
    margin: '0 auto',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#427982',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
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
  menuTitles: {
    marginLeft: '20px',
  },
  sectionTitle: {
    color: '#F89672',
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '24px',
  },
  showMerchantsPerCategory: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  showHighestSpendingMerchants: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
}));
