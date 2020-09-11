import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, Card, Container, Badge } from 'reactstrap';
import AppNavbar from './AppNavbar';
import './PostEdit.css';

class PostEdit extends Component {

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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const post = await (await fetch(`/api/post/${this.props.match.params.id}`)).json();
      this.setState({item: post});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
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
    const title = <h1><Badge color="dark">{item.id ? 'Edit Post' : 'Add Post'}</Badge></h1>;

    return <div className="edit">
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="title"><Badge color="dark">Title</Badge></Label>
            <Input type="text" name="title" id="title" value={item.title || ''}
                   onChange={this.handleChange} autoComplete="title"/>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText"><Badge color="dark">Text</Badge></Label>
            <Input xs="auto" type="textarea" name="text" id="exampleText" value={item.text || ''}
                   onChange={this.handleChange} autoComplete="text-level1"/>
          </FormGroup>
          <FormGroup>
            <Label for="author"><Badge color="dark">Author</Badge></Label>
            <Input type="text" name="author" id="author" value={item.author || ''}
                   onChange={this.handleChange} autoComplete="text-level1"/>
          </FormGroup>
          <div className="row">
            <FormGroup className="col-md-4 mb-3">
              <Label for="date"><Badge color="dark">Date</Badge></Label>
              <Input type="text" name="date" id="date" value={item.date || ''}
                     onChange={this.handleChange} autoComplete="text-level1"/>
            </FormGroup>
          </div>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/posts">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PostEdit);
