import bot from "./bot";

const utils = {
  /*
  create2DarrayStates: () =>
    [...Array(SQUARES)].map((_, row) =>
      Array(SQUARES)
        .fill(0)
        .map((_, col) => {
          let status = CELL_STATUS.NOT_USED;
          if (!row && col == Math.floor(SQUARES / 2)) {
            status = CELL_STATUS.BLACK;
          }
          if (row == SQUARES - 1 && col == Math.floor(SQUARES / 2)) {
            status = CELL_STATUS.WHITE;
          }
          return new defaultObject(status);
        })
    ),
    */

  clone: (arr) => JSON.parse(JSON.stringify(arr)),

  gameMakeMove: (x, y, cellStates, setCellStates, stat, setStat) => {
    if ("available" !== cellStates[x][y]) return;

    console.log("move");
    const _states = cellStates.map((x) => [...x]);
    let currTurn = stat.turn;
    let nextTurn = "";

    if (currTurn === "white") {
      nextTurn = "black";
    } else {
      nextTurn = "white";
    }
    utils.utilSetPlayerCells(x, y, _states, currTurn, nextTurn);

    let { black, white, availMoves, emptyCells } = utils.utilSetAvailableStates(
      _states,
      nextTurn
    );

    if (!availMoves && emptyCells) {
      nextTurn = currTurn;
      ({ black, white } = utils.utilSetAvailableStates(_states, nextTurn));
    }

    let _stat = {
      ...stat,
      black,
      white,
      turn: nextTurn,
      finished: emptyCells ? false : true,
    };
    setStat(_stat);
    setCellStates(_states);

    //enable bot move
    if ("black" === nextTurn) {
      setTimeout(() => {
        bot.gameBotMakeMove(_states, setCellStates, _stat, setStat);
      }, 1000);
    }
  },

  utilSetAvailableStates: (states, key) => {
    let gridStat = {
      black: 0,
      white: 0,
      availMoves: 0,
      emptyCells: 0,
    };
    let x, y, i;

    //clear prev available states
    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        if (0 === states[x][y]) {
          gridStat.emptyCells++;
        } else if ("available" === states[x][y]) {
          states[x][y] = 0;
          gridStat.emptyCells++;
        } else if ("black" === states[x][y]) {
          gridStat.black++;
        } else if ("white" === states[x][y]) {
          gridStat.white++;
        }
      }
    }

    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        if (
          (x === 0 && y === 0) ||
          (x === 0 && y === 8 - 1) ||
          (x === 8 - 1 && y === 0) ||
          (x === 8 - 1 && y === 8 - 1)
        ) {
          continue;
        }

        if (
          states[x][y] &&
          key !== states[x][y] &&
          "available" !== states[x][y]
        ) {
          //down
          if (x && x < 8 - 1 && 0 === states[x + 1][y]) {
            for (i = 1; i <= x; i++) {
              if (0 === states[x - i][y] || "available" === states[x - i][y]) {
                break;
              }
              if (key === states[x - i][y]) {
                states[x + 1][y] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //right-down
          if (x && y && x < 8 - 1 && y < 8 - 1 && 0 === states[x + 1][y + 1]) {
            for (i = 1; i <= Math.min(x, y); i++) {
              if (
                0 === states[x - i][y - i] ||
                "available" === states[x - i][y - i]
              ) {
                break;
              }
              if (key === states[x - i][y - i]) {
                states[x + 1][y + 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //right
          if (y && y < 8 - 1 && 0 === states[x][y + 1]) {
            for (i = 1; i <= y; i++) {
              if (0 === states[x][y - i] || "available" === states[x][y - i]) {
                break;
              }
              if (key === states[x][y - i]) {
                states[x][y + 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //right-up
          if (x && y && x < 8 - 1 && y < 8 - 1 && 0 === states[x - 1][y + 1]) {
            for (i = 1; i < Math.min(8 - x, y); i++) {
              if (
                0 === states[x + i][y - i] ||
                "available" === states[x + i][y - i]
              ) {
                break;
              }
              if (key === states[x + i][y - i]) {
                states[x - 1][y + 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //up
          if (x && x < 8 - 1 && 0 === states[x - 1][y]) {
            for (i = 1; i < 8 - x; i++) {
              if (0 === states[x + i][y] || "available" === states[x + i][y]) {
                break;
              }
              if (key === states[x + i][y]) {
                states[x - 1][y] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //left-up
          if (x && y && x < 8 - 1 && y < 8 - 1 && 0 === states[x - 1][y - 1]) {
            for (i = 1; i < Math.min(8 - x, 8 - y); i++) {
              if (
                0 === states[x + i][y + i] ||
                "available" === states[x + i][y + i]
              ) {
                break;
              }
              if (key === states[x + i][y + i]) {
                states[x - 1][y - 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //left
          if (y && y < 8 - 1 && 0 === states[x][y - 1]) {
            for (i = 1; i <= 8 - y; i++) {
              if (0 === states[x][y + i] || "available" === states[x][y + i]) {
                break;
              }
              if (key === states[x][y + i]) {
                states[x][y - 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }

          //left-down
          if (x && y && x < 8 - 1 && y < 8 - 1 && 0 === states[x + 1][y - 1]) {
            for (i = 1; i <= Math.min(x, 8 - y); i++) {
              if (
                0 === states[x - i][y + i] ||
                "available" === states[x - i][y + i]
              ) {
                break;
              }
              if (key === states[x - i][y + i]) {
                states[x + 1][y - 1] = "available";
                gridStat.availMoves++;
                break;
              }
            }
          }
        }
      }
    }

    return gridStat;
  },

  utilSetPlayerCells: (x, y, states, your_key, enemy_key) => {
    let i, j;

    states[x][y] = your_key;

    //down
    if (x < 8 - 2 && enemy_key === states[x + 1][y]) {
      for (i = 2; i < 8 - x; i++) {
        if (your_key === states[x + i][y]) {
          for (j = 1; j < i; j++) {
            states[x + j][y] = your_key;
          }
          break;
        }
        if (!states[x + i][y] || "available" === states[x + i][y]) {
          break;
        }
      }
    }

    //right-down
    if (x < 8 - 2 && y < 8 - 2 && enemy_key === states[x + 1][y + 1]) {
      for (i = 2; i < Math.min(8 - x, 8 - y); i++) {
        if (your_key === states[x + i][y + i]) {
          for (j = 1; j < i; j++) {
            states[x + j][y + j] = your_key;
          }
          break;
        }
        if (!states[x + i][y + i] || "available" === states[x + i][y + i]) {
          break;
        }
      }
    }

    //right
    if (y < 8 - 2 && enemy_key === states[x][y + 1]) {
      for (i = 2; i < 8 - y; i++) {
        if (your_key === states[x][y + i]) {
          for (j = 1; j < i; j++) {
            states[x][y + j] = your_key;
          }
          break;
        }
        if (!states[x][y + i] || "available" === states[x][y + i]) {
          break;
        }
      }
    }

    //right-up
    if (x > 1 && y < 8 - 2 && enemy_key === states[x - 1][y + 1]) {
      for (i = 2; i < Math.min(x + 1, 8 - y); i++) {
        if (your_key === states[x - i][y + i]) {
          for (j = 1; j < i; j++) {
            states[x - j][y + j] = your_key;
          }
          break;
        }
        if (!states[x - i][y + i] || "available" === states[x - i][y + i]) {
          break;
        }
      }
    }

    //up
    if (x > 1 && enemy_key === states[x - 1][y]) {
      for (i = 2; i < x + 1; i++) {
        if (your_key === states[x - i][y]) {
          for (j = 1; j < i; j++) {
            states[x - j][y] = your_key;
          }
          break;
        }
        if (!states[x - i][y] || "available" === states[x - i][y]) {
          break;
        }
      }
    }

    //left-up
    if (x > 1 && y > 1 && enemy_key === states[x - 1][y - 1]) {
      for (i = 2; i < Math.min(x + 1, y + 1); i++) {
        if (your_key === states[x - i][y - i]) {
          for (j = 1; j < i; j++) {
            states[x - j][y - j] = your_key;
          }
          break;
        }
        if (!states[x - i][y - i] || "available" === states[x - i][y - i]) {
          break;
        }
      }
    }

    //left
    if (y > 1 && enemy_key === states[x][y - 1]) {
      for (i = 2; i < y + 1; i++) {
        if (your_key === states[x][y - i]) {
          for (j = 1; j < i; j++) {
            states[x][y - j] = your_key;
          }
          break;
        }
        if (!states[x][y - i] || "available" === states[x][y - i]) {
          break;
        }
      }
    }

    //left-down
    if (x < 8 - 2 && y > 1 && enemy_key === states[x + 1][y - 1]) {
      for (i = 2; i < Math.min(8 - x, y + 1); i++) {
        if (your_key === states[x + i][y - i]) {
          for (j = 1; j < i; j++) {
            states[x + j][y - j] = your_key;
          }
          break;
        }
        if (!states[x + i][y - i] || "available" === states[x + i][y - i]) {
          break;
        }
      }
    }

    return states;
  },
};

export default utils;
