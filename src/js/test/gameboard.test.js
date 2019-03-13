const GameBoard = require('../factories/gameboard');
const Ship = require('../factories/ship');

describe('GameBoard', () => {
  let ships, gameBoard;
  beforeEach(() => {
    ships = {
      carrier: Ship(4),
      frigate: Ship(3),
      submarine: Ship(2),
      attacker: Ship(1),
    };
    gameBoard = GameBoard(ships);
    gameBoard.setShipPosition(ships.attacker, 0, "horizontal");
    gameBoard.setShipPosition(ships.submarine, 2, "horizontal");
    gameBoard.setShipPosition(ships.carrier, 4, "vertical");
    gameBoard.setShipPosition(ships.frigate, 13, "horizontal");
  })

  test('GameBoard should have a grid array', () => {
    expect(gameBoard.grid).not.toBeFalsy();
  });

  describe('set ship position', () => {
    test('Gameboard should place attaker ship length of 1', () => {

      expect(gameBoard.ships.attacker.position).toEqual([0]);
      expect(gameBoard.grid[0]).toBe(0);
    });
    test('Gameboard should place submarine ship length of 2 ', () => {

      expect(gameBoard.ships.submarine.position).toEqual([2, 3]);
    });

    test('Gameboard should place carrier ship length of 4 ', () => {

      expect(gameBoard.ships.carrier.position).toEqual([4, 14, 24, 34]);
    });

    test("Gameboard should not place ship in occupied squares", () => {
      expect(gameBoard.ships.frigate.position).toEqual([]);
    });

    // Gameboard filled up test

    test('gameboard should filled up with all the placed ship position', () => {
      const every = (arr, fn) => {
        for (let i = 0; i < arr.length; i++) {
          if (!fn(arr[i])) return false;
        }
        return true;
      };
      expect(every(gameBoard.grid, x => x !== undefined)).toBeFalsy();
    });
  });

  describe('receiveAttack', () => {
    test("it should call hit method of a ship if that ship is in the index that was passed", () => {
      gameBoard.receiveAttack(3);
      expect(gameBoard.ships.submarine.hits).toBe(1);
    });

    test('it should update gameboars grid wil * if missed', () => {
      gameBoard.receiveAttack(25);
      expect(gameBoard.grid[25]).toBe('*');
    });
  });

  describe('All ships sank', () => {
    beforeEach(() => {
      Object.keys(ships).forEach((key) => {
        for (let i = 0; i < ships[key].length; i++) {
          ships[key].hit();
        }
      });
    });

    test('allShipsSunk() should return true', () => {
      expect(gameBoard.allShipsSunk()).toBe(true);
    });
  });

});