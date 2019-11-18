import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

class App extends Component {
  render() {
        return (
            // <div className="jumbotron">
                <div className="container">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                </div>
            // </div>
        );
    }
}

export default App;