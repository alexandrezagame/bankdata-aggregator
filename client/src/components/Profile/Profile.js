import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import useStyles from './styles';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BusinessIcon from '@material-ui/icons/Business';
import Looks5Icon from '@material-ui/icons/Looks5';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CountUp from 'react-countup';

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
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );

  useEffect(() => {
    if (!token) {
      // console.log('step 1');
      const parsed = queryString.parse(window.location.search);
      console.log(parsed);
      const fetchCode = async () => {
        const response = await fetch(
          `http://localhost:8080/api/auth/${parsed.code}`
        );
        const data = await response.json();
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
      };
      fetchCode();
    } else {
      console.log('step 2');
    }
  }, []);

  useEffect(() => {
    const fetchDate = async () => {
      const response = await fetch(
        `http://localhost:8080/api/auth/user/${token}`
      );
      const data = await response.json();

      const s = new Date(
        data.response[data.response.length - 1].originalDate
      ).toLocaleDateString('en-GB');

      const x = new Date(data.response[0].originalDate).toLocaleDateString(
        'en-GB'
      );

      setTimestampInfo({ ...timestampInfo, startDate: s, endDate: x });
    };
    fetchDate();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `http://localhost:8080/api/auth/categories/${token}`
      );
      const data = await response.json();
      const expenseCategories = data.response.filter((category) => {
        return category.type === 'EXPENSES';
      });

      let listCat = expenseCategories.map((o) => o.primaryName);
      let filtered = expenseCategories.filter(
        ({ primaryName }, index) => !listCat.includes(primaryName, index + 1)
      );

      console.log(filtered);
      setCategories(filtered);
    };
    fetchCategories();
  }, []);

  const getMerchantByCategory = async (token, categoryId) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

    const merchantCategory = expenses.filter((item) => {
      return item.categoryId === categoryId;
    });
    setMerchantByCategory(merchantCategory);
  };

  const getTotalExpenses = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });
    const incomes = data.response.filter((item) => {
      return item.categoryType === 'INCOME';
    });
    console.log('data', data);

    const totalExp = expenses.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedTotalExp = Math.abs(totalExp).toFixed(0);
    setExpenses(convertedTotalExp);
  };

  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const getReccurentMerchant = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

    const merchantArray = [];
    expenses.map((merchant) => {
      merchantArray.push(merchant.description);
    });
    const favMerchant = mode(merchantArray);
    setMerchant(favMerchant);

    const totalRecurrencesAtFavMerchant = merchantArray.filter(
      (obj) => obj === favMerchant
    ).length;
    setTotalRecurrences(totalRecurrencesAtFavMerchant);

    const favMerchantArray = expenses.filter((item) => {
      return item.description === favMerchant;
    });
    const amountSpentOnMerchant = favMerchantArray.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedAmount = Math.abs(amountSpentOnMerchant).toFixed(0);
    setTotalAmount(convertedAmount);
  };

  const getHighestSpendingMerchants = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();

    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

    const merchant = {};

    expenses.forEach(function (d) {
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
                <div>
                  <h3>
                    Data collected from {timestampInfo.startDate} to{' '}
                    {timestampInfo.endDate}
                  </h3>
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
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
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
          <Typography paragraph>
            {merchantByCategory.map((list) => {
              return <p>{list.description}</p>;
            })}
          </Typography>
          <Divider />

          <Typography paragraph>
            {expenses && (
              <p>
                Your total expenses are:{' '}
                <b>
                  <CountUp
                    start={0}
                    end={expenses}
                    duration={2.5}
                    separator=","
                  />{' '}
                  sek
                </b>
              </p>
            )}
          </Typography>

          {merchant && (
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Most Recurrent Merchant: <b>{merchant}</b>
                </Typography>
                <Typography variant="h5" component="h5">
                  Total spent in the last year: <b>{totalAmount} sek</b>
                  <br></br>
                  Amount of transactions: <b>{totalRecurrences}</b>
                </Typography>
              </CardContent>
            </Card>
          )}

          <Typography paragraph>
            {topMerchants.length > 0
              ? topMerchants.slice(0, 5).map((merchant) => {
                  return (
                    <p key={merchant.name}>
                      <b>{merchant.name}</b> - total spent in the last year:{' '}
                      <b>{Math.abs(merchant.value).toFixed(0)} sek</b>
                      <img
                        className={classes.merchantLogo}
                        src={`https://logo.clearbit.com/${merchant.name
                          .split(/\s/)
                          .join('')}.com`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
                        }}
                      ></img>
                    </p>
                  );
                })
              : ''}
          </Typography>
        </main>
      </div>
    </>
  );
};

export default Profile;