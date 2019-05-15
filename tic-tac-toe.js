//players = X and O
//take turns inputing their position using 1 - 9 in the command line
/*

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

*/

const prompt = require('prompt');

let board = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
  7: '',
  8: '',
  9: ''
}

//mark position on the board with an X or O after position selected by player
const markPosition = (position, player) => {
  board[position] = player;
}

//print the board
const printBoard = () => {
  console.log(
    `  ${board[1]} | ${board[2]} | ${board[3]} \n -------- \n ${board[4]} | ${board[5]} | ${board[6]} \n -------- \n ${board[7]} | ${board[8]} | ${board[9]} \n`
  );
};
//confirm that the inputted value is an integer (boolean)
const isInteger = (value) => {
  if (isNaN(value) || !Number.isInteger(value)) {
    return false;
  }
  return true;
};
//validate the position - make sure that the inputted is an integer and there isn't already something there (it's empty '')
const validateMove = (position) => {
  if (isInteger(position) && board[position] === '') {
    return true;
  }
  return false;
}

//store winning combinations
const winningCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
[2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

//determine if the passed in player just won - is there a winning combination
const validateWin = (player) => {
  for (var i = 0; i < winningCombination.length; i++) {
    var count = 0;
    for (var j = 0; j < winningCombination[i].length; j++) {
        if (board[winningCombination[i][j]] === player) {
            count++;
        }
        if (count === 3) {
            return true;
        }
    }
}
return false;
};

const handlePlayerTurn = (player) => {
  console.log(`Player ${player}'s turn`);
  prompt.start();
  prompt.get(['position'], (err, res) => {
    if(validateMove(res.position)) {
      markPosition(res.position, player);
      printBoard();
      if(validateWin(player)) {
        console.log('We have a winner!');
        return;
      }

      if (player === 'X') {
        handlePlayerTurn('O');
      } else {
        handlePlayerTurn('X');
      }
    } else {
      console.log('that\'s not a valid move. Try again!');
      handlePlayerTurn(player);
    }
  })
}

console.log('Game started: \n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

handlePlayerTurn('X');


