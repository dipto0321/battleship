import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

import {
  createGameDisplay,
  guardBox,
  generateShips,
} from './dom/domUtils';

import mainGame from './mainGame';

const game = mainGame();
const container = document.querySelector(".container");
const mainRow = document.querySelector(".main-row");

const computerBoardGrid = createGameDisplay(game, container, mainRow);

guardBox(computerBoardGrid);
generateShips(game.battleShipObjs.humanBoard);