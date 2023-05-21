export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white", 
        cursor: props.tenzies ? "auto" : "pointer"
    }
  return (
    <div  className="die-face" style={styles} onClick={props.holdDice}>
      <h2 className="die-num" unselectable="on">{props.value}</h2>
    </div>
  );
}
