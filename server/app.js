require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = require('node-fetch');

const CLIENT_ID = process.env.TINK_CLIENT_ID;
const SECRET_ID = process.env.TINK_SECRET_KEY;

app.use(cors());

const baseURL = 'https://api.tink.com/api/v1';

app.get('/api/auth', (req, res) => {
  res.send({
    url: `https://link.tink.com/1.0/authorize/?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile&market=SE&locale=en_US&scope=accounts:read,investments:read,transactions:read,user:read,statistics:read,identity:read,credentials:read`,
  });
});

app.get('/api/auth/:code', async (req, res) => {
  try {
    const code = req.params.code;
    console.log('Server side HERE', code);
    const data = await getAccessToken(code);
    res.send({ access_token: data.access_token });
  } catch (error) {
    console.log(error);
  }
});

const getUserData = async (token) => {
  const response = await fetch('https://api.tink.com/api/v1/transactions', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      // 'Content-Type': 'application/json',
    },
  });
  // console.log('RESPONSE IN GETUSER', response);

  const data = await response.json();
  return data;
};

const getUserCategories = async (token) => {
  const response = await fetch('https://api.tink.com/api/v1/categories', {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      // 'Content-Type': 'application/json',
    },
  });
  // console.log('RESPONSE IN GETUSER', response);

  const data = await response.json();
  return data;
};

app.get('/api/auth/user/:code', async (req, res) => {
  const code = req.params.code;

  const response = await getUserData(code);
  res.send({ response });
});

app.get('/api/auth/categories/:code', async (req, res) => {
  const code = req.params.code;

  const response = await getUserCategories(code);
  res.send({ response });
});

async function handleResponse(response) {
  const json = await response.json();
  if (response.status !== 200) {
    throw new Error(json.errorMessage);
  }
  return json;
}

async function getAccessToken(code) {
  const body = {
    code: code,
    client_id: CLIENT_ID, // Your OAuth client identifier.
    client_secret: SECRET_ID, // Your OAuth client secret. Always handle the secret with care.
    grant_type: 'authorization_code',
  };
  console.log('CODE', code);
  console.log('CLIENT ID', body.client_id);
  console.log('CLIENT SECRET', body.client_secret);

  const response = await fetch(baseURL + '/oauth/token', {
    method: 'POST',
    body: Object.keys(body)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
      )
      .join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
  // console.log('RESPONSE', response);
  return handleResponse(response);
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log('Server running on port' + PORT);
});
