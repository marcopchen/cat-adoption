import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostForm from './PostForm';

import { Post, PostStore } from '../reducers/postReducer';
import { fetchPosts, addPost } from '../actions/postActions';

interface PostsProps {
  fetchPosts: () => void;
  addPost: (post: Post) => void;
  posts: Post[];
};

interface PostsState {
  showPostForm: boolean;
  name: string;
  age: string;
  breed: string;
  favorite: string;
  disposition: string;
  image: string;
};

class PostsPage extends Component<PostsProps, PostsState> {
  state = {
    showPostForm: false,
    name: '',
    age: '',
    breed: '',
    favorite: '',
    disposition: '',
    image: ''
  }

  componentDidMount() {
    if (!this.props.posts || !this.props.posts.length) {
      this.props.fetchPosts();
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          src={post.image}
          alt={'profile picture of cat named ' + post.name}
          style={{ height: 120, width: 120, marginRight: 20 }}
        />
        <div>
          <Link to={'/' + post.id} aria-label={'details page for cat named ' + post.name}>
            <h3>{post.name}</h3>
          </Link>
          <p>{'Age: ' + post.age + ' year(s) old'}</p>
          <p>{'Disposition: ' + post.disposition}</p>
        </div>
      </div>
    ));

    return (
      <div>
        <h1 tabIndex={0}>{'Cats for Adoption'}</h1>
        <div style={{ marginLeft: 20, marginRight: 20, maxWidth: 400 }}>
          {postItems}
          {!this.state.showPostForm ?
            <button
              aria-label={'open form to create cat adoption post'}
              onClick={this.submitPost}
            >
              {'Add New Post'}
            </button> :
            <PostForm
              changeField={this.changeField}
              submitPost={this.submitPost}
              name={this.state.name}
              age={this.state.age}
              disposition={this.state.disposition}
              breed={this.state.breed}
              favorite={this.state.favorite}
            />}
        </div>
      </div>
    );
  }

  changeField = (event: { target: { name: string, value: string } }) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'age':
        this.setState({ age: value });
        break;
      case 'disposition':
        this.setState({ disposition: value });
        break;
      case 'breed':
        this.setState({ breed: value });
        break;
      case 'favorite':
        this.setState({ favorite: value });
        break;
    }
  }

  submitPost = () => {
    const {
      name, age, disposition, breed, favorite, showPostForm
    } = this.state;
    if (!showPostForm) {
      this.setState({ showPostForm: true });
    } else {
      this.setState({ showPostForm: false });
      this.props.addPost({
        name,
        age: Number(age),
        disposition,
        breed,
        favorite,
        image: 'https://cdn2.thecatapi.com/images/41n.jpg',
        id: Date.now() + name
      });
    }
  }
}

const mapStateToProps = (state: { posts: PostStore }) => ({
  posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts, addPost })(PostsPage);
