const ClearBtn = (props) => {

  const handleClick = () => {

    const updateDisplay = () => {
      if (props.displayText.result !== "0")
        props.resetDisplay();
    };



    updateDisplay();

  };



  return (

    <button
      id="clear"
      key="btn-clear"
      class="btn border border-dark border-1"
      onClick={() => {
        handleClick()
      }}
    >
      AC
    </button>

  );

};



export default ClearBtn;