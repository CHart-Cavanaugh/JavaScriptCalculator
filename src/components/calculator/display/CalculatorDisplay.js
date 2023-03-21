import { useSelector } from "react-redux";



const CalculatorDisplay = (props) => {
  const displayText = useSelector(state => state.displayText);

  return (

    <div id="calculator-screens" className="text-end">
      <p
        className="display-input border border-dark border-1 rounded-1"
      >
        {displayText.input}
      </p>
      <p
        id="display"
        className="display-result border border-dark border-1 rounded-1"
      >
        {displayText.result}
      </p>
    </div>

  );

};



export default CalculatorDisplay;