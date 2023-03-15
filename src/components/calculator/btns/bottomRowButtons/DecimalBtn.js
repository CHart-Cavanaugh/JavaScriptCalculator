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



export default DecimalBtn;