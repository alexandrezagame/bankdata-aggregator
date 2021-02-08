import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Home, Profile } from './components';

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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
