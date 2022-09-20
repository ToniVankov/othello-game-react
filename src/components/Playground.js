import { useState } from "react";
import Info from "./Info";
import Grid from "./Grid";
import uuid from "react-uuid";

function Playground() {
  const [key, setKey] = useState(uuid());
  const [stat, setStat] = useState({
    black: 2,
    white: 2,
    turn: "white",
    finished: false,
  });

  return (
    <div className="gamePlayground">
      <Grid key={key} stat={stat} setStat={setStat} />
      <Info stat={stat} />

      <button onClick={() => setKey(uuid())}>Reset Game</button>
    </div>
  );
}

export default Playground;
