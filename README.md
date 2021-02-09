# Bank Data Aggregator

This is a web app integrating the Tink API to fetch users' account and transaction data.

<img width="1440" alt="Screenshot 2021-02-08 at 16 34 49" src="https://user-images.githubusercontent.com/59875556/107241794-9cb24980-6a2b-11eb-8e73-bd6a5e42e009.png">

## Technologies used: 
React, Material UI, Chartjs, Clearbit API (for the logos) for the frontend.
</br>
Node and Express for the backend.
</br>
Tink Link

## Installation

The application requires a Tink API developer account.

## Running the app locally

Install the dependencies: $ npm install
Set your client identifier and client secret into a .env file in your server folder:
<br/>
TINK_CLIENT_ID="<YOUR_CLIENT_ID>"
<br/>
TINK_SECRET_KEY="<YOUR_CLIENT_SECRET>"

### Change to baseURLDev in the following files:

client > src > api > api.js
<br/>
client > src > Home > Home.js
<br/>
client > src > services > authServices.js

### Change the url in the Server folder to redirect to either localhost or your own frontend domain:

server > app.js

Run both the backend (server.js) and the frontend (client folder):
$ npm start

You should be redirected to the client app on http://localhost:3000/. The client runs on port 3000 and the server runs on 8080.

## Available Data: from / to

### Top expenses:

Displays all the data labeled as 'EXPENSES' by your bank.

### Most Recurrent Merchant:

Displays the merchant where you have spent the most number of times. Not the most amount of money.

### Top 5 Merchants:

Displays the 5 merchants where you have spent the most amount of money.

### Top Merchants per Category:

Displays the merchants where you have spent the most amount of money per category.
Expenses are categorized by your bank automatically. Some categories wont have any expenses due to lack of data from your bank.
