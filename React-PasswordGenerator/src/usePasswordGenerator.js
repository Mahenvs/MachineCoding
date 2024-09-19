import React, { useState } from "react";

const usePasswordGenerator = (passwordOptions, length) => {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const generatePassword = () => {
    let resultSet="",
    generatedPassword="";
    
    const values = passwordOptions.filter((item) => item.state == true);
    if(values.length ==0){
      console.log(values.length);
      setErrorMsg("Check any of the available options")
      setPassword("");
      return;

    }
    values.forEach((element) => {
      switch (element.title) {
        case "includeUpper":
          resultSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "includeLower":
          resultSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "includeSymbols":
          resultSet += "!@#$%^&*()";
          break;
        case "includeNumbers":
          resultSet += "0123456789";
          break;

        default:
          break;
      }
    });
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * resultSet.length);
      generatedPassword += resultSet[randomIndex];
    }
    setErrorMsg("")
    setPassword(generatedPassword)

  };
  return { password, errorMsg, generatePassword };
};

export default usePasswordGenerator;
