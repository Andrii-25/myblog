import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Badge, Card, CardBody, CardText } from 'reactstrap';
import AppNavbar from './AppNavbar'; 
import './PostPage.css';

class PostPage extends Component {
  emptyItem = {
    title: '',
    text: '',
    author: '',
    date: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
      this.setState({item: post});
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/post', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/posts');
  }

  render() {
    const {item} = this.state;

    return <div class="page">
      <AppNavbar/>
      <Container>
            <h1 align="center"><Badge color="dark">{item.title}</Badge></h1>
            <Card>
            <CardBody>
              <CardText>{item.text}</CardText>
              </CardBody>
            </Card>
          <div><Badge color="dark">Author: {item.author}, Date of publication: {item.date}</Badge></div>
          <Container>
            <Button color="secondary" tag={Link} to="/posts">Back</Button>
          </Container>
      </Container>
    </div>
  }
}

  

export default withRouter(PostPage);