import React, { Component } from 'react'
import axios from 'axios';
import PlaceOrder from './Placeorder.component'

export default class Childsearch extends Component {

    constructor(props){
        super(props);
    this.state = {
         PlaceOrder :false,
         ProductDetails : '',
         ViewVendorrating: false,
         VendorDetails : '',
         ViewProductreviews : false,
         ProductReviews :''
      }

      this.OnSelectOrder = this.OnSelectOrder.bind(this);
      this.OnSelectViewRating = this.OnSelectViewRating.bind(this);
    }

OnSelectOrder(e,currentProduct){
        this.setState({  
            PlaceOrder: !this.state.PlaceOrder , 
            ProductDetails : currentProduct
       });  

    }

OnSelectViewRating(e,currentProduct){
        const a={
            NameofVendor: currentProduct.NameofVendor
        }

         axios.post('http://localhost:4000/getvendorrating',a)
         .then(response => 
             {
                 console.log(response.data[0])
                 this.setState({VendorDetails:response.data[0]})
                //  console.log(VendorDetails)
             })
         .catch(function(error) {
              console.log(error);
           })

        this.setState({ViewVendorrating:true});
    }

OnSelectViewReviews(e,currentProduct) {
    const a={
        NameofVendor: currentProduct.NameofVendor,
        NameofProuct: currentProduct.NameofProuct
    }

    axios.post('http://localhost:4000/getproductreviews',a)
         .then(response => 
             {
                 console.log(response.data)
                 this.setState({ ProductReviews:response.data})
             })
         .catch(function(error) {
              console.log(error);
           })

        this.setState({ViewProductreviews:true});
} 

  render() {
    return (
        <div>
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>NameofVendor</th>
                    <th>Price</th>
                    <th>QuantityRemaining</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            { 
                this.props.Pproducts.map((currentProduct, i) => {
                    return (
                        <tr>
                            <td>{currentProduct.NameofVendor}</td>
                            <td>{currentProduct.Price}</td>
                            <td>{currentProduct.QuantityRemaining}</td>
                            <td>
                                <button onClick={(e) => this.OnSelectOrder(e,currentProduct)}>Place Order</button>
                            </td>
                            <td>
                              <button onClick={(e) => this.OnSelectViewRating(e,currentProduct)}>ViewVendorrating</button>
                            </td>
                            <td>
                              <button onClick={(e) => this.OnSelectViewReviews(e,currentProduct)}>ViewProductreviews</button>
                            </td>
                            
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>

    <div>
        {this.state.PlaceOrder ? <PlaceOrder Pdetails={this.state.ProductDetails}></PlaceOrder>:null}
    </div>
    <div>
        {this.state.ViewVendorrating? 
            <div>
              <h4>
                  The rating of the vendor " {this.state.VendorDetails.username} " is {this.state.VendorDetails.rating/this.state.VendorDetails.NoOfratings}
              </h4>
            </div>
              :null}
    </div>
    </div>
    )
  }
}