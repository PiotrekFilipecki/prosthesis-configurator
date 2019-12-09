import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import mainReducer from './reducers';
import App from './App';

import './scss/main.css';

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>, document.getElementById('creatorApp'));
