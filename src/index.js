import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import { Provider } from 'react-redux';
import allReducers from "./reducers/index.js";
import { createStore } from "redux";


const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
        </Provider>
);

