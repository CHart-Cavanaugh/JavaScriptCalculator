import PowerBtn from './topRowButtons/PowerBtn';
import ClearBtn from './topRowButtons/ClearBtn';



const BtnRowTop = (props) => {

  return (

    <div id="btn-row-top">
      <PowerBtn
        displayText={props.displayText}
        powerOff={props.powerOff}
        resetDisplay={props.resetDisplay}
      />
      <ClearBtn
        displayText={props.displayText}
        resetDisplay={props.resetDisplay}
      />
    </div>

  );

};



export default BtnRowTop;