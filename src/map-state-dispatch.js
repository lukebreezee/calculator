import { actionCreator } from './action-creators';
export { mapStateToProps, mapDispatchButton };

//Maps state.value and copyPasteHidden to any component that needs it
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