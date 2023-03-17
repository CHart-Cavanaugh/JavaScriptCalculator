import CalculatorDisplay from './display/CalculatorDisplay';
import CalculatorBtns from './btns/CalculatorBtns';



const Calculator = (props) => {

  return (

    <div
      id="app-calculator"
      className="rounded-3"
    >
      <CalculatorDisplay />
      <CalculatorBtns />
    </div>

  );

};



export default Calculator;