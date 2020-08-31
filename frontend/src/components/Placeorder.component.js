import React, { Component } from 'react'
import axios from 'axios';

export default class PlaceOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            QuantityRequired:'',
            error : false
        }
        this.onChangeQuantityRequired = this.onChangeQuantityRequired.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeQuantityRequired(event){
        this.setState({ QuantityRequired: event.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const newOrder = {
            NameofProduct : this.props.Pdetails.NameofProduct,
            NameofVendor : this.props.Pdetails.NameofVendor,
            NameofCustomer : localStorage.getItem("customername"),
            QuantityRemaining : this.props.Pdetails.QuantityRemaining -this.state.QuantityRequired,
            StatusofProduct :'Waiting',
            QuantityOrdered : this.state.QuantityRequired
        }

        const InsertOrder = {
            NameofProduct : this.props.Pdetails.NameofProduct,
            NameofVendor : this.props.Pdetails.NameofVendor,
            NameofCustomer : localStorage.getItem("customername"),
            StatusofProduct :'Waiting',
            QuantityofOrder : this.state.QuantityRequired
        }
        console.log(newOrder);
        if (newOrder.QuantityRemaining > -1)
        {
         //changes the quantity remaining in the product table
         axios.post('http://localhost:4000/placeorder',newOrder)
             .then(
                 res => 
                 {
                     console.log(res.data);
                 }
             );
         axios.post('http://localhost:4000/addorder',InsertOrder)
             .then(
                res => 
               {
                   console.log(res.data);
               }
             );
        }
        else 
        {
            this.setState({
                error: true
            });
        }


    }
  render() {
    return (
      <div>
        <h3>PLACE ORDER</h3>
        <h4>Product details</h4>
         <h6> {this.props.Pdetails.NameofProduct}, {this.props.Pdetails.QuantityRemaining}</h6>
        <div>
                <form onSubmit={this.onSubmit}>                   
                <div className="form-group">
                    <label>Quatity: </label>
                    <input type="number" 
                           className="form-control" 
                           value={this.state.QuantityRequired}
                           onChange={this.onChangeQuantityRequired}
                           />  
                </div>
                    <div className="form-group">
                        <input type="submit" value="PlaceOrder" className="btn btn-primary"/>
                    </div>
                </form>
        </div>

        <div>
            {this.state.error ? <h6>Entered a Quantity which is more than remaining.Please reduce the Quantity</h6> : null}
        </div>

      </div>
    )
  }
}