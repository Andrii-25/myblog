import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import PostEdit from './PostEdit';
import PostPage from './PostPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/posts' exact={true} component={PostList}/>
          <Route path='/posts/:id' component={PostEdit}/>
          <Route path='/more/:id' component={PostPage}/>
        </Switch>
      </Router>
    )
  }
}

export default App;