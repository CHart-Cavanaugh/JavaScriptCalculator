import BtnRowTop from './BtnRowTop';
import BtnRowBottom from './BtnRowBottom';


const CalculatorBtns = (props) => {

  return (

    <div id="buttons">
      <BtnRowTop
        displayText={props.displayText}
        powerOff={props.powerOff}
        resetDisplay={props.resetDisplay}
      />
      <BtnRowBottom
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};



export default CalculatorBtns;