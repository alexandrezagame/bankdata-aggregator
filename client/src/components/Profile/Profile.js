import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import useStyles from './styles';
import Emoji from '../emoji';
import clsx from 'clsx';

import { mode } from '../../utils/mode';
import authService from '../../services/authService';
import { useHistory } from 'react-router-dom';
import {
  filterDataType,
  filterDataCategoryType,
} from '../../utils/filterExpenses';
import { fetchData } from '../../api/api';
import TotalExpenses from '../TotalExpenses/TotalExpenses';
import RecurrentMerchant from '../RecurrentMerchant/RecurrentMerchant';
import TopMerchants from '../TopMerchants/TopMerchants';
import MerchantsPerCategory from '../MerchantsPerCategory/MerchantsPerCategory';
import Charts from '../Charts/Charts';

import {
  Drawer,
  CssBaseline,
  Select,
  AppBar,
  FormControl,
  MenuItem,
  InputLabel,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import Looks5Icon from '@material-ui/icons/Looks5';

import logo from '../../assets/tinklogo.png';

const Profile = () => {
  const classes = useStyles();
  const history = useHistory();

  const [expenses, setExpenses] = useState('');
  const [timestampInfo, setTimestampInfo] = useState({});
  const [merchant, setMerchant] = useState('');
  const [totalRecurrences, setTotalRecurrences] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [topMerchants, setTopMerchants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [merchantByCategory, setMerchantByCategory] = useState([]);
  const [token, setToken] = useState('');
  const [showExpenses, setShowExpenses] = useState(false);
  const [showRecurrentMerchant, setShowRecurrentMerchant] = useState(false);
  const [showMerchant, setShowMerchant] = useState(false);
  const [
    showHighestSpendingMerchants,
    setShowHighestSpendingMerchants,
  ] = useState(false);

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutAndEraseToken = () => {
    localStorage.clear();
    sessionStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    try {
      const parsed = queryString.parse(window.location.search);

      const fetchInitialData = async () => {
        let dateData;
        let accessToken;

        if (sessionStorage.getItem('access_token')) {
          accessToken = sessionStorage.getItem('access_token');
        } else {
          accessToken = await authService.getAccessToken(parsed.code);
        }

        if (!accessToken) return history.push('/');
        setToken(accessToken);
        dateData = await fetchData('user', accessToken);

        const categoryData = await fetchData('categories', accessToken);

        const filteredExpenses = filterDataType(
          categoryData.response,
          'EXPENSES'
        );
        let listCat = filteredExpenses.map((o) => o.primaryName);
        let filtered = filteredExpenses.filter(
          ({ primaryName }, index) => !listCat.includes(primaryName, index + 1)
        );
        const startDate = new Date(
          dateData.response[dateData.response.length - 1].originalDate
        ).toLocaleDateString('en-GB');

        const endDate = new Date(
          dateData.response[0].originalDate
        ).toLocaleDateString('en-GB');

        setTimestampInfo({
          ...timestampInfo,
          startDate: startDate,
          endDate: endDate,
        });

        setCategories(filtered);
      };
      fetchInitialData();
    } catch (error) {
      console.log('Error from parsed', error);
    }
  }, []);

  const getMerchantByCategory = async (token, categoryId) => {
    const data = await fetchData('user', token);

    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const merchantCategory = filteredExpenses.filter((item) => {
      return item.categoryId === categoryId;
    });
    const merchant = {};
    merchantCategory.forEach(function (d) {
      if (d.description in merchant) {
        merchant[d.description] += Math.abs(d.amount);
      } else {
        merchant[d.description] = Math.abs(d.amount);
      }
    });
    console.log(merchantCategory);
    console.log(merchant);

    const combinedAmountOfMerchant = [];

    // for (const prop in merchant) {
    //   combinedAmountOfMerchant.push({ name: prop, value: merchant[prop] });
    // }
    setMerchantByCategory(merchant);
  };

  const getTotalExpenses = async (token) => {
    const data = await fetchData('user', token);

    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const totalExp = filteredExpenses.reduce((expensesByCategory, expense) => {
      const categoriesName =
        categories.find((c) => c.id === expense.categoryId)?.primaryName ??
        'Other';
      // console.log('expense', expense);
      if (!expensesByCategory[categoriesName]) {
        expensesByCategory[categoriesName] = 0;
      }

      expensesByCategory[categoriesName] += Math.abs(expense.amount);
      return expensesByCategory;
    }, {});

    setExpenses(totalExp);
  };

  const getReccurentMerchant = async (token) => {
    const data = await fetchData('user', token);
    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const merchantArray = [];
    filteredExpenses.map((merchant) => {
      merchantArray.push(merchant.description);
    });
    const favMerchant = mode(merchantArray);
    setMerchant(favMerchant);

    const totalRecurrencesAtFavMerchant = merchantArray.filter(
      (obj) => obj === favMerchant
    ).length;
    setTotalRecurrences(totalRecurrencesAtFavMerchant);

    const favMerchantArray = filteredExpenses.filter((item) => {
      return item.description === favMerchant;
    });
    const amountSpentOnMerchant = favMerchantArray.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedAmount = Math.abs(amountSpentOnMerchant).toFixed(0);
    setTotalAmount(convertedAmount);
  };

  const getHighestSpendingMerchants = async (token) => {
    const data = await fetchData('user', token);

    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const merchant = {};

    filteredExpenses.forEach(function (d) {
      if (merchant.hasOwnProperty(d.description)) {
        merchant[d.description] = merchant[d.description] + d.amount;
      } else {
        merchant[d.description] = d.amount;
      }
    });

    const combinedAmountOfMerchant = [];

    for (const prop in merchant) {
      combinedAmountOfMerchant.push({ name: prop, value: merchant[prop] });
    }

    const sortedHighestSpendingMerchant = combinedAmountOfMerchant.sort(
      (a, b) => parseFloat(a.value) - parseFloat(b.value)
    );

    setTopMerchants(sortedHighestSpendingMerchant);
  };

  const handleChange = (e) => {
    setShowHighestSpendingMerchants(false);
    setShowExpenses(false);
    setShowRecurrentMerchant(false);
    getMerchantByCategory(token, e.target.value);
    setShowMerchant(true);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" wrap className={classes.banner}>
              {timestampInfo.startDate && (
                <div className={classes.bannerText}>
                  Displaying data collected from {timestampInfo.startDate} until{' '}
                  {timestampInfo.endDate}
                </div>
              )}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img src={logo} className={classes.logo} />
            <IconButton
              onClick={handleDrawerClose}
              className={classes.closingButton}
            >
              {handleDrawerClose === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          <Divider />

          <List>
            <ListItem button>
              <MonetizationOnIcon />
              <ListItemIcon
                onClick={() => {
                  setShowMerchant(false);
                  setShowHighestSpendingMerchants(false);
                  setShowRecurrentMerchant(false);
                  getTotalExpenses(token);
                  setShowExpenses(true);
                }}
              >
                <div className={classes.menuTitles}>See Expenses</div>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button>
              <BusinessIcon />
              <ListItemIcon
                onClick={() => {
                  setShowExpenses(false);
                  setShowHighestSpendingMerchants(false);
                  setShowMerchant(false);
                  getReccurentMerchant(token);
                  setShowRecurrentMerchant(true);
                }}
              >
                <div className={classes.menuTitles}>
                  Most Recurrent Merchant
                </div>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button>
              <Looks5Icon />
              <ListItemIcon
                onClick={() => {
                  setShowExpenses(false);
                  setShowMerchant(false);
                  setShowRecurrentMerchant(false);
                  getHighestSpendingMerchants(token);
                  setShowHighestSpendingMerchants(true);
                }}
              >
                <div className={classes.menuTitles}>Top 5 spendings</div>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button>
              <CategoryIcon />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Categories
                </InputLabel>
                {categories.length > 1 ? (
                  <Select onChange={handleChange}>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.primaryName}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  ''
                )}
              </FormControl>
            </ListItem>
          </List>
          <Button className={classes.logout} onClick={logoutAndEraseToken}>
            Logout
          </Button>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          {showMerchant && (
            <>
              <div className={classes.sectionTitle}>
                <h3>
                  Your favorite merchants in this category:{' '}
                  <Emoji symbol="❤️‍🔥" label="Heart on Fire" />
                </h3>
              </div>
              <div>
                <div className={classes.merchantsCards}>
                  {Object.keys(merchantByCategory).map((key) => {
                    return (
                      <MerchantsPerCategory
                        name={key}
                        value={merchantByCategory[key]}
                        key={key}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {showExpenses && (
            <>
              <div className={classes.sectionTitle}>
                <h3>
                  Your total expenses in the collected period:{' '}
                  <Emoji symbol="💸" label="Money with Wings" />
                </h3>
              </div>
              <TotalExpenses
                expenses={Object.values(expenses).reduce(
                  (totalExp, expensesByCategory) =>
                    (totalExp += expensesByCategory),
                  0
                )}
              />
              {Object.keys(expenses).length && (
                <Charts title="Merchant in the category" datasets={expenses} />
              )}
            </>
          )}

          {showRecurrentMerchant && (
            <>
              <div className={classes.sectionTitle}>
                <h3>
                  Your most recurrent merchant:{' '}
                  <Emoji symbol="🧡" label="Orange Heart" />
                </h3>
              </div>
              <RecurrentMerchant
                merchant={merchant}
                totalAmount={totalAmount}
                totalRecurrences={totalRecurrences}
                topMerchants={topMerchants}
              />
            </>
          )}

          {showHighestSpendingMerchants && (
            <>
              <div className={classes.sectionTitle}>
                <h3>
                  Top 5 merchants with highest spendings:{' '}
                  <Emoji symbol="🔝" label="Top Arrow" />
                </h3>
              </div>
              <div className={classes.merchantsCards}>
                <TopMerchants topMerchants={topMerchants} />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
