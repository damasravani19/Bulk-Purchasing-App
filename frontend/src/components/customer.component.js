import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

import SearchProducts from './searchproducts.component'
import ViewPlacedOrders from './viewplacedorders.component'

class Customer extends Component {
    render() {
      return (
      <Router>
       <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/customer/SearchProducts" className="navbar-brand">SearchProducts</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/customer/ViewPlacedOrders" className="nav-link">ViewPlacedOrders</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
             <Switch>
                <Route path="/customer/SearchProducts" exact component={SearchProducts}/>
                <Route path="/customer/ViewPlacedOrders" component={ViewPlacedOrders}/>
             </Switch>
      </div>
      </Router>
      )
    }
  }

export default Customer