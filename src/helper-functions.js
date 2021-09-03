export { finishOperation, handleFloat };

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

//Handles too many numbers after decimal point
const handleFloat = state => {
    const hyphenIndex = state.value.indexOf('-');
    if (hyphenIndex !== -1 && hyphenIndex !== 0) {
        state.value = state.value.slice(hyphenIndex - 1);
    }
};