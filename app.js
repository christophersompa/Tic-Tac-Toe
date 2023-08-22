const x_class = 'x';
const circle_class = 'circle'
const winning_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMsgElement = document.getElementById('winningMsg');
const restartBtn = document.getElementById('restartButton');
const winningMsgTextElement = document.querySelector('[data-winning-msg-text]')
let circleTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
        // only does a click event once
    })
    setBoardHoverClass()
    winningMsgElement.classList.remove('show');
}

function handleClick(e){
    const cell = e.target; 
    // whatever cell we clicked/target
   
    const currentClass =  circleTurn ? circle_class : x_class;
    // if its circleTurn return the circle class or the x class 
    
    placeMark(cell, currentClass);
    //place mark
    
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
    // check for win or draw and swaps turn 
}

function endGame(draw){
    if(draw){
        winningMsgTextElement.innerText = 'Draw!';
    } else {
        winningMsgTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
        winningMsgElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurn(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(x_class);
    board.classList.remove(circle_class);
    if(circleTurn){
        board.classList.add(circle_class);
    } else {
        board.classList.add(x_class);
    }
}

function checkWin(currentClass){
    return winning_combo.some(combo => {
        return combo.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
