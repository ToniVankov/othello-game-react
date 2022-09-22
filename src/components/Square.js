function Square({ id, state, onClick }) {
  let checkers = "";

  switch (state) {
    case "white":
    case "black":
      checkers = <span className={state + "Checkers"}></span>;
      break;
    case "available":
      checkers = <span className="availableMoves"></span>;
      break;
    default:
      break;
  }

  return (
    <div id={id} className={"gameSquare " + checkers} onClick={onClick}>
      {checkers}
    </div>
  );
}

export default Square;
