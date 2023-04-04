import { useSelector, useDispatch } from "react-redux";
import { setInput, setResult } from "../../../../app/slices/displayTextSlice";



const EvaluateBtn = (props) => {

  const displayText = useSelector(state => state.displayText);
  const dispatch = useDispatch();
  const handleClick = () => {

    if (displayText.result !== "" && displayText.input[displayText.input.length - 1] !== "=") {

      let displayInput = displayText.input;
      const lastCharIsNum = () => {

        return displayInput[displayInput.length - 1].match(/[0-9]/) !== null;

      };
      const lastCharIsDecimal = () => {

        return displayInput[displayInput.length - 1] === ".";

      };
      const lastCharIsOp = (displayInput) => {

        if (displayInput.length < 2)
          return false;



        return displayInput[displayInput.length - 1].match(/[/*+-]/) !== null;

      };
      const getConsecutiveOpCount = (displayInput) => {

        return (

          !lastCharIsOp(displayInput) ? 0 :
            !lastCharIsOp(displayInput.slice(0, displayInput.length - 2)) ? 1 :
              2

        );

      };
      const getInputOps = () => {

        return displayInput.match(/[/*+-]/g);

      };
      const updateDisplay = () => {

        //Update Input:
        (() => {

          if (displayInput === "") {

            displayInput = displayText.result
            dispatch(setInput(displayInput + " ="));

          }
          else if (getConsecutiveOpCount(displayInput) === 2) {

            displayInput = displayInput.slice(0, displayInput.length - 4);
            dispatch(setInput(displayInput + ` =`));

          }
          else if (getConsecutiveOpCount(displayInput) === 1) {

            displayInput = displayInput.slice(0, displayInput.length - 2);
            dispatch(setInput(displayInput + ` =`));

          }
          else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsDecimal()) {

            displayInput = displayInput.slice(0, displayInput.length - 1);
            dispatch(setInput(displayInput + ` =`));

          }
          else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsNum())
            dispatch(setInput(displayInput + ` =`));

        })();

        //Update Result:
        (() => {

          let newResult = 0;
          let inputOpIndexes = [];
          const getInputOpIndexes = () => {

            let inputOpIndexes = [];



            for (let i = 0; i < displayInput.length; i++)
              if (
                displayInput[i].match(/[/*+-]/) !== null &&
                getConsecutiveOpCount(displayInput.slice(0, i + 1)) === 1 &&
                i !== 0
              )
                inputOpIndexes.push(i);



            return inputOpIndexes;

          };
          let nextInputOpIndex = 0;



          if (getInputOps() === null) {

            newResult = displayInput;
            dispatch(setResult(newResult));

          }
          else {

            inputOpIndexes = getInputOpIndexes();

            while (inputOpIndexes.length !== 0) {

              if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null).length !== 0)
                nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null))[0];
              else if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null).length !== 0)
                nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null))[0];

              (() => {

                const getLeftOperand = () => {

                  let leftOperand = "";



                  for (let i = nextInputOpIndex - 2; i >= 0 && displayInput[i] !== " "; i--)
                    leftOperand = displayInput[i] + leftOperand;



                  if (

                    nextInputOpIndex - 1 - leftOperand.length != 0 &&
                    displayInput[nextInputOpIndex - 1 - leftOperand.length - 2] === "-" &&
                    (

                      nextInputOpIndex - 1 - leftOperand.length - 2 === 0 ||
                      getConsecutiveOpCount(displayInput.slice(0, nextInputOpIndex - 1 - leftOperand.length - 1)) === 2

                    )

                  )
                    leftOperand = "-" + leftOperand;



                  return leftOperand;

                };
                const getRightOperand = () => {

                  let rightOperand = "";

                  if (displayInput[nextInputOpIndex + 2] === "-") {

                    rightOperand += "-"
                    for (let i = nextInputOpIndex + 4; i < displayInput.length && displayInput[i] !== " "; i++)
                      rightOperand += displayInput[i];

                  }
                  else
                    for (let i = nextInputOpIndex + 2; i < displayInput.length && displayInput[i] !== " "; i++)
                      rightOperand += displayInput[i];

                  return rightOperand;

                };
                const operands = [getLeftOperand(), getRightOperand()];



                switch (displayInput[nextInputOpIndex]) {

                  case "*":

                    newResult = Number((Number(operands[0]) * Number(operands[1])).toPrecision(10));
                    displayInput = displayInput.replace(

                      (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                      + " * " +
                      (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                      String(newResult)[0] === "-" ? "- " + String(newResult).slice(1) : newResult

                    );
                    break;

                  case "/":

                    newResult = Number((Number(operands[0]) / Number(operands[1])).toPrecision(10));
                    displayInput = displayInput.replace(

                      (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                      + " / " +
                      (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                      String(newResult)[0] === "-" ? "- " + String(newResult).slice(1) : newResult

                    );
                    break;

                  case "+":

                    newResult = Number((Number(operands[0]) + Number(operands[1])).toPrecision(10));
                    displayInput = displayInput.replace(
                      (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                      + " + " +
                      (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                      String(newResult)[0] === "-" ? "- " + String(newResult).slice(1) : newResult

                    );
                    break;

                  case "-":

                    newResult = Number((Number(operands[0]) - Number(operands[1])).toPrecision(10));
                    displayInput = displayInput.replace(

                      (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                      + " - " +
                      (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                      String(newResult)[0] === "-" ? "- " + String(newResult).slice(1) : newResult

                    );
                    break;

                  default:

                    break;

                }

              })();

              inputOpIndexes = getInputOpIndexes();

            }

            dispatch(setResult(newResult));

          }

        })();

      };



      updateDisplay();

    }

  };



  return (

    <button
      id="equals"
      key="btn-equals"
      className="btn border border-dark border-1"
      onClick={() => {
        handleClick();
      }}
    >
      =
    </button>

  );

};



export default EvaluateBtn;