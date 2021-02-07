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
    const data = await getAccessToken(code);
    res.send({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
  } catch (error) {
    res.status(500).json({ message: error });
    return;
  }
});

app.get('/api/auth/refresh/:refreshtoken', async (req, res) => {
  try {
    const body = {
      client_id: CLIENT_ID, //  OAuth client identifier.
      client_secret: SECRET_ID, //  OAuth client secret.
      grant_type: 'refresh_token',
      refresh_token: req.params.refreshtoken,
    };
    const data = await handleResponse(
      await fetch(`https://api.tink.com/api/v1/oauth/token`, {
        method: 'POST',
        body: Object.keys(body)
          .map(
            (key) =>
              encodeURIComponent(key) + '=' + encodeURIComponent(body[key])
          )
          .join('&'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
    );
    res.send({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
    return;
  } catch (error) {
    res.status(401).json({ message: error });
    console.log(error);
    return;
  }
});

const getUserData = async (token) => {
  try {
    const response = await fetch('https://api.tink.com/api/v1/transactions', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        // 'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error };
  }
};

const getUserCategories = async (token) => {
  try {
    const response = await fetch('https://api.tink.com/api/v1/categories', {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        // 'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error };
  }
};

app.get('/api/auth/user/:code', async (req, res) => {
  const code = req.params.code;

  const response = await getUserData(code);
  res.status(response.message ? 500 : 200).send({ response });
});

app.get('/api/auth/categories/:code', async (req, res) => {
  const code = req.params.code;

  const response = await getUserCategories(code);
  res.status(response.message ? 500 : 200).send({ response });
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
    client_id: CLIENT_ID, //  OAuth client identifier.
    client_secret: SECRET_ID, //  OAuth client secret.
    grant_type: 'authorization_code',
  };

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
  return handleResponse(response);
}

const PORT = 8080;
app.listen(PORT, () => {
  console.log('Server running on port' + PORT);
});
