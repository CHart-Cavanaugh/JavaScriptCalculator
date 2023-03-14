import { combineReducers } from "redux";
import { legacy_createStore } from "redux";
import { useState, useEffect, StrictMode } from 'react';
import { connect, Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const createStore = legacy_createStore;



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

const rootReducer = combineReducers({
  displayText: displayTextReducer,
});

const store = createStore(rootReducer);



const CalculatorDisplay = (props) => {

  return (

    <div id="calculator-screens" class="text-end">
      <p
        class="display-input border border-dark border-1 rounded-1"
      >
        {props.displayText.input}
      </p>
      <p
        id="display"
        class="display-result border border-dark border-1 rounded-1"
      >
        {props.displayText.result}
      </p>
    </div>

  );

};

const PowerBtn = (props) => {

  const handleClick = () => {

    const updateDisplay = () => {
      if (props.displayText.result !== "")
        props.powerOff();
      else
        props.resetDisplay(); //power on
    };



    updateDisplay();

  };



  useEffect(() => {
    props.resetDisplay(); //power on
  }, []);



  return (

    <button
      id="power-btn"
      key="btn-power"
      class="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      Power
    </button>

  );

};
const ClearBtn = (props) => {

  const handleClick = () => {

    const updateDisplay = () => {
      if (props.displayText.result !== "0")
        props.resetDisplay();
    };



    updateDisplay();

  };



  return (

    <button
      id="clear"
      key="btn-clear"
      class="btn border border-dark border-1"
      onClick={() => {
        handleClick()
      }}
    >
      AC
    </button>

  );

};
const DecimalBtn = (props) => {

  const handleClick = () => {

    const displayInput = props.displayText.input;

    const lastCharIsEquals = () => {
      return displayInput[displayInput.length - 1] === "=";
    };
    const lastCharIsNum = () => {
      return displayInput[displayInput.length - 1].match(/[0-9]/) !== null;
    };
    const lastCharIsDecimal = () => {
      return displayInput[displayInput.length - 1].match(/[.]/) !== null;
    };
    const lastNumHasDecimal = () => {
      const displayNums = displayInput.match(/[0-9]+[.]?[0-9]*/g);
      const lastNum = displayNums[displayNums.length - 1];

      return lastNum.indexOf(".") !== -1;
    };

    const updateDisplay = () => {

      if (lastCharIsEquals()) {

        props.setInput("0.");
        props.setResult("0.");

      }
      else if (lastCharIsNum() && !lastNumHasDecimal()) {

        props.setInput(displayInput + ".");
        props.setResult(props.displayText.result + ".");

      }

    };



    updateDisplay();

  };



  return (

    <button
      id="decimal"
      key="btn-decimal"
      class="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      .
    </button>

  );

};
const EvaluateBtn = (props) => {

  const handleClick = () => {

    let displayInput = props.displayText.input;
    const displayResult = props.displayText.result;

    const lastCharIsNum = () => {
      return displayInput[displayInput.length - 1].match(/[0-9]/) !== null;
    };
    const lastCharIsDecimal = () => {
      return displayInput[displayInput.length - 1] === ".";
    };
    const lastCharIsOp = (displayInput) => {
      if (displayInput.length < 2)
        return false;

      return displayInput[displayInput.length - 1].match(/[/*+-]/) !== null;
    };
    const getConsecutiveOpCount = (displayInput) => {
      return (
        !lastCharIsOp(displayInput) ? 0 :
          !lastCharIsOp(displayInput.slice(0, displayInput.length - 2)) ? 1 :
            2);
    };
    const getOpCount = () => {

      const expressionOps = displayInput.match(/[/*+-]/g);
      let opCount = 0;



      if (expressionOps === null)
        return 0;

      opCount = expressionOps.length;



      return opCount;

    };
    const getInputNums = () => {
      return displayInput.match(/[0-9]+[.]?[0-9]*/g);
    };
    const getInputOps = () => {
      return displayInput.match(/[/*+-]/g);
    };

    const updateDisplay = () => {

      //Update Input:
      (() => {

        if (getConsecutiveOpCount(displayInput) === 2) {

          displayInput = displayInput.slice(0, displayInput.length - 4);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 1) {

          displayInput = displayInput.slice(0, displayInput.length - 2);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsDecimal()) {

          displayInput = displayInput.slice(0, displayInput.length - 1);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsNum())
          props.setInput(displayInput + ` =`);

      })();

      //Update Result:
      (() => {

        let newResult = 0;
        let inputOpIndexes = [];
        let nextInputOpIndex = 0;

        if (getInputOps() === null) {

          newResult = displayInput;
          props.setResult(newResult);

        }
        else {

          /* Notes
          
              - Get the indexes of displayInput's operators and push them to the 
                inputOpIndexes array.
              
                -- When getting the indexes of displayInput's operators, don't count
                   consecutive operators (which should just be the "-" operator in 
                   every case where a 2nd operator appears).
                -- The value being pushed to the inputOpIndexes array should be an
                   array of length 2 (where the first element is an operator symbol
                   and the second element is the index of that operator symbol in 
                   displayInput).
                -- [END]
                
              - Filter inputOpIndexes such that the returned array only contains the 
                indexes for the "*" and "/" operators.
                
                  -- Use the "map" method on the filtered array to get an array that
                     only contains the indexes for all of the "*" and "/" operators
                     in displayInput.
                     
                      --- Use the "forEach" method on the returned array to evaluate 
                          the operations for each inputOpIndex in that array.
                          
                            ---- The callback function for the "forEach" method should
                                 have a single parameter of (opIndex), should evaluate
                                 the operation defined by the operator at
                                 displayInput[opIndex], and should replace the 
                                 operation in displayInput with the result of that 
                                 operation.
                            ---- [END]
                          
                      --- [END]
                     
                  -- [END]
                
              - Repeat the previous statement, but for the "+" and "-" operators.
              - Output the final result from displayInput to the Calculator.
              - [END]
          
          */

          inputOpIndexes = [];

          for (let i = 0; i < displayInput.length; i++)
            if (
              displayInput[i].match(/[/*+-]/) !== null &&
              getConsecutiveOpCount(displayInput.slice(0, i + 1)) === 1 &&
              i != 0
            )
              inputOpIndexes.push(i);

          while (inputOpIndexes.length !== 0) {

            if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null).length !== 0)
              nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null))[0];
            else if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null).length !== 0)
              nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null))[0];

            (() => {

              /* Notes 1

              - Get operands[0] from displayInput

                -- Set operands[0] to the the left (first) operand of the operation at 
                   displayInput[opIndex].

                  --- opIndex is the index of some operation in the expression stored 
                      in displayInput.
                  --- displayInput[opIndex] is the operator associated with opIndex.
                  --- An operator in displayInput represents an operation between 2 
                      numbers (which are the operands of the operation).
                  --- [END]

                -- Set operands[0] negative if the following conditions are met:

                  1) The start of operands[0] is not the start of displayInput 
                     (which would indicate that there is no operator
                     before operands[0]).
                  2) The operator before operands[0] is "-" (which indicates 
                     that the operator could potentially be consecutive to 
                     another operator).
                  3) The "-" before operands[0] in displayInput is a 2nd 
                     consecutive operator (which indicates that the "-" is 
                     actually a negative sign, not the operator for a 
                     subtraction, and operands[0] should be negative).
                  n) [END]

                - [END]

              - [END]

            */

              /* Notes 2

              - Get operands[1] from displayInput

                -- Set operands[1] to the the right (second) operand of the operation 
                   at displayInput[opIndex].

                  --- opIndex is the index of some operation in the expression stored 
                      in displayInput.
                  --- displayInput[opIndex] is the operator associated with opIndex.
                  --- An operator in displayInput represents an operation between 2 
                      numbers (which are the operands of the operation).
                  --- If displayInput[opIndex + 2] is a "-" and not the start of 
                      operand2, then set operands [1] negative.
                  --- [END]

                -- [END]

              - [END]

            */

              const getLeftOperand = () => {

                let leftOperand = "";

                for (let i = nextInputOpIndex - 2; i >= 0 && displayInput[i] != " "; i--)
                  leftOperand = displayInput[i] + leftOperand;

                if (
                  nextInputOpIndex - 1 - leftOperand.length != 0 &&
                  displayInput[nextInputOpIndex - 1 - leftOperand.length - 2] === "-" &&
                  getConsecutiveOpCount(displayInput.slice(0, nextInputOpIndex - 1 - leftOperand.length - 1)) === 2
                )
                  leftOperand = "-" + leftOperand;



                return leftOperand;

              };
              const getRightOperand = () => {

                let rightOperand = "";

                if (displayInput[nextInputOpIndex + 2] === "-") {

                  rightOperand += "-"
                  for (let i = nextInputOpIndex + 4; i < displayInput.length && displayInput[i] != " "; i++)
                    rightOperand += displayInput[i];

                }
                else
                  for (let i = nextInputOpIndex + 2; i < displayInput.length && displayInput[i] != " "; i++)
                    rightOperand += displayInput[i];

                return rightOperand;

              };
              const operands = [getLeftOperand(), getRightOperand()];

              switch (displayInput[nextInputOpIndex]) {

                case "*":

                  newResult = Number((Number(operands[0]) * Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(

                    (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                    + " * " +
                    (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                    newResult

                  );
                  break;

                case "/":

                  newResult = Number((Number(operands[0]) / Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(

                    (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                    + " / " +
                    (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                    newResult

                  );
                  break;

                case "+":

                  newResult = Number((Number(operands[0]) + Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(
                    operands[0]
                    + " + " +
                    operands[1],
                    newResult

                  );
                  break;

                case "-":

                  newResult = Number((Number(operands[0]) - Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(

                    (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                    + " - " +
                    (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                    newResult

                  );
                  break;

              }

            })();

            inputOpIndexes = [];

            for (let i = 0; i < displayInput.length; i++)
              if (
                displayInput[i].match(/[/*+-]/) !== null &&
                getConsecutiveOpCount(displayInput.slice(0, i + 1)) === 1 &&
                i != 0
              )
                inputOpIndexes.push(i);

          }

          props.setResult(newResult);

        }

      })();

    }



    updateDisplay();

  };



  return (

    <button
      id="equals"
      key="btn-equals"
      class="btn border border-dark border-1"
      onClick={() => {
        if (props.displayText.input[props.displayText.input.length - 1] !== "=")
          handleClick();
      }}
    >
      =
    </button>

  );

};
const NumericalBtns = (props) => {

  const numberNames = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const handleClick = (index) => {

    const displayInput = props.displayText.input;

    const lastCharIsEquals = () => {
      return displayInput[displayInput.length - 1] === "=";
    };
    const lastCharIsNum = () => {
      return (
        displayInput[displayInput.length - 1] === "." ||
        displayInput[displayInput.length - 1].match(/[0-9]/) !== null);
    };
    const lastNumIsZero = () => {
      const inputNums = displayInput.match(/[0-9]+[.]?[0-9]*/g);
      const lastNum = inputNums[inputNums.length - 1];

      return lastNum === "0";
    };
    const lastCharIsOp = () => {
      return displayInput[displayInput.length - 1].match(/[/*+-]/) !== null;
    };

    const updateDisplay = () => {

      if (lastCharIsEquals() || props.displayText.result === "0" && displayInput === "") {
        props.setInput(`${index}`);
        props.setResult(`${index}`);
      }
      else if (lastCharIsNum()) {

        if (lastNumIsZero()) {

          props.setInput(displayInput.slice(0, displayInput.length - 1) + index);
          props.setResult(`${props.displayText.result.slice(0, displayInput.length - 1)}${index}`);

        }
        else {

          props.setInput(displayInput + index);
          props.setResult(`${props.displayText.result}${index}`);

        }

      }
      else if (lastCharIsOp()) {

        props.setInput(displayInput + " " + index);
        props.setResult(index);

      }

    };



    updateDisplay();

  };



  return (

    <div id="numerical-btns">
      {numberNames.map((num, index) => {

        return (

          <button
            id={num}
            key={"btn-" + num}
            class="btn border border-dark border-1"
            onClick={() => {
              handleClick(index);
            }}
          >
            {index}
          </button>

        );

      })}
      <DecimalBtn
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
      <EvaluateBtn
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};
const OperatorBtns = (props) => {

  const OPERATORS = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"
  }
  const operatorSymbols = Object.keys(OPERATORS);
  const operatorActions = Object.values(OPERATORS);
  const handleClick = (symbol, index) => {

    const displayInput = props.displayText.input;

    const lastCharIsEquals = () => {
      return displayInput[displayInput.length - 1] === "=";
    };
    const lastCharIsNum = () => {
      return displayInput[displayInput.length - 1].match(/[0-9]/) !== null;
    };
    const lastCharIsDecimal = () => {
      return displayInput[displayInput.length - 1] === ".";
    };
    const lastCharIsOp = (displayInput) => {
      if (displayInput.length < 2)
        return false;

      return displayInput[displayInput.length - 1].match(/[/*+-]/) !== null;
    };
    const getConsecutiveOpCount = () => {
      return (
        !lastCharIsOp(displayInput) ? 0 :
          !lastCharIsOp(displayInput.slice(0, displayInput.length - 2)) ? 1 :
            2);
    };

    const updateDisplay = () => {

      props.setResult(symbol);

      if (lastCharIsEquals())
        props.setInput(props.displayText.result + ` ${symbol}`);
      else if (getConsecutiveOpCount() === 2 && symbol !== "-")
        props.setInput(displayInput.slice(0, displayInput.length - 4) + ` ${symbol}`);
      else if (getConsecutiveOpCount() === 1 && symbol !== "-")
        props.setInput(displayInput.slice(0, displayInput.length - 2) + ` ${symbol}`);
      else if ((getConsecutiveOpCount() === 1 && symbol === "-") || (getConsecutiveOpCount() === 0 && lastCharIsNum()))
        props.setInput(displayInput + ` ${symbol}`);
      else if (getConsecutiveOpCount() === 0 && lastCharIsDecimal())
        props.setInput(displayInput.slice(0, displayInput.length - 1) + ` ${symbol}`);

    };



    updateDisplay();

  };



  return (

    <div id="operator-btns">
      {operatorSymbols.map((symbol, index) => {

        return (

          <button
            id={operatorActions[index]}
            key={"operator-btn-" + operatorActions[index]}
            class="btn border border-dark border-1"
            onClick={() => {
              handleClick(symbol, index);
            }}
          >
            {symbol}
          </button>

        );

      })}
    </div>

  );

};

const BtnRowTop = (props) => {

  return (

    <div id="btn-row-top">
      <PowerBtn
        displayText={props.displayText}
        powerOff={props.powerOff}
        resetDisplay={props.resetDisplay}
      />
      <ClearBtn
        displayText={props.displayText}
        resetDisplay={props.resetDisplay}
      />
    </div>

  );

};
const BtnRowBottom = (props) => {

  return (

    <div id="btn-row-bottom">
      <NumericalBtns
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
      <OperatorBtns
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};

const CalculatorBtns = (props) => {

  return (

    <div id="buttons">
      <BtnRowTop
        displayText={props.displayText}
        powerOff={props.powerOff}
        resetDisplay={props.resetDisplay}
      />
      <BtnRowBottom
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};

const Calculator = (props) => {

  return (

    <div
      id="app-calculator"
      class="rounded-3"
    >
      <CalculatorDisplay displayText={props.appState.displayText} />
      <CalculatorBtns
        displayText={props.appState.displayText}
        resetDisplay={props.resetDisplay}
        powerOff={props.powerOff}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};

const App = (props) => {

  return (

    <div id="app-container">
      <Calculator
        appState={props.appState}
        resetDisplay={props.resetDisplay}
        powerOff={props.powerOff}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};



const mapStateToProps = (state) => {
  return {
    appState: state
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setInput: newInput => {
      dispatch(setInput(newInput));
    },
    setResult: newResult => {
      dispatch(setResult(newResult));
    },
    setDisplayText: displayText => {
      dispatch(setDisplayText(displayText));
    },
    resetDisplay: () => {
      dispatch(resetDisplay());
    },
    powerOff: () => {
      dispatch(powerOff());
    },
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(App);
const AppWrapper = () => {

  return (

    <StrictMode>
      <Provider store={store}>
        <Container />
      </Provider>
    </StrictMode>

  );

};



const root = createRoot(document.getElementById("root"));



root.render(
  <AppWrapper />
);