import { initialState } from ".";
import { finishOperation, handleFloat } from "./helper-functions";
export { opReducer };

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

        //Handles too many numbers after decimal point
        handleFloat(tmp);
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
        handleFloat(tmp);
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