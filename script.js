let gameBoardDiv = document.getElementById('gameBoard');
let winnerDiv = document.getElementById('winner');

let xButton = document.getElementById('x-button');
let oButton = document.getElementById('o-button');
let start = document.getElementById('start');

const gameBoard = (() => {
  let gameBoard = new Array(9);

  const populateArray = () => {
    for (let i = 0; i < gameBoard.length; i++){
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'square');
      newDiv.textContent = '';
      gameBoard[i] = newDiv;
      newDiv.addEventListener('click', ()=> {canIMakeAMark(turn, newDiv)});
    }
  };
  
  const printArray = () => {
    gameBoard.forEach((element) => {
      gameBoardDiv.appendChild(element);
    });
  }

  const canIMakeAMark = (localTurn, newDiv) =>{
    if(!isThereAWinner()){
      let player = localTurn === 1? players[0]: players[1];
      changeMark(localTurn, newDiv, player);
    }
  }

  const isThereAWinner = () =>{
    return checkWinner(players[0]) || checkWinner(players[1]);
  };

  const changeMark = (localTurn, newDiv, player) => {
    if (newDiv.textContent === ''){
      newDiv.textContent = player.mark;
      turn = localTurn === 1? 2: 1;

      if(checkWinner(player)){
        printWinner(player);
      } else if (checkDraw()){
        printDraw();
      }
    }
  };

  const checkDraw = () =>{
    let noDraw = false;
    gameBoard.forEach(element => {
      noDraw = (element.textContent === '' || noDraw);
    });
    return !noDraw;
  }

  const printDraw = () => {
    winnerDiv.textContent = `It is a draw`;
  }

  const checkWinner = (player) => {
    //Check rows
    let row1 = checkEquality(0, 1, 2, player);

    let row2 = checkEquality(3, 4, 5, player);

    let row3 = checkEquality(6, 7, 8, player);

    if (row1 || row2 || row3) return true;
    

    //Check columns
    let colum1 = checkEquality(0, 3, 6, player);

    let colum2 = checkEquality(1, 4, 7, player);
                 
    let colum3 = checkEquality(2, 5, 8, player);
    
    if (colum1 || colum2 || colum3) return true;
    
    
    //Check Diagonals
    let diagonal1 = checkEquality(0, 4, 8, player);

    let diagonal2 = checkEquality(2, 4, 6, player);

    if (diagonal1 || diagonal2) return true;

    return false;
  };

  const printWinner = (winner) =>{
    winnerDiv.textContent = `The winner is: ${winner.mark}`;
  }

  const checkEquality = (num1, num2, num3, player) => {
    return gameBoard[num1].textContent != player.mark? false: 
           gameBoard[num2].textContent != player.mark? false:
           gameBoard[num3].textContent != player.mark? false: true;
  }

  return {
    populateArray,
    printArray,
  }
})();

const Player = (mark) => {
  return {
    mark,
  }
};

let players = [];
let turn = 1;

let createInterface = () => {
  start.setAttribute('style', 'display: none;');
  gameBoard.populateArray();
  gameBoard.printArray();
}

let populatePlayers = (mark1, mark2) => {players = [Player(mark1), Player(mark2)];}


xButton.addEventListener('click', () =>{
  createInterface();
  populatePlayers('X', 'O');
});


oButton.addEventListener('click', () => {
  createInterface();
  populatePlayers('O', 'X');
})