import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FormGroup, Label } from 'reactstrap';
import { Container, Row } from 'reactstrap'
import ModalForm from '../Modals/Modal';
const vehicleImage = "data:image/png;base64,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"

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
                <img className="cardimg" src={item.imageUrl==='' ? vehicleImage : item.imageUrl} width="100%" height="50%" alt={item.make} />
                <div className="cardcontent">
                    <h3 className="price" style={{color: "#007bff"}}>{this.state.currency} {parseFloat(item.price * this.state.currentRate).toFixed(2)}</h3>
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