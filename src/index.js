import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import CommentsPage from './pages/comments';

ReactDOM.render(
  <Provider store={store}>
    <CommentsPage />
  </Provider>,
  document.getElementById('root')
)
