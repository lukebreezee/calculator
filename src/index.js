//A Basic JavaScript Calculator Made With React/Redux

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { opReducer } from './reducers';
import { App } from './components/App.js';
import './index.css';
export { initialState };
export { store };

//The initial state for the redux store
const initialState = {
  value: '0', //Value displayed
  totalValue: 0, //Value that math is performed on when using +,-,x,/
  opValue: null, //The current operation being performed
  isNewValue: true, //If false, a number entered will clear display
  copyPasteHidden: true //Controls the value copy interface
};

//Bind keyboard presses to specific action types
document.addEventListener('keypress', value => {
  store.dispatch({type: value.key});
});

//Initialization of redux store
const store = createStore(opReducer);

//Render our parent component
ReactDOM.render(
  <App />,
document.getElementById('root')
);