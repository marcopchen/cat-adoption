import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';

import PostDetails from './PostDetails';
import PostForm from './PostForm';

import { Post, PostStore } from '../reducers/postReducer';
import { updatePost, deletePost } from '../actions/postActions';

interface PostProps extends RouteComponentProps {
  updatePost: (post: Post) => void;
  deletePost: (id: string) => void;
  post?: Post;
};

interface PostState {
  showPostForm: boolean;
  name: string;
  age: string;
  breed: string;
  favorite: string;
  disposition: string;
};

class PostPage extends Component<PostProps, PostState> {
  state = {
    showPostForm: false,
    name: (this.props.post && this.props.post.name) || '',
    age: (this.props.post && this.props.post.age && this.props.post.age.toString()) || '',
    breed: (this.props.post && this.props.post.breed) || '',
    favorite: (this.props.post && this.props.post.favorite) || '',
    disposition: (this.props.post && this.props.post.disposition) || ''
  }

  render() {
    const { post, history } = this.props;

    if (!post || !post.id) {
      return (
        <div>
          <h1 tabIndex={0}>{'Cat Not Found'}</h1>
          <div style={{ marginLeft: 20, marginRight: 20, maxWidth: 400 }}>
            <Link to={'/'} aria-label={'home page with cat listing'}>
              <h3>{'Home'}</h3>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h1 tabIndex={0}>{'Cat for Adoption - ' + post.name}</h1>
        <div style={{ marginLeft: 20, marginRight: 20, maxWidth: 400 }}>
          <Link to={'/'} aria-label={'home page with cat listing'}>
            <h3>{'Home'}</h3>
          </Link>
          <img
            src={post.image}
            alt={'profile picture of cat named ' + post.name}
            style={{ height: 150, width: 150 }}
          />
          {!this.state.showPostForm ?
            <PostDetails
              submitPost={this.submitPost}
              name={post.name}
              age={post.age.toString()}
              disposition={post.disposition}
              breed={post.breed}
              favorite={post.favorite}
            /> :
            <PostForm
              changeField={this.changeField}
              submitPost={this.submitPost}
              name={this.state.name}
              age={this.state.age}
              disposition={this.state.disposition}
              breed={this.state.breed}
              favorite={this.state.favorite}
            />}
          <button
            aria-label={'delete post and navigate to home page'}
            onClick={() => {
              history.push('/');
              this.props.deletePost(post.id)
            }}
          >
            {'Delete Post'}
          </button>
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
    const { post } = this.props;
    if (!showPostForm) {
      this.setState({ showPostForm: true });
    } else if (!post || !post.id) {
      this.setState({ showPostForm: false });
      throw new Error('Post could not be updated.');
    } else {
      const image = post.image || 'https://cdn2.thecatapi.com/images/41n.jpg';
      this.props.updatePost({
        name,
        age: Number(age),
        disposition,
        breed,
        favorite,
        image,
        id: post.id
      });
      this.setState({ showPostForm: false });
    }
  }
}

const mapStateToProps = (state: { posts: PostStore }, ownProps: RouteComponentProps<{ id: string }>) => {
  const post = state.posts.items.find((item: Post) => item.id === ownProps.match.params.id);
  return { post };
};

export default connect(mapStateToProps, { updatePost, deletePost })(PostPage);
