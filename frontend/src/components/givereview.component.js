import React, { Component } from 'react'
import axios from 'axios';
export default class GiveReview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            givenreview : ''
        }

        this.onChangegivenreview = this.onChangegivenreview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangegivenreview(event) {
        this.setState({ givenreview: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const a={
            NameofVendor : this.props.aa.NameofVendor,
            NameofProduct : this.props.aa.NameofProduct,
            givenreview : this.state.givenreview
        }
        console.log(a)
        axios.post('http://localhost:4000/reviewproduct',a)
        .then(
            res => 
            {
                console.log(res.data);
            }
        );

        this.setState({
            givenrating :''
        });
    }
  render() {
    return (
        <div>
            <div>
                <h4>
                Giving review for the Product {this.props.aa.NameofProduct} sold by the vendor {this.props.aa.NameofVendor}
                </h4>
            </div>
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Review: </label>
                <input type="text" 
                       className="form-control" 
                       value={this.state.givenreview}
                       onChange={this.onChangegivenreview}
                       />
            </div>
            <div className="form-group">
                <input type="submit" value="Givereview" className="btn btn-primary"/>
            </div>
        </form>
    </div>
    )
  }
}