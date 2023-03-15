import CalculatorDisplay from './display/CalculatorDisplay';
import CalculatorBtns from './btns/CalculatorBtns';



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



export default Calculator;