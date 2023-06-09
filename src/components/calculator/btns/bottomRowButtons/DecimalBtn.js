import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../../app/slices/displayTextSlice";



const DecimalBtn = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();
  const handleClick = () => {

    if (displayText.result !== "") {

      const displayInput = displayText.input;

      const lastCharIsEquals = () => {
        return displayInput[displayInput.length - 1] === "=";
      };
      const lastCharIsNum = () => {
        return displayInput[displayInput.length - 1].match(/[0-9]/) !== null;
      };
      const lastNumHasDecimal = () => {
        const displayNums = displayInput.match(/[0-9]+[.]?[0-9]*/g);
        const lastNum = displayNums[displayNums.length - 1];

        return lastNum.indexOf(".") !== -1;
      };
      const inputIsEmpty = () => {
        return displayInput === "";
      }
      const updateDisplay = () => {

        if (inputIsEmpty() || lastCharIsEquals()) {

          dispatch(setInput("0."));
          dispatch(setResult("0."));

        }
        else if (lastCharIsNum() && !lastNumHasDecimal()) {

          dispatch(setInput(displayInput + "."));
          dispatch(setResult(displayText.result + "."));

        }

      };



      updateDisplay();

    }

  };



  return (

    <button
      id="decimal"
      key="btn-decimal"
      className="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      .
    </button>

  );

};



export default DecimalBtn;