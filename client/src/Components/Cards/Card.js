import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap'
import ModalForm from '../Modals/Modal';

class Card extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')

    if(confirmDelete){
      fetch('http://localhost:8000/vehicles/' + id, {
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

  render() {

    const items = this.props.items.map(item => {
      return (
        <Col className="col-md-3 col-sm-12">
            <div className="card">
                <img className="cardimg" src="https://googleplus-covers.com/covers/nature_balloon_ride.jpg" width="100%" height="50%" alt={item.make} />
                <div className="cardcontent">
                    <h3 className="price" style={{color: "#007bff"}}>R{item.price}</h3>
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
        </Col>
        )
      })

    return (
        <Container className="App">
            <Row>
                {items}
            </Row>
        </Container>
    )
  }
}

export default Card