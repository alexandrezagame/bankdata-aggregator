import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

const Profile = () => {
  const [expenses, setExpenses] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [merchant, setMerchant] = useState('');
  const [totalRecurrences, setTotalRecurrences] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [topMerchants, setTopMerchants] = useState([]);
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
      // console.log('getuserdata', data);

      const s = new Date(
        data.response[data.response.length - 1].originalDate
      ).toLocaleDateString('en-GB');

      setStartDate(s);
      const x = new Date(data.response[0].originalDate).toLocaleDateString(
        'en-GB'
      );
      setEndDate(x);
    };
    fetchDate();
  }, []);

  const getTotalExpenses = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    console.log('getuserdata', data);
    console.log('get date', data.originalDate);

    const s = new Date(
      data.response[data.response.length - 1].originalDate
    ).toLocaleDateString('en-GB');
    console.log(s);
    setStartDate(s);
    const x = new Date(data.response[0].originalDate).toLocaleDateString(
      'en-GB'
    );
    setEndDate(x);

    // console.log(`from ${s} to ${x}`);

    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

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

  return (
    <div>
      <h1>Hello there!</h1>
      {startDate && (
        <div>
          <h3>
            Data collected from {startDate} to {endDate}
          </h3>
        </div>
      )}
      <button onClick={() => getTotalExpenses(token)}>See Expenses</button>
      {expenses && (
        <p>
          Your total expenses are: <b>{expenses} sek</b>
        </p>
      )}
      <br></br>
      <button onClick={() => getReccurentMerchant(token)}>
        See Most recurrent Merchant
      </button>
      {merchant && (
        <p>
          Your most recurrent spending is at: <b>{merchant}</b> - total spent in
          the last year: <b>{totalAmount} sek</b> - Amount of transactions:{' '}
          <b>{totalRecurrences}</b>
        </p>
      )}
      <br></br>
      <button onClick={() => getHighestSpendingMerchants(token)}>
        See TOP 3 Highest spending Merchants
      </button>
      <div>
        {topMerchants.length > 0
          ? topMerchants.slice(0, 5).map((merchant) => {
              return (
                <p key={merchant.name}>
                  <b>{merchant.name}</b> - total spent in the last year:{' '}
                  <b>{Math.abs(merchant.value).toFixed(0)} sek</b>
                  <img
                    src={`https://logo.clearbit.com/${merchant.name
                      .split(/\s/)
                      .join('')}.com`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://source.unsplash.com/random/200x200';
                    }}
                  ></img>
                </p>
              );
            })
          : ''}
      </div>
    </div>
  );
};

export default Profile;
