const EvaluateBtn = (props) => {

  const handleClick = () => {

    let displayInput = props.displayText.input;
    const displayResult = props.displayText.result;

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
            2);
    };
    const getOpCount = () => {

      const expressionOps = displayInput.match(/[/*+-]/g);
      let opCount = 0;



      if (expressionOps === null)
        return 0;

      opCount = expressionOps.length;



      return opCount;

    };
    const getInputNums = () => {
      return displayInput.match(/[0-9]+[.]?[0-9]*/g);
    };
    const getInputOps = () => {
      return displayInput.match(/[/*+-]/g);
    };

    const updateDisplay = () => {

      //Update Input:
      (() => {

        if (getConsecutiveOpCount(displayInput) === 2) {

          displayInput = displayInput.slice(0, displayInput.length - 4);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 1) {

          displayInput = displayInput.slice(0, displayInput.length - 2);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsDecimal()) {

          displayInput = displayInput.slice(0, displayInput.length - 1);
          props.setInput(displayInput + ` =`);

        }
        else if (getConsecutiveOpCount(displayInput) === 0 && lastCharIsNum())
          props.setInput(displayInput + ` =`);

      })();

      //Update Result:
      (() => {

        let newResult = 0;
        let inputOpIndexes = [];
        let nextInputOpIndex = 0;

        if (getInputOps() === null) {

          newResult = displayInput;
          props.setResult(newResult);

        }
        else {

          /* Notes
          
              - Get the indexes of displayInput's operators and push them to the 
                inputOpIndexes array.
              
                -- When getting the indexes of displayInput's operators, don't count
                   consecutive operators (which should just be the "-" operator in 
                   every case where a 2nd operator appears).
                -- The value being pushed to the inputOpIndexes array should be an
                   array of length 2 (where the first element is an operator symbol
                   and the second element is the index of that operator symbol in 
                   displayInput).
                -- [END]
                
              - Filter inputOpIndexes such that the returned array only contains the 
                indexes for the "*" and "/" operators.
                
                  -- Use the "map" method on the filtered array to get an array that
                     only contains the indexes for all of the "*" and "/" operators
                     in displayInput.
                     
                      --- Use the "forEach" method on the returned array to evaluate 
                          the operations for each inputOpIndex in that array.
                          
                            ---- The callback function for the "forEach" method should
                                 have a single parameter of (opIndex), should evaluate
                                 the operation defined by the operator at
                                 displayInput[opIndex], and should replace the 
                                 operation in displayInput with the result of that 
                                 operation.
                            ---- [END]
                          
                      --- [END]
                     
                  -- [END]
                
              - Repeat the previous statement, but for the "+" and "-" operators.
              - Output the final result from displayInput to the Calculator.
              - [END]
          
          */

          inputOpIndexes = [];

          for (let i = 0; i < displayInput.length; i++)
            if (
              displayInput[i].match(/[/*+-]/) !== null &&
              getConsecutiveOpCount(displayInput.slice(0, i + 1)) === 1 &&
              i != 0
            )
              inputOpIndexes.push(i);

          while (inputOpIndexes.length !== 0) {

            if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null).length !== 0)
              nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[/*]/g) !== null))[0];
            else if (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null).length !== 0)
              nextInputOpIndex = (inputOpIndexes.filter((opIndex) => displayInput[opIndex].match(/[+-]/g) !== null))[0];

            (() => {

              /* Notes 1

              - Get operands[0] from displayInput

                -- Set operands[0] to the the left (first) operand of the operation at 
                   displayInput[opIndex].

                  --- opIndex is the index of some operation in the expression stored 
                      in displayInput.
                  --- displayInput[opIndex] is the operator associated with opIndex.
                  --- An operator in displayInput represents an operation between 2 
                      numbers (which are the operands of the operation).
                  --- [END]

                -- Set operands[0] negative if the following conditions are met:

                  1) The start of operands[0] is not the start of displayInput 
                     (which would indicate that there is no operator
                     before operands[0]).
                  2) The operator before operands[0] is "-" (which indicates 
                     that the operator could potentially be consecutive to 
                     another operator).
                  3) The "-" before operands[0] in displayInput is a 2nd 
                     consecutive operator (which indicates that the "-" is 
                     actually a negative sign, not the operator for a 
                     subtraction, and operands[0] should be negative).
                  n) [END]

                - [END]

              - [END]

            */

              /* Notes 2

              - Get operands[1] from displayInput

                -- Set operands[1] to the the right (second) operand of the operation 
                   at displayInput[opIndex].

                  --- opIndex is the index of some operation in the expression stored 
                      in displayInput.
                  --- displayInput[opIndex] is the operator associated with opIndex.
                  --- An operator in displayInput represents an operation between 2 
                      numbers (which are the operands of the operation).
                  --- If displayInput[opIndex + 2] is a "-" and not the start of 
                      operand2, then set operands [1] negative.
                  --- [END]

                -- [END]

              - [END]

            */

              const getLeftOperand = () => {

                let leftOperand = "";

                for (let i = nextInputOpIndex - 2; i >= 0 && displayInput[i] != " "; i--)
                  leftOperand = displayInput[i] + leftOperand;

                if (
                  nextInputOpIndex - 1 - leftOperand.length != 0 &&
                  displayInput[nextInputOpIndex - 1 - leftOperand.length - 2] === "-" &&
                  getConsecutiveOpCount(displayInput.slice(0, nextInputOpIndex - 1 - leftOperand.length - 1)) === 2
                )
                  leftOperand = "-" + leftOperand;



                return leftOperand;

              };
              const getRightOperand = () => {

                let rightOperand = "";

                if (displayInput[nextInputOpIndex + 2] === "-") {

                  rightOperand += "-"
                  for (let i = nextInputOpIndex + 4; i < displayInput.length && displayInput[i] != " "; i++)
                    rightOperand += displayInput[i];

                }
                else
                  for (let i = nextInputOpIndex + 2; i < displayInput.length && displayInput[i] != " "; i++)
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
                    newResult

                  );
                  break;

                case "/":

                  newResult = Number((Number(operands[0]) / Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(

                    (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                    + " / " +
                    (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                    newResult

                  );
                  break;

                case "+":

                  newResult = Number((Number(operands[0]) + Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(
                    operands[0]
                    + " + " +
                    operands[1],
                    newResult

                  );
                  break;

                case "-":

                  newResult = Number((Number(operands[0]) - Number(operands[1])).toPrecision(10));
                  displayInput = displayInput.replace(

                    (operands[0][0] === "-" ? "- " + operands[0].slice(1) : operands[0])
                    + " - " +
                    (operands[1][0] === "-" ? "- " + operands[1].slice(1) : operands[1]),
                    newResult

                  );
                  break;

              }

            })();

            inputOpIndexes = [];

            for (let i = 0; i < displayInput.length; i++)
              if (
                displayInput[i].match(/[/*+-]/) !== null &&
                getConsecutiveOpCount(displayInput.slice(0, i + 1)) === 1 &&
                i != 0
              )
                inputOpIndexes.push(i);

          }

          props.setResult(newResult);

        }

      })();

    }



    updateDisplay();

  };



  return (

    <button
      id="equals"
      key="btn-equals"
      class="btn border border-dark border-1"
      onClick={() => {
        if (props.displayText.input[props.displayText.input.length - 1] !== "=")
          handleClick();
      }}
    >
      =
    </button>

  );

};



export default EvaluateBtn;