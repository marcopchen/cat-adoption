import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';

import Posts from './components/Posts';
import Post from './components/Post';

import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Posts} />
          <Route path='/:id' exact component={Post} />
          <Route path='/' render={() => <div>{'404'}</div>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
