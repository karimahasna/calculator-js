import "./App.css";
import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Result from "./components/Result";

const btnValues = [
  [1, 2, 3, "+"],
  [4, 5, 6, "-"],
  [7, 8, 9, "/"],
  [0, "C", "=", "X"],
];

const App = () => {
  let [cal, setCal] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const resetButton = (e) => {
    e.preventDefault();
    setCal({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const numButton = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (cal.num?.toString()?.length < 16) {
      setCal({
        sign: cal.sign,
        num:
          cal.num === 0 && value === "0"
            ? "0"
            : cal.num % 1 === 0
            ? Number(cal.num + value)
            : cal.num + value,
        res: !cal.sign ? 0 : cal.res,
      });
    }
  };

  const signButton = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCal({
      sign: value,
      res: !cal.res && cal.num ? cal.num : cal.res,
      num: 0,
    });
  };

  const equalsButton = () => {
    if (cal.sign && cal.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCal({
        res:
          cal.num === "0" && cal.sign === "/"
            ? "Can't divide with 0"
            : math(Number(cal.res), Number(cal.num), cal.sign),
        sign: "",
        num: 0,
      });
    }
  };

  return (
    <div>
      <Result value={cal.res}></Result>
      <Wrapper>
        <Screen value={cal.num} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={(e) => {
                  btn === "C"
                    ? resetButton(e)
                    : btn === "+" || btn === "-" || btn === "/" || btn === "X"
                    ? signButton(e)
                    : btn === "="
                    ? equalsButton()
                    : numButton(e);
                }}
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
};

export default App;
