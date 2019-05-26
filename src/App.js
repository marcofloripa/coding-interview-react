import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProblemList from './components/ProblemList';
import ProblemEdit from './components/ProblemEdit'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/problems' exact={true} component={ProblemList}/>
          <Route path='/problems/:id' component={ProblemEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;