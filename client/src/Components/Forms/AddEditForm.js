import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import S3 from './Config/DigitalOcean'
import Config from './Config/Config'

class AddEditForm extends React.Component {
   
    state = {
        id: 0,
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        userId: JSON.parse(localStorage.getItem('user')).id,
        imageUrl: ''
    }


    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitFormAdd = e => {
        e.preventDefault()
        fetch('/vehicles', {
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
            userId: this.state.userId,
            imageUrl: this.state.imageUrl
        }),
        })
        .then(response => response.json())
        .then(item => {
            this.props.addItemToState(item);
            this.props.toggle();
        })
        .catch(err => console.log(err))
    }

    submitFormEdit = e => {
        e.preventDefault()
        fetch('/vehicles/' + this.state.id, {
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
            userId: this.state.userId,
            imageUrl: this.state.imageUrl
        }),
        })
        .then(response => response.json())
        .then(item => {
            this.props.updateState(item);
            this.props.toggle();
        })
        .catch(err => console.log(err))
    }

    handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const blob = e.target.files[0];
          const params = { Body: blob, 
                           Bucket: Config.bucketName, 
                           Key: blob.name};
           // Sending the file to the Spaces
           S3.putObject(params)
             .on('build', request => {
               request.httpRequest.headers.Host = Config.digitalOceanSpaces;
               request.httpRequest.headers['Content-Length'] = blob.size;
               request.httpRequest.headers['Content-Type'] = blob.type;
               request.httpRequest.headers['x-amz-acl'] = 'public-read';
               request.httpRequest.headers['Access-Control-Allow-Origin'] = '*';
            })
            .send((err) => {
              if (err){
                  console.log(err)
              }
              else {
              // If there is no error updating the editor with the imageUrl
                const imageUrl = Config.digitalOceanSpaces + blob.name
                this.setState({imageUrl: imageUrl});
             }
          });
        }
    };

    componentDidMount(){
        // if item exists, populate the state with proper data
        if(this.props.item){
        const { id, make, model, year, mileage, price, userId, imageUrl } = this.props.item
        this.setState({ id, make, model, year, mileage, price, userId, imageUrl })
        }
    }

    render() {

        return (
        <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} encType="multipart/form-data">
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
            <Input type="hidden" name="userId" id="userId" onChange={this.onChange} value={this.state.userId === null ? '' : this.state.userId} />
            </FormGroup>
            <FormGroup>
                <Input type="hidden" name="imageUrl" id="imageUrl" onChange={this.onChange} value={this.state.imageUrl === null ? '' : this.state.imageUrl} />
            </FormGroup>
            <FormGroup>
            <Label for="price">price(in ZAR)</Label>
            <Input type="text" name="price" id="price" onChange={this.onChange} value={this.state.price === null ? '' : this.state.price}  placeholder="100" />
            </FormGroup>
            <FormGroup>
                <Label for="image">Image</Label>
                <Input type="file" id="inputfile" accept="image/*" onChange={this.handleImageChange} />            
            </FormGroup>
            <Button>Submit</Button>
        </Form>
        );
    }
}

export default AddEditForm