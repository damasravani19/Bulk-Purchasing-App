import React, { Component } from 'react'
import axios from 'axios';
import RateVendor from './ratevendor.component'
import Givereview from './givereview.component'

export default class ViewPlacedOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      vendorrating: false,
      NameofVendor :'',
      nooforders : false,
      noofordersremaining :'',
      review : false,
      reviewdetails : ''

    }

    this.OnChangePlaced = this.OnChangePlaced.bind(this);
    this.OnChangenooforders = this.OnChangenooforders.bind(this);
}

componentDidMount() {

    const customer ={
        NameofCustomer: localStorage.getItem("customername"),
    }

    console.log(customer)
    axios.post('http://localhost:4000/viewplacedorders' ,customer)
         .then(response => {
             this.setState({orders: response.data});
         })
         .catch(function(error) {
             console.log(error);
         })

}

OnChangePlaced(e,currentProduct){
    this.setState({ vendorrating: true , NameofVendor :currentProduct.NameofVendor});
}

OnChangenooforders(e,currentProduct){
    e.preventDefault();
    this.setState({nooforders:true })
    const b={
        NameofProduct : currentProduct.NameofProduct,
        NameofVendor : currentProduct.NameofVendor
    }
    console.log(b)
    axios.post('http://localhost:4000/getremainingorderdetails' ,b)
         .then(response => {
             console.log(response.data)
             console.log(response.data[0].QuantityRemaining)
             this.setState({ noofordersremaining: response.data[0]});
         })
         .catch(function(error) {
             console.log(error);
         })

}

OnChangeReviewtheproduct(e,currentProduct){
    e.preventDefault();
    this.setState(
        { review: true , 
          reviewdetails :{
              NameofProduct : currentProduct.NameofProduct,
              NameofVendor  : currentProduct.NameofVendor
            }
          });
}
    render() {
      return(
      <div>
        <div>
          { !this.state.vendorrating ?
          <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>NameofProduct</th>
                            <th>NameofVendor</th>
                            <th>QuantityOrdered</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.orders.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.NameofProduct}</td>
                                    <td>{currentProduct.NameofVendor}</td>
                                    <td>{currentProduct.QuantityofOrder}</td>
                                    <td>{currentProduct.StatusofOrder}</td>
                                    <td>
                                      {currentProduct.StatusofOrder==="Placed" ?
                                         <button onClick={(e) => this.OnChangePlaced(e,currentProduct)}>Ratethevendor</button>
                                         : null 
                                      }
                                      {currentProduct.StatusofOrder==="Waiting" ?
                                      <div>
                                         <button onClick={(e) => this.OnChangeWaiting(e,currentProduct)}>EdittheOrder</button>
                                         <button onClick={(e) => this.OnChangenooforders(e,currentProduct)}>NoofOrdersRemainingtogetplaceed</button>
                                     </div>
                                         : null 
                                      }
                                      {currentProduct.StatusofOrder==="Dispatched" ?
                                         <button onClick={(e) => this.OnChangeReviewtheproduct(e,currentProduct)}>ReiviewtheProduct</button>
                                         : null 
                                      }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            : <RateVendor p={this.state.NameofVendor}></RateVendor> }

        </div>
        <div>
            {
                this.state.nooforders ? 
                <h4> The no of orders remaining to get the order placed {this.state.noofordersremaining.QuantityRemaining}</h4>
                : null
            }
        </div>
        <div>
           {
                this.state.review ? 
                <Givereview aa={this.state.reviewdetails}></Givereview>
                : null
            }
        </div>
        </div>
      )
    }
}