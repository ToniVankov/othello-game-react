import utils from "./utils";

const bot = {
  getRandomIntInclusive: (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getBotMove: (availMoves, level) => {
    let x, y;
    if ("easy" === level) {
      let rand = bot.getRandomIntInclusive(0, availMoves.length - 1);
      x = availMoves[rand].x;
      y = availMoves[rand].y;
    } else {
      //hard :)
      if (availMoves.length > 1) {
        let res = availMoves.filter(
          (el) =>
            //corners
            !(
              (el.x === 0 && el.y === 0) ||
              (el.x === 0 && el.y === 7) ||
              (el.x === 7 && el.y === 0) ||
              (el.x === 7 && el.y === 7)
            )
        );

        if (!res.length) {
          let rand = bot.getRandomIntInclusive(0, availMoves.length - 1);
          x = availMoves[rand].x;
          y = availMoves[rand].y;
        } else if (res.length > 1) {
          //TODO:
        } else {
          x = res[0].x;
          y = res[0].y;
        }
      } else {
        x = availMoves[0].x;
        y = availMoves[0].y;
      }
    }

    return { x, y };
  },

  gameBotMakeMove: (states, setCellStates, stat, setStat) => {
    let x,
      y,
      availMoves = [];
    //get all available moves
    for (x = 0; x < 8; x++) {
      for (y = 0; y < 8; y++) {
        if ("available" === states[x][y]) {
          availMoves.push({ x, y });
        }
      }
    }

    ({ x, y } = bot.getBotMove(availMoves, "easy"));
    utils.gameMakeMove(x, y, states, setCellStates, stat, setStat);
  },
};

export default bot;
