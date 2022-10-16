let gameBoardDiv = document.getElementById('gameBoard');

const gameBoard = (() => {
  let gameBoard = new Array(9);

  let populateArray = () => {
    for (let i = 0; i < gameBoard.length; i++){
      gameBoard[i] = 'x';
    }
  };

  let printArray = () => {
    gameBoard.forEach((element) => {
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'square');
      newDiv.textContent = element;
      gameBoardDiv.appendChild(newDiv);
    });
  }
  return {
    populateArray,
    printArray,
  }
})();

window.addEventListener('load', () =>{
  gameBoard.populateArray();
  gameBoard.printArray();
});