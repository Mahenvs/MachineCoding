import { useMemo, useState } from "react";
import "./App.css";
import { useCustomMemo } from "./useCustomMemo";

function App() {
  const [counter, setCounter] = useState(0);

  const [counter1, setCounter1] = useState(100);

  const squareCounter = () =>{
    console.log("inside");
    return counter * counter;
  }
  const memoizedVal = useCustomMemo(squareCounter,[counter])
  return (
    <>
      <div>
        <h1>Counter : {counter}</h1>
        <h2>Squared Counter : {memoizedVal}</h2>
        <button onClick={() => {console.log("Set Counter ");
          setCounter(counter + 1)}}>Increment</button>

        <h1>Counter-1 : {counter1}</h1>
        <button onClick={() => {
          console.log("Set Counter 2");
          setCounter1(counter1 - 1)}}>Decrement</button>

      </div>
    </>
  );
}

export default App;
