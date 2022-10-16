let gameBoardDiv = document.getElementById('gameBoard');

const gameBoard = (() => {
  let gameBoard = new Array(9);

  let populateArray = () => {
    for (let i = 0; i < gameBoard.length; i++){
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'square');
      newDiv.textContent = '';
      gameBoard[i] = newDiv;
      newDiv.addEventListener('click', ()=> {changeMark(turn, newDiv)});
    }
  };

  let printArray = () => {
    gameBoard.forEach((element) => {
      gameBoardDiv.appendChild(element);
    });
  }

  let changeMark = (turn, newDiv) => {
    let player = turn === 1? player1: player2;
    newDiv.textContent = player.mark;
  };

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

const player1 = Player('x');
const player2 = Player('O');
let turn = 1;


window.addEventListener('load', () =>{
  gameBoard.populateArray();
  gameBoard.printArray();
});