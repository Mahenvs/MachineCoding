import { data } from "./dummyData.js";

const getSuggestions = (keyword) => {
  console.log(data);
  const result = data.filter((fruit) =>
    fruit.toLowerCase().startsWith(keyword.toLowerCase())
  );

  return new Promise((res, rej) => {
    setTimeout(() => res(result), 1000);
  });
};

const inputBox = document.getElementById("search-input");
const resultBox = document.getElementById("result-body");

const renderResultDropDown = (result = []) => {
  const suggestedFragment = document.createDocumentFragment();

  result.forEach((item) => {
    const ele = document.createElement("div");
    ele.innerHTML = item;
    ele.classList.add("dropdown-item");
    suggestedFragment.appendChild(ele);
  });
  resultBox.innerHTML = "";
  resultBox.appendChild(suggestedFragment);
};
const handleSearch = async (value) => {
  const result = await getSuggestions(value);
  console.log(result);
  if (result.length) {
    resultBox.classList.add("result-visible");
    renderResultDropDown(result);
  }
};
const handleInputChange = (event) => {
  if (event.target.value) {
    handleSearch(event.target.value);
  } else {
    resultBox.innerHTML = "";
    resultBox.classList.remove("result-visible");
  }
};
const debounce = (fn, duration) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, duration);
  };
};
const selectSuggestion = (event) => {
  inputBox.value = event.target.innerText;
  resultBox.innerHTML = "";
  resultBox.classList.remove("result-visible");
};
document.addEventListener("DOMContentLoaded", () => {
  inputBox.addEventListener("input", debounce(handleInputChange, 500));
  resultBox.addEventListener("click", selectSuggestion);
});
