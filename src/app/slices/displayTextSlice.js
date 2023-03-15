const INITIAL_DISPLAY_TEXT = {
  input: "",
  result: "",
};

const SET_INPUT = "set_input";
const SET_RESULT = "set_result";
const SET_DISPLAY_TEXT = "set_display_text";
const RESET_DISPLAY = "reset_display";
const POWER_OFF = "power_off"

const setInput = (newInput) => {
  return {
    type: SET_INPUT,
    payload: newInput
  }
};
const setResult = (newResult) => {
  return {
    type: SET_RESULT,
    payload: newResult
  }
};
const setDisplayText = (displayText) => {
  return {
    type: SET_DISPLAY_TEXT,
    payload: {
      input: displayText.input,
      result: displayText.result
    }
  }
};
const resetDisplay = () => {
  return {
    type: RESET_DISPLAY,
    payload: {
      ...INITIAL_DISPLAY_TEXT,
      result: "0"
    }
  }
};
const powerOff = () => {
  return {
    type: POWER_OFF,
    payload: {
      ...INITIAL_DISPLAY_TEXT
    }
  };
};
const displayTextReducer = (state = { ...INITIAL_DISPLAY_TEXT }, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        input: action.payload
      };
    case SET_RESULT:
      return {
        ...state,
        result: action.payload
      };
    case SET_DISPLAY_TEXT:
    case RESET_DISPLAY:
    case POWER_OFF:
      return action.payload;
    default:
      return state;
  }
};



export { setInput, setResult, setDisplayText, resetDisplay, powerOff };
export default displayTextReducer;