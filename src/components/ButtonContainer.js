import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchButton } from '../map-state-dispatch';
export { ButtonContainer };

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