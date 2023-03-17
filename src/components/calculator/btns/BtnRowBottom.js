import NumericalBtns from './bottomRowButtons/NumericalBtns';
import OperatorBtns from './bottomRowButtons/OperatorBtns';



const BtnRowBottom = (props) => {

  return (

    <div id="btn-row-bottom">
      <NumericalBtns />
      <OperatorBtns />
    </div>

  );

};



export default BtnRowBottom;