import React from 'react';
import { connect } from 'react-redux';
import { ButtonContainer } from './ButtonContainer';
import { mapStateToProps, mapDispatchButton } from '../map-state-dispatch';
export { NumSelectConnect };

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