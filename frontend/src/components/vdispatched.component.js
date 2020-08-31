import React,{Component} from 'react';
import axios from 'axios';

class VDispatched extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []}
}

componentDidMount() {

    const vendor ={
        NameofVendor: localStorage.getItem("gotname"),
        Status : "Dispatched"
    }

    console.log(vendor)
    axios.post('http://localhost:4000/dispatchedproducts' ,vendor)
         .then(response => {
             this.setState({products: response.data});
         })
         .catch(function(error) {
             console.log(error);
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

export default VDispatched