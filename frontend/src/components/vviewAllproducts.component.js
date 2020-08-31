import React,{Component} from 'react';
import axios from 'axios';

class VViewAllproducts extends Component {

  constructor(props) {
    super(props);
    this.state = {products: []}
}

componentDidMount() {

    const vendor ={
        NameofVendor: localStorage.getItem("gotname"),
        Status : "Tobesold"
    }

    console.log(vendor)
    axios.post('http://localhost:4000/allproducts' ,vendor)
         .then(response => {
             this.setState({products: response.data});
         })
         .catch(function(error) {
             console.log(error);
         })

}

OnChangecancel(e,currentProduct){
    e.preventDefault();
    const ModifiedProduct = {
        NameofVendor : localStorage.getItem("gotname"),
        NameofProduct  : currentProduct.NameofProduct
      }
      console.log(ModifiedProduct)
      axios.post('http://localhost:4000/changestatustocancelled' , ModifiedProduct)
            .then(response => {
                console.log(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })

      axios.post('http://localhost:4000/changestatusofordertocancelled' , ModifiedProduct)
            .then(response => {
                console.log(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })
            
}
    render() {
      return(
          <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>NameofProduct</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Customers</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentProduct, i) => {
                            return (
                                <tr>
                                    <td>{currentProduct.NameofProduct}</td>
                                    <td>{currentProduct.Price}</td>
                                    <td>{currentProduct.Quantity}</td>
                                    <td>{currentProduct.Status}</td>
                                    <td>{currentProduct.Customers}</td>
                                    <td>
                                       <button onClick={(e) => this.OnChangecancel(e,currentProduct)}>cancel</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
      )
    }
  }

export default VViewAllproducts