import { ChangeEvent, useCallback, useState } from "react";
import { data } from "./db";
import { debounce } from "./debounce";

const Autocomplete = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const filterSuggestions = (value: string) => {
    const result = data.filter((fruit) =>
      fruit.toLowerCase().includes(value.toLowerCase())
    );
    console.log(result);
    setSuggestions(result);
  };

  const changeHandler = (value: string) => {
    if (value) {
      filterSuggestions(value);
    } else {
      setSuggestions([]);
    }
    
  };
  const debouncedChangeHandler = debounce((value:string)=>changeHandler(value),2000)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    debouncedChangeHandler(value); 
    
  };
  const selectInputHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSelectedValue(event.currentTarget.innerHTML);
    setSuggestions([]);
  };
  return (
    <div>
      <h1>Auto Complete</h1>
      <div className="input-container">
        <input
          type="text"
          value={selectedValue}
          onChange={handleInputChange}
          className="inputBox"
        />
        <section
          className={suggestions.length > 0 ? "resultBox" : "resultBoxHidden"}
        >
          {suggestions.map((fruit, index) => (
            <div
              key={index}
              className="result-item"
              onClick={selectInputHandler}
            >
              {fruit}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
export default Autocomplete;
