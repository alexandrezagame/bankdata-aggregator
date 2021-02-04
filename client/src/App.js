import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Profile } from './components';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
