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



export default OperatorBtns;