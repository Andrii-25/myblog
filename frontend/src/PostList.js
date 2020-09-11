import React, { Component } from 'react';
import { Button, ButtonGroup, Table, Card, Container } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './PostList.css';

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {posts: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/posts')
      .then(response => response.json())
      .then(data => this.setState({posts: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPosts = [...this.state.posts].filter(i => i.id !== id);
      this.setState({posts: updatedPosts});
    });
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const postList = posts.map(post => {
      //const text = `${post.text || ' '} ${post.author || ' '} ${post.date || ' '}`;
      return <tr key={post.id}>
        <td>{post.id}</td>
        <td style={{whiteSpace: 'nowrap'}}>{post.title}</td>
        <td>{post.author}</td>
        <td>{post.date}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="info" tag={Link} to={"/more/" + post.id}>See more</Button>
            <Button size="sm" color="primary" tag={Link} to={"/posts/" + post.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(post.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div className="list">
        <AppNavbar/>
        <Container>
          <div className="float-right">
            <Button color="success" tag={Link} to="/posts/new">Add Post</Button>
          </div>
          <h3>My Post List</h3>
          <Card>
          <Table bordered>
            <thead>
            <tr>
              <th width="20%">Id</th>
              <th width="20%">Title</th>
              <th width="20%">Author</th>
              <th width="20%">Date</th>
              <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {postList}
            </tbody>
          </Table>
          </Card>
        </Container>
      </div>
    );
  }
}

export default PostList;