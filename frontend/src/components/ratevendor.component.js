import React, { Component } from 'react'
import axios from 'axios';

export default class RateVendor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            givenrating : ''
        }

        this.onChangegivenrating = this.onChangegivenrating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangegivenrating(event) {
        this.setState({ givenrating: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const a={
            NameofVendor : this.props.p,
            givenrating : this.state.givenrating
        }
        console.log(a)
        axios.post('http://localhost:4000/ratevendor',a)
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
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Rating: </label>
                <input type="number" 
                       className="form-control" 
                       value={this.state.givenrating}
                       onChange={this.onChangegivenrating}
                       />
            </div>
            <div className="form-group">
                <input type="submit" value="Rate" className="btn btn-primary"/>
            </div>
        </form>
    </div>
    )
  }
}