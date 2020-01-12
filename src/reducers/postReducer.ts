import {
  FETCH_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from '../actions/types';
import { AnyAction } from 'redux';

export interface Post {
  id: string;
  name: string;
  age: number;
  breed: string;
  favorite: string;
  disposition: string;
  image: string;
}

export interface PostStore {
  items: Post[];
  item: Post;
}

const initialState = {
  items: []
};

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        items: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case UPDATE_POST:
      return {
        ...state,
        items: [...state.items.filter((item: Post) => item.id !== action.payload.id), action.payload]
      };
    case DELETE_POST:
      return {
        ...state,
        items: state.items.filter((item: Post) => item.id !== action.payload)
      };
    default:
      return state;
  }
}
