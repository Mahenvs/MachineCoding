import { React, useState } from "react";

import "./App.css";
import usePasswordGenerator from "./usePasswordGenerator";


function App() {
  const [pswdLength, setPswdLength] = useState(6);

  const [passwordAttributes, setPasswordAttributes] = useState([
    { title: "includeUpper", state: false },
    { title: "includeLower", state: false },
    { title: "includeSymbols", state: false },
    { title: "includeNumbers", state: false },
  ]);
  const submitHandler = (event) => {
    event.preventDefault();
    changeHandler();
  };

  const changeHandler = (index, flag) => {
    const checkUpdated = [...passwordAttributes];
    checkUpdated[index].state = !checkUpdated[index].state;
    console.log();
    setPasswordAttributes(checkUpdated);
    // setPasswordAttributes((prev) =>
    //   prev.map((item) =>
    //     item.title == flag ? { ...item, [Object.keys(item)[1]]: value } : item
    //   )
    // );
  };

  const { password, errorMsg, generatePassword } = usePasswordGenerator(
    passwordAttributes,
    pswdLength
  );
  console.log(errorMsg);

  return (
    <>
      <h2>Password Generator</h2>
      {errorMsg.length !=0 && <span className="error flex">{errorMsg}</span>}
      {errorMsg.length ==0 && password && <label htmlFor="" className="generatedPswd flex">Password is : {password}</label>}
      <div>
        <form className="flex gap-4" action="" onSubmit={submitHandler}>
          <span className="flex flex-start">
            Character Length {pswdLength}
            <input
              type="range"
              min="6"
              max="32"
              step="1"
              onChange={(e) => setPswdLength(e.target.value)}
              value={pswdLength}
            />
          </span>

          {passwordAttributes?.map((attribute, index) => (
            <span className="flex-start" key={attribute.title}>
              <input
                type="checkbox"
                checked={attribute.state}
                onChange={() => changeHandler(index, attribute.title)}
              />{" "}
              {attribute.title}
            </span>
          ))}

          <button
            type="button"
            onClick={() => generatePassword(passwordAttributes, pswdLength)}
          >
            Generate password
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
