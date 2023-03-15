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



export default CalculatorDisplay;