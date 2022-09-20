function Info({ stat: { black, white, turn, finished } }) {
  let stat = "";
  if (finished) {
    if (black > white) {
      stat = <p>Game finish! Black's WIN!</p>;
    } else if (white > black) {
      stat = <p>Game finish! White's WIN!</p>;
    } else {
      stat = <p>Game finish! Even Match!</p>;
    }
  } else {
    stat = <p>Next turn: {turn}</p>;
  }

  return (
    <div>
      <p>Black: {black}</p>

      <p>White: {white}</p>

      {stat}
    </div>
  );
}

export default Info;
