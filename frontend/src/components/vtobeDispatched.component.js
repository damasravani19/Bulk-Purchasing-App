import React,{Component} from 'react';
import axios from 'axios';

class VTobeDispatched extends Component {
  constructor(props) {
    super(props);
    this.state = {
        products: []
    }
}

componentDidMount() {

    const p={
        QuantityRemaining:0,
        currentstatus : "Tobesold"
    }

    axios.post('http://localhost:4000/changestatustotobedispatched',p)
            .then(response => {
                 console.log(response.data)
                })
            .catch(function(error) {
                 console.log(error);
                })
    const vendor ={
        NameofVendor: localStorage.getItem("gotname"),
        Status : "Tobedispatched"
    }

    console.log(vendor)
    axios.post('http://localhost:4000/tobedispatchedproducts' ,vendor)
         .then(response => {
             this.setState({products: response.data});
             response.data.map((c,i)=>{

                 const q ={ 
                     NameofProduct : c.NameofProduct,
                     NameofVendor : c.NameofVendor,
                     StatusofOrder : "Waiting"
                 }
                 console.log(q)
                 axios.post('http://localhost:4000/changeorderstatustoplaced' ,q)
                 .then(response => console.log(response.data))
                 .catch(function(error) {
                    console.log(error);
                })

             })
         })
         .catch(function(error) {
             console.log(error);
         })

}


OnChangestate(e,currentProduct) {
   e.preventDefault();
   console.log(currentProduct) ;
   
   const ModifiedProduct = {
     NameofVendor : localStorage.getItem("gotname"),
     NameofProduct  : currentProduct.NameofProduct
   }
   console.log(ModifiedProduct)
   axios.post('http://localhost:4000/changestatus' , ModifiedProduct)
         .then(response => {
             console.log(response.data);
         })
         .catch(function(err) {
             console.log(err);
         })

    axios.post('http://localhost:4000/changestatusofordertodispatched' , ModifiedProduct)
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
                                  <td>
                                    <button onClick={(e) => this.OnChangestate(e,currentProduct)} variant="success">Dispatch</button>
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

export default VTobeDispatched