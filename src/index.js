import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import PostNew from "./PostNew/postNew";
import registerServiceWorker from './registerServiceWorker';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: App },
  childRoutes: [
    {
      path: 'new',
      component: PostNew
    }
  ]

}
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('root')
);
registerServiceWorker();
