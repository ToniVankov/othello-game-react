import { useState } from "react";
import utils from "../utils/utils";
import Square from "./Square";
import uuid from "react-uuid";

function Grid({ stat, setStat }) {
  //hook that keep the game turn
  //const [gameTurn, setGameTurn] = React.useState("white");

  //default or initial states
  /*
  const ROWS = rows || 8;
  const COLS = cols || 8;
  const INIT = init || [
    { x: 3, y: 3, state: "white" },
    { x: 3, y: 4, state: "black" },
    { x: 4, y: 3, state: "black" },
    { x: 4, y: 4, state: "white" },
  ];

  //state array
  const states = new Array(ROWS);
  for (let i = 0; i < states.length; i++) {
    states[i] = new Array(COLS).fill(0);
  }

  //set default states
  INIT.map((el) => (states[el.x][el.y] = el.state));

  useEffect(() => {
    const _states = cellStates.map((x) => [...x]);
    setCellStates(_states);
    //*
    setStat({
      ...stat,
      black: 2,
      white: 2,
      turn: "white",
      finished: false,
    });
    //* /
    utils.utilSetAvailableStates(_states, "white");
  }, []);

  const [cellStates, setCellStates] = useState(states.map((x) => [...x]));
  */
  const [cellStates, setCellStates] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, "available", 0, 0, 0],
    [0, 0, 0, "white", "black", "available", 0, 0],
    [0, 0, "available", "black", "white", 0, 0, 0],
    [0, 0, 0, "available", 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  //
  function handleGameTurn(x, y) {
    if ("white" !== stat.turn) return;
    utils.gameMakeMove(x, y, cellStates, setCellStates, stat, setStat);
  }

  return cellStates.map((s_el, s_index) => {
    return (
      <div className="grid" key={s_index}>
        {s_el.map((e_el, e_index) => {
          return (
            <Square
              key={uuid()}
              state={e_el}
              id={s_index * 10 + e_index}
              onClick={() => handleGameTurn(s_index, e_index)}
            />
          );
        })}
      </div>
    );
  });
}

export default Grid;
