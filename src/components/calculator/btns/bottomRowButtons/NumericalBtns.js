import DecimalBtn from './DecimalBtn';
import EvaluateBtn from './EvaluateBtn';



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



export default NumericalBtns;