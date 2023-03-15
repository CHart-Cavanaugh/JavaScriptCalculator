import Calculator from './calculator/Calculator';



const App = (props) => {

  return (

    <div id="app-container">
      <Calculator
        appState={props.appState}
        resetDisplay={props.resetDisplay}
        powerOff={props.powerOff}
        setInput={props.setInput}
        setResult={props.setResult}
      />
    </div>

  );

};



export default App;