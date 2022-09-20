import { useState } from "react";
import utils from "../utils/utils";
import Square from "./Square";
import uuid from "react-uuid";

function Grid({ stat, setStat }) {
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
