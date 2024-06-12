import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charrecturAllowed, setCharrecturAllowed] = useState(false);
  const [password, setPassoword] = useState("");
  const passwordRef = useRef(null);

  // Password Generator Function
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let num = "0123456789";
    let char = "!@#$%^&*-_+=[]{}~`";
    if (numbersAllowed) str += num;
    if (charrecturAllowed) str += char;
    // if (numbersAllowed && charrecturAllowed) str += num && char;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassoword(pass);
  }, [length, numbersAllowed, charrecturAllowed, setPassoword]);

  // Copy Passwords clipBoard function
  const copyPasswordClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 4);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charrecturAllowed, passwordGenerator]);

  // Component return
  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800">
      <h1 className="text-4xl text-center font-bold my-8 ">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4 text-orange-500 text-xl font-normal">
        <input
          className="outline-none w-full py-3 px-3"
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordClipboard}
          className="outline-none bg-blue-800 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="flex items-center justify-center gap-x-3  text-orange-500 text-xl font-semibold">
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer "
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            value={numbersAllowed}
            onChange={() => {
              setNumbersAllowed((prev) => !prev);
            }}
          />
          <label>Numbers: {numbersAllowed}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            value={charrecturAllowed}
            onChange={() => {
              setCharrecturAllowed((prev) => !prev);
            }}
          />
          <label>Character: {charrecturAllowed}</label>
        </div>
      </div>
    </div>
  );
}

export default App;
