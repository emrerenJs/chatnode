import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Chat from './components/Chat'


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/chat" component={Chat}/>
          <PublicRoute exact path="/" component={Login}/>
        </Switch >
      </Router >
    )
  }
}

export default App;
