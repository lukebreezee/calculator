//A Basic JavaScript Calculator Made With React/Redux

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import './index.css';

//Bind keyboard presses to specific action types
document.addEventListener('keypress', value => {
  store.dispatch({type: value.key});
});

//Function called when user clicks on +,-,x,/,=
const finishOperation = (state, actionType) => {
  //Create copy of state
  const tmp = Object.assign({}, state);

  //If an operation has not been chosen before, this is the first time
  if (tmp.opValue == null) {
    tmp.totalValue = parseFloat(tmp.value);
  } else {
      //If opValue variable is not null, an operation was selected and will be carried out.
      switch(tmp.opValue) {
        case '+':
          tmp.totalValue = tmp.totalValue + parseFloat(tmp.value);
          break;
        case '-': 
          tmp.totalValue = tmp.totalValue - parseFloat(tmp.value);
          break;
        case 'x':
        case '*':
          tmp.totalValue = tmp.totalValue * parseFloat(tmp.value)
          break;
        case '÷':
        case '/':
          tmp.totalValue = tmp.totalValue / parseFloat(tmp.value);
          break;
      }
  }

  //If the user clicked on the '=' button...
  if (actionType === '=' || actionType === 'Enter') {
    //The calc's display shows the totalValue variable from the store
    tmp.value = tmp.totalValue.toString();

    //The chain of operations (opValue variable) reverts to null
    tmp.opValue = null;

    //Below variable set to false so that new number clicked clears the display
    tmp.isNewValue = false;
  } else {
    //User must have clicked on +,-,x,/, so the redux store is alerted
    tmp.opValue = actionType;

    //Revert calc display to show '0' for simplicity
    tmp.value = '0';
  }

  return tmp;
};

//The initial state for the redux store
const initialState = {
  value: '0', //Value displayed
  totalValue: 0, //Value that math is performed on when using +,-,x,/
  opValue: null, //The current operation being performed
  isNewValue: true, //If false, a number entered will clear display
  copyPasteHidden: true //Controls the value copy interface
};

//Our redux reducer
const opReducer = (state = initialState, action) => {
  //Creating copy of state
  let tmp = Object.assign({}, state);

  //If user clicks on a number, that number gets appended to the calc's displayed value
  if (!isNaN(action.type)) {
    if (tmp.value.length < 13) {
      //If the = button was just clicked, we want to refresh the calc's state
      if (!tmp.isNewValue && tmp.opValue == null) {
        tmp.value = '0';
        tmp.totalValue = 0;
        tmp.isNewValue = true;
      }
      tmp.value = tmp.value + action.type;
      if (tmp.value[0] === '0') { //Beginning of a non-zero number should not be zero
        tmp.value = tmp.value.slice(1);
      }
    }

    return tmp;
  }

  switch(action.type) {
    //This switch statement handles clicks on all non-number buttons
    //Also handles keyboard presses

    //If operational button clicked, handle it with the operational function
    case '+':
    case '-':
    case 'x':
    case '*':
    case '÷':
    case '/':
    case '=':
    case 'Enter':
      tmp = finishOperation(tmp, action.type);
      break;

    //Percent button converts the displayed value to a 'percentage' by dividing it by 100
    case '%':
      tmp.value = (parseFloat(tmp.value) / 100).toString();
      break;

    //Backspace function removes the last character of the calc's displayed value
    case '⌫':
      tmp.value = tmp.value.slice(0, -1);
      break;

    //Clear entry, but keep the total value for further operations
    case 'CE':
      tmp.value = '0';
      break;
    
    //Clear entry and the total value; a clean slate
    case 'C':
    case 'c':
      tmp.value = '0';
      tmp.totalValue = 0;
    break;

    //Finds the reciprocal of the displayed value
    case '1/x':
      tmp.value = (1 / parseFloat(tmp.value)).toString();
      break;

    //Squares the displayed value
    case 'x²':
      tmp.value = (Math.pow(parseFloat(tmp.value), 2)).toString();

      //Handles too many numbers after decimal point
      const hyphenIndex = tmp.value.indexOf('-');
      if (hyphenIndex !== -1 && hyphenIndex !== 0) {
        tmp.value = tmp.value.slice(hyphenIndex - 1);
      }
      break;

    //Finds square root of displayed value
    case '√x':
      tmp.value = (Math.sqrt(parseFloat(tmp.value))).toString();
      break;

    //Changes signs of the displayed value
    case '+/-':
      tmp.value = (parseFloat(tmp.value) * -1).toString();
      break;
    
    //Appends a decimal point to the displayed value for floating-point arithmetic
    case '.':
      //If there is already a decimal point in the displayed value, don't append another
      if (tmp.value.indexOf('.') === -1) {
        tmp.value = tmp.value + '.';
      }
    break;

    //Shows or hides the copy-value interface
    case 'copyUI':
      tmp.copyPasteHidden = !tmp.copyPasteHidden;
      break;
    
    //Default case for store initialization
    default:
      return state;
  }
  
  //If the user backspaces all numbers, they are left with 0. Display is never empty
  if (tmp.value === '') {
    tmp.value = '0';
  }

  return tmp;
};

//Initialization of redux store
const store = createStore(opReducer);

//Parent component with redux provider
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" />
            <Container store={store} />
        </div>
      </Provider>
    );
  }
}

//Container component
class Frame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="calc-container">
        <NumSelectConnect />
        <div id="calc-back">
          <div id="calc-frame">
            <DisplayContainer />
            <ButtonContainer label="%" />
            <ButtonContainer label="CE" />
            <ButtonContainer label="C" />
            <ButtonContainer label="⌫" />
            <ButtonContainer label="1/x" />
            <ButtonContainer label="x²" />
            <ButtonContainer label="√x" />
            <ButtonContainer label="+" />
            <ButtonContainer label="1" />
            <ButtonContainer label="2" />
            <ButtonContainer label="3" />
            <ButtonContainer label="-" />
            <ButtonContainer label="4" />
            <ButtonContainer label="5" />
            <ButtonContainer label="6" />
            <ButtonContainer label="x" />
            <ButtonContainer label="7" />
            <ButtonContainer label="8" />
            <ButtonContainer label="9" />
            <ButtonContainer label="÷" />
            <ButtonContainer label="+/-" />
            <ButtonContainer label="0" />
            <ButtonContainer label="." />
            <ButtonContainer label="=" />
          </div>
        </div>
      </div>
    );
  }
}

//Action creator for all calc buttons
const actionCreator = action => {
  return {
    type: action
  };
};

//Maps state.value to any component that needs it
const mapStateToProps = state => {
  return {
    value: state.value,
    copyPasteHidden: state.copyPasteHidden
  };
};

//Maps the dispatch to all calc buttons
const mapDispatchButton = dispatch => {
  return {
    storeDispatch: (num) => {
      dispatch(actionCreator(num));
    }
  };
};

//Connecting our Frame component to redux
const Container = connect(mapStateToProps)(Frame);

//Implementation of all calc buttons
class Button extends React.Component {
  constructor(props) {
    super(props);

    //All buttons start out with a background color of white
    this.state = {
      color: '#FFFFFF'
    };

    //Binding functions with the 'this' keyword
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //Self-explanatory event handlers for buttons

  handleMouseOver() {
    this.setState({color: '#FF988D'});
  }
  handleMouseOut() {
    this.setState({color: '#FFFFFF'});
  }
  handleMouseDown() {
    this.setState({color: '#988DFF'})
  }

  //When a button is completely clicked...
  handleClick() {
    //Color goes back to how it was when the button was hovered
    this.setState({color: '#FF988D'});

    if (this.props.label === 'Copy') {
      navigator.clipboard.writeText(this.props.value);
      this.props.storeDispatch('copyUI');
    } else if (this.props.label === 'Cancel') {
      this.props.storeDispatch('copyUI');
    }

    //Dispatch the label of the button to the redux store
    this.props.storeDispatch(this.props.label);
  }

  render() {
    return (
      <div className="calc-button" style={{backgroundColor: this.state.color}} 
      onClick={this.handleClick} onMouseOver={this.handleMouseOver} 
      onMouseOut={this.handleMouseOut} onMouseDown={this.handleMouseDown}>
      {this.props.label}</div>
    );
  }
}

//Connecting the Button component to the redux store
const ButtonContainer = connect(mapStateToProps, mapDispatchButton)(Button);

//Calc's display
class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#FFFFFF'
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMouseOver() {
    this.setState({color: '#F7F7F7'});
  }
  handleMouseOut() {
    this.setState({color: '#FFFFFF'});
  }
  handleMouseDown() {
    this.setState({color: '#EDEDED'});
  }
  
  handleClick() {
    this.setState({color: '#F7F7F7'});

    this.props.storeDispatch('copyUI');
  }

  render() {
    return (
      <div id="display" className="calc-button" style={{backgroundColor: this.state.color}} 
      onClick={this.handleClick} onMouseOver={this.handleMouseOver}
      onMouseOut={this.handleMouseOut} onMouseDown={this.handleMouseDown}>
      {this.props.value}</div>
    );
  }
}

class NumSelect extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('tits');
  }

  render() {
    if (!this.props.copyPasteHidden) {
      return (
        <div id="copy-paste">
          <ButtonContainer label="Copy" />
          <ButtonContainer label="Cancel" />
        </div>
      );
    } else {
      return null;
    }
  }
}

const NumSelectConnect = connect(mapStateToProps, mapDispatchButton)(NumSelect);

//Connects the calc's display to the redux store
const DisplayContainer = connect(mapStateToProps, mapDispatchButton)(Display);

//And, finally, we render our component
ReactDOM.render(
  <App />,
document.getElementById('root')
);