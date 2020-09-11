import React, { Component } from 'react';
import './App.css';
import './Home.css';
import AppNavbar from './AppNavbar';
import { Button } from 'reactstrap';

class Home extends Component {

  render() {
    return (
      <div class="parent">
      <AppNavbar></AppNavbar>
        <div class="child">
          <Button color="primary" size="lg" href="/posts">Manage Posts</Button>
          </div>
        </div>
    );
  }
}

export default Home;