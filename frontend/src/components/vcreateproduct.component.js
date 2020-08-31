import React,{Component} from 'react';
import axios from 'axios';

class VCreateproduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
        NameofProduct: '',
        Quantity:'',
        Price:''
    }

    this.onChangeNameofproduct = this.onChangeNameofproduct.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
}

onChangeNameofproduct(event) {
    this.setState({ NameofProduct: event.target.value });
}

onChangeQuantity(event) {
    this.setState({ Quantity: event.target.value });
}

onChangePrice(event) {
  this.setState({ Price: event.target.value });
}

onSubmit(e) {
    e.preventDefault();

    const newProduct = {
        NameofVendor :  localStorage.getItem("gotname"),
        NameofProduct: this.state.NameofProduct,
        Quantity : this.state.Quantity,
        QuantityRemaining : this.state.Quantity,
        Price : this.state.Price
    }

    console.log(newProduct);
    
    axios.post('http://localhost:4000/createproduct',newProduct)
             .then(res => console.log(res.data));

    this.setState({
        Nameofproduct: '',
        Quatity:'',
        Price:''
    });

  
}

render() {

    return(
        <div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nameofproduct: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.Nameofproduct}
                           onChange={this.onChangeNameofproduct}
                           />
                </div>
                
                <div className="form-group">
                    <label>Quatity: </label>
                    <input type="number" 
                           className="form-control" 
                           value={this.state.Quatity}
                           onChange={this.onChangeQuantity}
                           />  
                </div>
                <div className="form-group">
                    <label>Price: </label>
                    <input type="number" 
                           className="form-control" 
                           value={this.state.Price}
                           onChange={this.onChangePrice}
                           />  
                </div>
                
                <div className="form-group">
                    <input type="submit" value="AddProduct" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
export default VCreateproduct