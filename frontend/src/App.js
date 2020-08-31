import React from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import Vendor from './components/vendor.component'
import Customer from './components/customer.component'
import LoginUser from './components/login'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create User</Link>
              </li>
              <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Switch>
        <Route path="/vendor" component={Vendor}/>
        <Route path="/customer" component={Customer}/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/create" component={CreateUser}/>
        <Route path="/login" component={LoginUser}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
