// 'import' is like the 'require' statement in Ruby
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FlickrSearch from './components/FlickrSearch';


ReactDOM.render(
  <FlickrSearch />,
  document.getElementById('root')
);
