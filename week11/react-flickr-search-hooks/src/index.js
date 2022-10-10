// 'import' is like the 'require' statement in Ruby
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FlickrSearch from './components/FlickrSearch';

// Redux setup
import { Provider } from'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={ store }>
    <FlickrSearch />
  </Provider>,
  document.getElementById('root')
);
