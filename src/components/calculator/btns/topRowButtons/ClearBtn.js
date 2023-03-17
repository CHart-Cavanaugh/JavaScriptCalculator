import { useSelector, useDispatch } from "react-redux";
import { resetDisplay } from './../../../../app/slices/displayTextSlice';



const ClearBtn = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();
  const handleClick = () => {

    if (displayText.result !== "") {

      const updateDisplay = () => {
        dispatch(resetDisplay());
      };



      updateDisplay();

    }

  };



  return (

    <button
      id="clear"
      key="btn-clear"
      className="btn border border-dark border-1"
      onClick={() => {
        handleClick()
      }}
    >
      AC
    </button>

  );

};



export default ClearBtn;