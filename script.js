let gameBoardDiv = document.getElementById('gameBoard');
let winnerDiv = document.getElementById('winner');
let turnParagraph = document.getElementById('turn');

let xButton = document.getElementById('x-button');
let oButton = document.getElementById('o-button');
let start = document.getElementById('start');
let end = document.getElementById('end');
let newRound = document.getElementById('new-round');

const gameBoard = (() => {
  let gameBoard = new Array(9);

  const populateArray = () => {
    for (let i = 0; i < gameBoard.length; i++){
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'square');
      newDiv.textContent = '';
      gameBoard[i] = newDiv;
      newDiv.addEventListener('click', () => {canIMakeAMark(turn, newDiv)});
      printTurn();
    }
  };
  
  const printTurn = () => {
    turnParagraph.innerText = `Player turn: ${getPlayer(turn).mark}`;
  }

  const cleanArray = () =>{
    gameBoard.forEach(element => element.textContent = '');
  }

  const printArray = () => {
    gameBoard.forEach((element) => {
      gameBoardDiv.appendChild(element);
    });
  }

  const canIMakeAMark = (localTurn, newDiv) =>{
    if(!isThereAWinner()){
      let player = getPlayer(localTurn);
      changeMark(localTurn, newDiv, player);
    }
  }

  const getPlayer = (localTurn) =>{
    return localTurn === 1? players[0]: players[1];
  }

  const isThereAWinner = () =>{
    return checkWinner(players[0]) || checkWinner(players[1]);
  };


  const changeMark = (localTurn, newDiv, player) => {
    if (newDiv.textContent === ''){
      newDiv.textContent = player.mark;
      turn = localTurn === 1? 2: 1;
      printTurn();

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
    gameBoardDiv.setAttribute('style', 'display: none;');
    end.setAttribute('style', 'display: block;');
    round++;
    turn = 1;
    cleanArray();
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
    gameBoardDiv.setAttribute('style', 'display: none;');
    end.setAttribute('style', 'display: block;');
    round++;
    turn = 1;
    cleanArray();
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
let round = 0;

let createInterface = () => {
  start.setAttribute('style', 'display: none;');
  gameBoard.populateArray();
  gameBoard.printArray();
}

let recreateInterface = () =>{
  start.setAttribute('style', 'display: none;');
  gameBoardDiv.setAttribute('style', 'display: grid;');
}

let populatePlayers = (mark1, mark2) => {players = [Player(mark1), Player(mark2)];}


xButton.addEventListener('click', () =>{
  populatePlayers('X', 'O');
  if (round === 0){
    createInterface();
  } else{
    recreateInterface();
  }
});


oButton.addEventListener('click', () => {
  populatePlayers('O', 'X');
  if (round === 0){
    createInterface();
    }
  else{
    recreateInterface();
  }
})

newRound.addEventListener('click', () =>{
  end.setAttribute('style', 'display: none;');
  start.setAttribute('style', 'display: flex;');
})