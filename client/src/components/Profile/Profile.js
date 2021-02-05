import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import useStyles from './styles';
import { mode } from '../../utils/mode';
import {
  filterDataType,
  filterDataCategoryType,
} from '../../utils/filterExpenses';
// import useFetch from '../../hooks/useFetch';
import { fetchData } from '../../api/api';
import TotalExpenses from '../TotalExpenses/TotalExpenses';
import RecurrentMerchant from '../RecurrentMerchant/RecurrentMerchant';
import TopMerchants from '../TopMerchants/TopMerchants';
import MerchantsPerCategory from '../MerchantsPerCategory/MerchantsPerCategory';

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
} from '@material-ui/core';

import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import CategoryIcon from '@material-ui/icons/Category';
import Looks5Icon from '@material-ui/icons/Looks5';

import logo from '../../assets/tinklogo.png';

const Profile = () => {
  const classes = useStyles();

  const [expenses, setExpenses] = useState('');
  const [timestampInfo, setTimestampInfo] = useState({});

  const [merchant, setMerchant] = useState('');
  const [totalRecurrences, setTotalRecurrences] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [topMerchants, setTopMerchants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [merchantByCategory, setMerchantByCategory] = useState([]);
  const [token, setToken] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const fetchCode = async () => {
      const response = await fetch(
        `http://localhost:8080/api/auth/${parsed.code}`
      );
      const data = await response.json();

      setToken(data.access_token);
      return data.access_token;
    };
    const fetchInitialData = async () => {
      const accessToken = await fetchCode();
      const categoryData = await fetchData('categories', accessToken);

      const filteredExpenses = filterDataType(
        categoryData.response,
        'EXPENSES'
      );
      let listCat = filteredExpenses.map((o) => o.primaryName);
      let filtered = filteredExpenses.filter(
        ({ primaryName }, index) => !listCat.includes(primaryName, index + 1)
      );
      const dateData = await fetchData('user', accessToken);
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
  }, []);

  const getMerchantByCategory = async (token, categoryId) => {
    const data = await fetchData('user', token);

    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const merchantCategory = filteredExpenses.filter((item) => {
      return item.categoryId === categoryId;
    });
    const merchant = {};
    merchantCategory.forEach(function (d) {
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
    setMerchantByCategory(combinedAmountOfMerchant);
  };

  const getTotalExpenses = async (token) => {
    const data = await fetchData('user', token);

    const filteredExpenses = filterDataCategoryType(data.response, 'EXPENSES');

    const totalExp = filteredExpenses.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedTotalExp = Math.abs(totalExp).toFixed(0);
    setExpenses(convertedTotalExp);
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
    getMerchantByCategory(token, e.target.value);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              {timestampInfo.startDate && (
                <div className={classes.bannerText}>
                  Displaying data collected since {timestampInfo.startDate}{' '}
                  until {timestampInfo.endDate}
                </div>
              )}
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <img src={logo} className={classes.logo} />
          </div>

          <Divider />

          <List>
            <ListItem button>
              <MonetizationOnIcon />
              <ListItemIcon onClick={() => getTotalExpenses(token)}>
                <div className={classes.menuTitles}>See Expenses</div>
              </ListItemIcon>
              <ListItemText />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button>
              <BusinessIcon />
              <ListItemIcon onClick={() => getReccurentMerchant(token)}>
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
              <ListItemIcon onClick={() => getHighestSpendingMerchants(token)}>
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
                      <MenuItem value={category.id}>
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
        </Drawer>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {merchantByCategory.map((list) => {
            return <MerchantsPerCategory name={list.name} value={list.value} />;
          })}

          {expenses && <TotalExpenses expenses={expenses} />}

          {merchant && (
            <RecurrentMerchant
              merchant={merchant}
              totalAmount={totalAmount}
              totalRecurrences={totalRecurrences}
            />
          )}

          {topMerchants.length > 0 ? (
            <TopMerchants topMerchants={topMerchants} />
          ) : (
            ''
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
