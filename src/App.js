import Die from "./components/Die.js";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";
import { increment, reset } from "./actions/index.js";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch()
  const reduxCount = useSelector(state => state.counter)
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [history, setHistory] = React.useState({ array: [] });
  const value = tenzies ? "New Game" : "Roll";
  const click = tenzies ? handleRestart : rollDice;

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      setHistory((prevHistory) => ({
        array: [...prevHistory.array, reduxCount] || [],
      }));
    }
  }, [dice, reduxCount]);

  function handleRestart() {
    setDice(allNewDice());
    setTenzies(false);
    dispatch(reset())
  }

  function allNewDice() {
    const newNumArray = [];
    for (let i = 0; i < 10; i++) {
      newNumArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newNumArray;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
    dispatch(increment())
  }

  function holdDice(id) {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies ? (
        <Confetti height={window.screen.height} width={window.screen.width} />
      ) : (
        <></>
      )}
      <div className="wrapper">{diceElement}</div>
      <button className="roll" onClick={click}>
        {value}
      </button>
      <h4>Rolles: {reduxCount}</h4>
      {history.array.length > 0 && (
        <h3>High score: {Math.min(...history.array)}</h3>
      )}
      </main>
  );
}
