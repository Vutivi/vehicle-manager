import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Modals/Modal'
import Card from './Cards/Card'
import { UserService } from './UserService'

class HomePage extends Component {
  state = {
    items: []
  }

  getItems(){
    fetch('/vehicles/user/' +  JSON.parse(localStorage.getItem('user')).id)
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  onLogoutClick = e => {
    e.preventDefault();
    UserService.logout();
    this.props.history.push('/');
  };

  render() {

    return (
      <Container>
        <Col>
          <h1 style={{margin: "20px 0"}}>Vehicle manager</h1>
        </Col>
        <Row style={{marginLeft: "16px"}}>
            <button
              onClick={this.onLogoutClick}
              className="btn btn-danger"
            >
              Logout
            </button>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
        </Row>
  
        <Row style={{margin: "20px 0"}}>
            <Card items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
        </Row>
      </Container>
    )
  }
}


export default HomePage