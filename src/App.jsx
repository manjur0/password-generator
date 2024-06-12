import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charrecturAllowed, setCharrecturAllowed] = useState(false);
  const [password, setPassoword] = useState("");

  // Password Generator Function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charrecturAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassoword(pass);
  }, [length, numbersAllowed, charrecturAllowed, setPassoword]);

  // useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charrecturAllowed, passwordGenerator]);

  // Component return
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800">
      <h1 className="text-4xl text-center font-bold my-8">
        Password Generator
      </h1>
    </div>
  );
}

export default App;
