import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

const Profile = () => {
  const [expenses, setExpenses] = useState('');
  const [merchant, setMerchant] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [token, setToken] = useState(
    window.localStorage.getItem('token') || ''
  );

  useEffect(() => {
    if (!token) {
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
      console.log('we are in the ELSE of the useEffect');
    }
  }, []);

  const getTotalExpenses = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    console.log('getuserdata', data);
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

    const totalExp = expenses.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedTotalExp = Math.abs(totalExp).toFixed(2);
    setExpenses(convertedTotalExp);
    console.log('SUM', convertedTotalExp);
  };

  function mode(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const getMerchants = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    console.log('getuserdata', data);
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });

    const merchantArray = [];
    expenses.map((merchant) => {
      merchantArray.push(merchant.description);
    });
    const favMerchant = mode(merchantArray);
    setMerchant(favMerchant);

    const favMerchantArray = expenses.filter((item) => {
      return item.description === favMerchant;
    });
    const amountSpentOnMerchant = favMerchantArray.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedAmount = Math.abs(amountSpentOnMerchant).toFixed(2);
    setTotalAmount(convertedAmount);
  };

  return (
    <div>
      <h1>Hello there!</h1>
      <button onClick={() => getTotalExpenses(token)}>See Expenses</button>
      <p>
        Your total expenses are: <b>{expenses} sek</b>
      </p>
      <button onClick={() => getMerchants(token)}>See Merchants</button>
      <p>
        Your most recurrent spending is at: <b>{merchant}</b> - total spent in
        the last year: <b>{totalAmount} sek</b>
      </p>
    </div>
  );
};

export default Profile;
