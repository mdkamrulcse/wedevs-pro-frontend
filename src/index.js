import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.scss';

import * as serviceWorker from './serviceWorker';
import 'rc-pagination/assets/index.css';
import ErrorBoundary from "./utilities/errors/ErrorBoundary";

import App from "./App";

ReactDOM.render(
    <ErrorBoundary>
        <App/>
    </ErrorBoundary>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
