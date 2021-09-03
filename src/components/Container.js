import React from 'react';
import { NumSelectConnect } from './NumSelect';
import { ButtonContainer } from './ButtonContainer';
import { DisplayContainer } from './DisplayContainer';
import { connect } from 'react-redux';
import { mapStateToProps } from '../map-state-dispatch';
export { Container };

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
  
  //Connecting our Frame component to redux
  const Container = connect(mapStateToProps)(Frame);