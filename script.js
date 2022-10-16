let gameBoardDiv = document.getElementById('gameBoard');

const gameBoard = (() => {
  let gameBoard = new Array(9);

  const populateArray = () => {
    for (let i = 0; i < gameBoard.length; i++){
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'square');
      newDiv.textContent = '';
      gameBoard[i] = newDiv;
      newDiv.addEventListener('click', ()=> {isThereAWinner(turn, newDiv)});
    }
  };

  //Maybe we can replace isThereAWinner with a passing function that looks whether there is a winner or not
  // and if there is closes everything. If there's not makes a mark. Something like: lookForAMark().
  const printArray = () => {
    gameBoard.forEach((element) => {
      gameBoardDiv.appendChild(element);
    });
  }

  const isThereAWinner = (localTurn, newDiv) =>{
    if (!(checkWinner(player1) || checkWinner(player2))){
      let player = localTurn === 1? player1: player2;
      changeMark(localTurn, newDiv, player);
    } else{
      let winner = checkWinner(player1)? 'player 1': 'player 2';
      console.log(winner);
    }

    
  };

  const changeMark = (localTurn, newDiv, player) => {
    if (newDiv.textContent === ''){
      newDiv.textContent = player.mark;
      turn = localTurn === 1? 2: 1;
    }
  };

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

  const checkEquality = (num1, num2, num3, player) => {
    return gameBoard[num1].textContent != player.mark? false: 
           gameBoard[num2].textContent != player.mark? false:
           gameBoard[num3].textContent != player.mark? false: true;
  }

  return {
    populateArray,
    printArray,
    checkEquality,
  }
})();

const Player = (mark) => {
  return {
    mark,
  }
};

const player1 = Player('x');
const player2 = Player('O');
let turn = 1;


window.addEventListener('load', () =>{
  gameBoard.populateArray();
  gameBoard.printArray();
});