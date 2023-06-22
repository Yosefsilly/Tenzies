import React from "react";

type Props = {
  isHeld: Boolean,
  tenzies: Boolean,
  holdDice: () => {},
  value: number
}

export default function Die({isHeld, tenzies, holdDice, value}: Props) {
    const styles: Object = {
        backgroundColor: isHeld ? "#59E391" : "white", 
        cursor: tenzies ? "auto" : "pointer"
    }
  return (
    <div  className="die-face" style={styles} onClick={holdDice}>
      <h2 className="die-num" unselectable="on">{value}</h2>
    </div>
  );
}
