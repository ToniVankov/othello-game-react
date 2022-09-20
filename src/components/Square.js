function Square({ id, state, onClick }) {
  return (
    <div
      id={id}
      className={"gameSquare " + state + "Checkers"}
      onClick={onClick}
    ></div>
  );
}

export default Square;
