import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FormGroup, Label } from 'reactstrap';
import { Container, Row } from 'reactstrap'
import ModalForm from '../Modals/Modal';

class Card extends Component {
  state = {
    currency: 'ZAR',
    currentRate: 1
  }



  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')

    if(confirmDelete){
      fetch('/vehicles/' + id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  handleCurrency= e =>{
    this.setState({currency: e.target.value})
    fetch('https://api.exchangeratesapi.io/latest?base=ZAR')
      .then(response => response.json())
      .then(items => items.rates[this.state.currency])
      .then(value => this.setState({currentRate: value}))
      .catch(err => console.log(err))
  }

  render() {

    const items = this.props.items.map((item, key) => {
      return (
            <div key={'col-'+ key} className="col-md-4 col-sm-12" style={{marginBottom: "30px"}}>
                <img className="cardimg" src="https://googleplus-covers.com/covers/nature_balloon_ride.jpg" width="100%" height="50%" alt={item.make} />
                <div className="cardcontent">
                    <h3 className="price" style={{color: "#007bff"}}>{this.state.currency} {item.price * this.state.currentRate}</h3>
                    <p>{item.make} - {item.model}</p>
                    <p>Year: {item.year}</p>
                    <p>Mileage: {item.mileage} KM</p>
                </div>
                <div className="cardfooter">
                    <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                    {' '}
                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
                </div>
            </div>
        )
      })

    return (
        <Container className="App">
               <Row style={{marginLeft: "0px"}}>
                  <FormGroup>
                    <Label for="price">Currency </Label>
                    <select className="form-control" id="currency"  onChange={this.handleCurrency} value={this.state.currency}>
                      <option value="ZAR">ZAR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </FormGroup>
              </Row>
            <Row>
                {items}
            </Row>
        </Container>
    )
  }
}

export default Card