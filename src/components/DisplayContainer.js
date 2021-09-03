import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchButton } from '../map-state-dispatch';
export { DisplayContainer };

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
  
  //Connects the calc's display to the redux store
  const DisplayContainer = connect(mapStateToProps, mapDispatchButton)(Display);