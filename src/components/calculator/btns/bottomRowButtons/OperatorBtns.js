import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from '../../../../app/slices/displayTextSlice';



const OperatorBtns = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();
  const OPERATORS = {

    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide"

  }
  const operatorSymbols = Object.keys(OPERATORS);
  const operatorActions = Object.values(OPERATORS);
  const handleClick = (symbol, index) => {

    if (displayText.result !== "") {

      const displayInput = displayText.input;

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
              2
        );

      };
      const inputIsEmpty = () => {

        return displayInput === "";

      };

      const updateDisplay = () => {

        const setInputToResult = () => {

          dispatch(setInput(

            (Number(displayText.result) > 0 ? displayText.result
              : "- " + Math.abs(Number(displayText.result))) +

            ` ${symbol}`

          ));

        };
        const replaceConsecutiveOpsWithSymbol = () => {

          dispatch(setInput(displayInput.slice(0, displayInput.length - 4) + ` ${symbol}`));

        };
        const replacePreviousOpWithSymbol = () => {

          dispatch(setInput(displayInput.slice(0, displayInput.length - 2) + ` ${symbol}`));

        };
        const appendSymbolToInput = () => {

          dispatch(setInput(displayInput + ` ${symbol}`));

        };
        const replaceDecimalWithSymbol = () => {

          dispatch(setInput(displayInput.slice(0, displayInput.length - 1) + ` ${symbol}`));

        };



        if (inputIsEmpty() || lastCharIsEquals())
          setInputToResult();
        else if (getConsecutiveOpCount() === 2 && symbol !== "-")
          replaceConsecutiveOpsWithSymbol();
        else if (getConsecutiveOpCount() === 1 && symbol !== "-")
          replacePreviousOpWithSymbol();
        else if ((getConsecutiveOpCount() === 1 && symbol === "-") || (getConsecutiveOpCount() === 0 && lastCharIsNum()))
          appendSymbolToInput();
        else if (getConsecutiveOpCount() === 0 && lastCharIsDecimal())
          replaceDecimalWithSymbol();



        dispatch(setResult(symbol));

      };



      updateDisplay();

    }

  };



  return (

    <div id="operator-btns">
      {operatorSymbols.map((symbol, index) => {

        return (

          <button
            id={operatorActions[index]}
            key={"operator-btn-" + operatorActions[index]}
            className="btn border border-dark border-1"
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



export default OperatorBtns;