import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import axios from 'axios';

import Vendor from './vendor.component';
import Customer from './customer.component';

export default class LoginUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password:'',
            user_type:''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password : this.state.password
        }

        console.log(newUser);
        axios.post('http://localhost:4000/login',newUser)
             .then(
                 res => 
                 {
                     if(res.data[0].user_type==="Vendor")
                     {
                        window.location= '/vendor';
                        localStorage.setItem("gotname",newUser.username);
                        console.log("register",localStorage.getItem("gotname"));
                     }
                     else if (res.data[0].user_type==="Customer")
                     {
                        window.location= '/customer';
                        localStorage.setItem("customername",newUser.username);
                        console.log("register",localStorage.getItem("customername"));
                     }
             
                 }
             );

        this.setState({
            username: '',
            password:'',
        });

      
    }

    render() {

        return(
            <Router>
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>

            
        <Route path="/vendor" component={Vendor}/>
        <Route path="/customer" component={Customer}/>

        </Router>
        )
    }
}