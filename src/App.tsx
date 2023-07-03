import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { increment, reset } from "./actions/index.js";
import Die from "./components/Die";
import { DieType } from "./types/global.types.js";

export default function App() {
  const dispatch = useDispatch();
  const reduxCount = useSelector<any>((state) => state.counter);
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [history, setHistory] = React.useState<{ marks: number[] }>({
    marks: [],
  });
  const value = tenzies ? "New Game" : "Roll";
  const click = tenzies ? handleRestart : rollDice;

  React.useEffect(() => {
    const allHeld = dice.every((die: DieType) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      setHistory((prevHistory: any) => ({
        marks: [...prevHistory.marks, reduxCount] || [],
      }));
    }
  }, [dice, reduxCount]);

  function handleRestart(): void {
    setDice(allNewDice());
    setTenzies(false);
    dispatch(reset());
  }

  function allNewDice(): DieType[] {
    const newNumArray: Array<DieType> = [];
    for (let i = 0; i < 9; i++) {
      newNumArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newNumArray;
  }

  function rollDice(): void {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
    dispatch(increment());
  }

  function holdDice(id: String): void {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  const diceElement = dice.map((die: DieType) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      tenzies
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
      <h4>Rolles: {`${reduxCount}`}</h4>
      {history.marks.length > 0 && (
        <h3>High score: {Math.min(...history.marks)}</h3>
      )}
    </main>
  );
}
