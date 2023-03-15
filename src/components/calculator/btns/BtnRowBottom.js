import NumericalBtns from './bottomRowButtons/NumericalBtns';
import OperatorBtns from './bottomRowButtons/OperatorBtns';



const BtnRowBottom = (props) => {

  return (

    <div id="btn-row-bottom">
      <NumericalBtns
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
      <OperatorBtns
        displayText={props.displayText}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};



export default BtnRowBottom;