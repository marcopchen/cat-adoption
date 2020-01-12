import { Dispatch } from 'redux';
import {
  FETCH_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from './types';
import { Post } from '../reducers/postReducer';

const cats = [
  { name: 'Scotty', age: Math.floor((Math.random() * 10) + 1), breed: 'collie', favorite: 'bacon', disposition: 'friendly' },
  { name: 'Lucky', age: Math.floor((Math.random() * 10) + 1), breed: 'retriever', favorite: 'jelly', disposition: 'funny' },
  { name: 'Terry', age: Math.floor((Math.random() * 10) + 1), breed: 'beagle', favorite: 'steak', disposition: 'angry' },
  { name: 'Jazzy', age: Math.floor((Math.random() * 10) + 1), breed: 'terrier', favorite: 'apple', disposition: 'silly' },
  { name: 'Nappy', age: Math.floor((Math.random() * 10) + 1), breed: 'husky', favorite: 'chocolate', disposition: 'lazy' }
]

export const fetchPosts = () => (dispatch: Dispatch) => {
  fetch('https://api.thecatapi.com/v1/images/search?limit=5&mime_types=jpg', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => {
      const posts = data.map((post: { id: string, url: string }, index: number) => {
        const { id, url } = post;
        return { ...cats[index], id, image: url };
      });

      return dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    });
};

export const addPost = (post: Post) => (dispatch: Dispatch) => {
  dispatch({
    type: ADD_POST,
    payload: post
  });
};

export const updatePost = (post: Post) => (dispatch: Dispatch) => {
  dispatch({
    type: UPDATE_POST,
    payload: post
  });
};

export const deletePost = (id: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DELETE_POST,
    payload: id
  });
};
