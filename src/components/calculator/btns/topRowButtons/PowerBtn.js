import { useSelector, useDispatch } from "react-redux";
import { resetDisplay, powerOff } from './../../../../app/slices/displayTextSlice';
import { useEffect } from "react";



const PowerBtn = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();
  const handleClick = () => {

    const updateDisplay = () => {

      if (displayText.result !== "")
        dispatch(powerOff());
      else
        dispatch(resetDisplay()); //power on

    };



    updateDisplay();

  };



  useEffect(() => {

    dispatch(resetDisplay()); //power on

  }, []);



  return (

    <button
      id="power-btn"
      key="btn-power"
      className="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      Power
    </button>

  );

};



export default PowerBtn;