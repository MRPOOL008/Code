const xClass = 'x'
const oClass = 'o'
const cellElements = document.querySelectorAll('[data-cell]')
const winningMessageText = document.querySelector('[data-cell-winning-text]')
const winningMessageElement = document.getElementById('winningmessage')
const restartButton = document.getElementById('restartButton')
const board = document.getElementById('board')
let circleTurn
const winningCombinations = [
    [0, 1, 2],
    [3, 4 ,5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()

restartButton.addEventListener('click',startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.removeEventListener('click', handleclick)
        cell.addEventListener('click', handleclick, {once: true})
    })
    setBoardHoverClass()

    winningMessageElement.classList.remove('show')
}

function handleclick(e){
    const cell = e.target
    const currentClass = circleTurn ? oClass : xClass
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isdraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMessageText.innerText = "Draw!"
    }
    else{
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isdraw(){
    return [...cellElements].every( cell => {
        return cell.classList.contains(oClass) || cell.classList.contains(xClass)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(xClass)
    board.classList.remove(oClass)
    if(circleTurn){
        board.classList.add(oClass)
    }
    else{
        board.classList.add(xClass)
    }
}

function checkWin(currentClass){
    return winningCombinations.some( combination => {
        return combination.every( index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}