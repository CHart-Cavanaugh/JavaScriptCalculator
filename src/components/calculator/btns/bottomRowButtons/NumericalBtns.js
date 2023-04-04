import { useSelector, useDispatch } from 'react-redux';
import { setInput, setResult } from '../../../../app/slices/displayTextSlice';

import DecimalBtn from './DecimalBtn';
import EvaluateBtn from './EvaluateBtn';



const NumericalBtns = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();

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
    "nine"

  ];
  const handleClick = (index) => {

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
      const lastNumIsZero = () => {

        const inputNums = displayInput.match(/[0-9]+[.]?[0-9]*/g);
        const lastNum = inputNums[inputNums.length - 1];



        return lastNum === "0";

      };
      const lastCharIsOp = () => {

        return displayInput[displayInput.length - 1].match(/[/*+-]/) !== null;

      };
      const updateDisplay = () => {

        if (lastCharIsEquals() || (displayText.result === "0" && displayInput === "")) {

          dispatch(setInput(`${index}`));
          dispatch(setResult(`${index}`));

        }
        else if (lastCharIsNum() || lastCharIsDecimal()) {

          if (lastNumIsZero()) {

            dispatch(setInput(`${displayInput.slice(0, displayInput.length - 1)}${index}`));
            dispatch(setResult(`${index}`));

          }
          else {

            dispatch(setInput(`${displayInput}${index}`));
            dispatch(setResult(`${displayText.result}${index}`));

          }

        }
        else if (lastCharIsOp()) {

          dispatch(setInput(`${displayInput} ${index}`));
          dispatch(setResult(`${index}`));

        }

      };



      updateDisplay();

    }

  };



  return (

    <div id="numerical-btns">
      {numberNames.map((num, index) => {

        return (

          <button
            id={num}
            key={"btn-" + num}
            className="btn border border-dark border-1"
            onClick={() => {
              handleClick(index);
            }}
          >
            {index}
          </button>

        );

      })}
      <DecimalBtn />
      <EvaluateBtn />
    </div>

  );

};



export default NumericalBtns;