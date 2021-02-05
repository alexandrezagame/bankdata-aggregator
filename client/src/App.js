import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Home, Profile } from './components';
import RecurrentMerchant from './components/RecurrentMerchant/RecurrentMerchant';
import TopMerchants from './components/TopMerchants/TopMerchants';
import MerchantsPerCategory from './components/MerchantsPerCategory/MerchantsPerCategory';
import TotalExpenses from './components/TotalExpenses/TotalExpenses';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>
        {/* <Route exact path="/">
          <RecurrentMerchant />
        </Route>
        <Route exact path="/">
          <TopMerchants />
        </Route>
        <Route exact path="/">
          <TotalExpenses />
        </Route>
        <Route exact path="/">
          <MerchantsPerCategory />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
