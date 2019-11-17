import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    userId: '',
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8000/vehicles', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        mileage: this.state.mileage,
        price: this.state.price,
        userId: this.state.userId
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/vehicles/' + this.state.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        mileage: this.state.mileage,
        price: this.state.price,
        userId: this.state.userId
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, make, model, year, mileage, price, userId } = this.props.item
      this.setState({ id, make, model, year, mileage, price, userId })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="make">Make</Label>
          <Input type="text" name="make" id="make" onChange={this.onChange} value={this.state.make === null ? '' : this.state.make} />
        </FormGroup>
        <FormGroup>
          <Label for="model">Model</Label>
          <Input type="text" name="model" id="model" onChange={this.onChange} value={this.state.model === null ? '' : this.state.model}  />
        </FormGroup>
        <FormGroup>
          <Label for="year">Year</Label>
          <Input type="year" name="year" id="year" onChange={this.onChange} value={this.state.year === null ? '' : this.state.year}  />
        </FormGroup>
        <FormGroup>
          <Label for="mileage">Mileage(in KM)</Label>
          <Input type="text" name="mileage" id="mileage" onChange={this.onChange} value={this.state.mileage === null ? '' : this.state.mileage}  placeholder="80" />
        </FormGroup>
        <FormGroup>
        <Label for="user id">user id</Label>
          <Input type="text" name="userId" id="userId" onChange={this.onChange} value={this.state.userId === null ? '' : this.state.userId} />
        </FormGroup>
        <FormGroup>
          <Label for="price">price(in ZAR)</Label>
          <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  placeholder="100" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm