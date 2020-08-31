import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import VCreateproduct from './vcreateproduct.component'
import VViewAllproducts from './vviewAllproducts.component'
import VTobeDispatched from './vtobeDispatched.component'
import VDispatched from './vdispatched.component'

class Vendor extends Component {
    render() {
      return (
      <Router>
       <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/vendor/VCreateproduct" className="navbar-brand">VCreateproduct</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/vendor/VViewAllproducts" className="nav-link">VViewAllproducts</Link>
              </li>
              <li className="navbar-item">
                <Link to="/vendor/VTobeDispatched" className="nav-link">VTobeDispatched</Link>
              </li>
              <li className="navbar-item">
                <Link to="/vendor/VDispatched" className="nav-link">VDispatched</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
             <Switch>
                <Route path="/vendor/VCreateproduct" exact component={VCreateproduct}/>
                <Route path="/vendor/VViewAllproducts" component={VViewAllproducts}/>
                <Route path="/vendor/VTobeDispatched" component={VTobeDispatched}/>
                <Route path="/vendor/VDispatched" component={VDispatched}/>
             </Switch>
      </div>
      </Router>
      )
    }
  }

export default Vendor