import { useEffect } from "react";



const PowerBtn = (props) => {

  const handleClick = () => {

    const updateDisplay = () => {
      if (props.displayText.result !== "")
        props.powerOff();
      else
        props.resetDisplay(); //power on
    };



    updateDisplay();

  };



  useEffect(() => {
    props.resetDisplay(); //power on
  }, []);



  return (

    <button
      id="power-btn"
      key="btn-power"
      class="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      Power
    </button>

  );

};



export default PowerBtn;