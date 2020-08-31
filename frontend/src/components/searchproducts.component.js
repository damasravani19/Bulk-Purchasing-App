import React, { Component } from 'react'
import axios from 'axios';
import Childsearch from './Childsearch.component'

export default class SearchProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
         products: [],
         NameofProduct:'',
         Sortby : ''
      }

        this.onChangeNameofProduct = this.onChangeNameofProduct.bind(this);
        this.onChangeSortby = this.onChangeSortby.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
}

onChangeNameofProduct(event) {
  this.setState({ NameofProduct: event.target.value });
}

onChangeSortby(event) {
  this.setState({ Sortby: event.target.value });
}

onSubmit(e) {
  e.preventDefault();

  const searchproduct = {
      NameofProduct: this.state.NameofProduct,
      Sortby : this.state.Sortby
  }

  console.log(searchproduct);
  axios.post('http://localhost:4000/searchproducts',searchproduct)
      .then(response => 
            {
                console.log(response.data)
                this.setState({products: response.data});

            })
      .catch(function(error) {
              console.log(error);
        })


}
  render() {
    return (
    <div>
        <div>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="text" placeholder="Search for products"
                       className="form-control" 
                       value={this.state.NameofProduct}
                       onChange={this.onChangeNameofProduct}
                       />
            </div>

            <div className="form-group">
                <label>Sortby: </label>
                <input type="text" placeholder="Price or QuantityLeft or RatingOfVendor"
                       className="form-control" 
                       value={this.state.Sortby}
                       onChange={this.onChangeSortby}
                       />
            </div>
            
            <div className="form-group">
                <input type="submit" value="Search" className="btn btn-primary"/>
            </div>
        </form>
        </div>

        <div>
          <Childsearch Pproducts= {this.state.products}></Childsearch>
        </div>
      
    </div>
    )
  }
}