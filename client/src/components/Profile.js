import React, { useEffect, useState } from 'react';
import queryString from 'query-string';

const Profile = () => {
  const [expenses, setExpenses] = useState('');
  const [timestampInfo, setTimestampInfo] = useState({});

  const [merchant, setMerchant] = useState('');
  const [totalRecurrences, setTotalRecurrences] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [topMerchants, setTopMerchants] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const getTotalExpenses = async (token) => {
    const response = await fetch(
      `http://localhost:8080/api/auth/user/${token}`
    );
    const data = await response.json();
    // console.log(data);
    const expenses = data.response.filter((item) => {
      return item.categoryType === 'EXPENSES';
    });
    const incomes = data.response.filter((item) => {
      return item.categoryType === 'INCOME';
    });
    console.log('data', data.response[0].id);

    // incomes.map((item) => {
    //   console.log(new Date(item.originalDate).toLocaleDateString('en-GB'));
    // });

    // const monthlyExpenses = [
    //   { month: 01, year: 2020, expense: 0 },
    //   { month: 02, year: 2020, expense: 0 },
    // ];

    const totalExp = expenses.reduce((a, b) => {
      return a + b.amount;
    }, 0);
    const convertedTotalExp = Math.abs(totalExp).toFixed(0);
    setExpenses(convertedTotalExp);
  };

  // const getCategories = async (token) => {
  //   const response = await fetch(
  //     `http://localhost:8080/api/auth/categories/${token}`
  //   );
  //   const data = await response.json();
  //   const expenseCategories = data.response.filter((category) => {
  //     return category.type === 'EXPENSES';
  //   });
  //   setCategories(expenseCategories);
  //   console.log('CATEGORIIIIIES', expenseCategories);
  // };

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
      {timestampInfo.startDate && (
        <div>
          <h3>
            Data collected from {timestampInfo.startDate} to{' '}
            {timestampInfo.endDate}
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
      <br></br>

      {categories.length > 1 ? (
        <div className="select-container">
          <select>
            {categories.map((category) => (
              <option value={category.primaryName}>
                {category.primaryName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
