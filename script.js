var start = document.querySelector(".start")
var start_game = document.querySelector(".start-game")
var game_over = document.querySelector(".game-over")
var game = document.querySelector(".game")
var restart = document.querySelector(".restart")
let intervalId;
var board = document.querySelector(".board")
var blockheight = 30
var blockwidth = 30

const rows = Math.floor(board.clientHeight / blockheight)
const cols = Math.floor(board.clientWidth / blockwidth)
const high_score = document.querySelector(".high_score")
const score = document.querySelector(".score")
const time = document.querySelector(".time")
let normalscore = 0
let high = 0
let ti = `00-00`
//make an direction var for taking the input from the user

// array blocks for making the 2d vector/array\
const blocks = []
//lets make a snaks array where we gonna push our cordinates
let snakes = [
    { x: 1, y: 20 }
]
let direction = 'down'

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        // block.innerText=`${i}-${j}`
        blocks[`${i}-${j}`] = block

    }

}
let foods = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
function showSnake() {
    let head = null
    blocks[`${foods.x}-${foods.y}`].classList.add("food_color")

    if (direction == 'up') {
        head = { x: snakes[0].x - 1, y: snakes[0].y }
    }
    else if (direction == 'down') {
        head = { x: snakes[0].x + 1, y: snakes[0].y }

    } else if (direction == 'left') {
        head = { x: snakes[0].x, y: snakes[0].y - 1 }
    } else if (direction == 'right') {
        head = { x: snakes[0].x, y: snakes[0].y + 1 }

    }
    //remove the previous one
    // this is our food consume logic
    if (head.x == foods.x && head.y == foods.y) {
        blocks[`${foods.x}-${foods.y}`].classList.remove("food_color")
        foods = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${foods.x}-${foods.y}`].classList.add("food_color")
        snakes.unshift(head)
        normalscore += 10
        score.innerText = `score : ${normalscore}`
        if (high < normalscore) {
            high = normalscore
            localStorage.setItem("high", high.toString())
            high_score.innerText=high
        }

    }
    if (head.x < 0 || head.y < 0 || head.x > rows || head.y > cols) {

        clearInterval(intervalId)
        start.style.display = 'flex'
        game_over.style.display = 'flex'
        start_game.style.display = 'none'
        return;

    }
    snakes.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("snake_color")
    })

    snakes.unshift(head)//adds new elements
    snakes.pop()
    snakes.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("snake_color")
    })
}


addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = 'up'
    } else if (event.key == "ArrowDown") {
        direction = 'down'
    } else if (event.key == "ArrowLeft") {
        direction = 'left'
    }
    else if (event.key == "ArrowRight") {
        direction = 'right'
    }
    else {
        alert("you typed a wrong key")
    }
})



function main() {
    game.addEventListener("click", () => {
        start.style.display = 'none'

        intervalId = setInterval(() => {

            showSnake()
        }, 400);
    })

    restart.addEventListener("click", () => {
        blocks[`${foods.x}-${foods.y}`].classList.remove("food_color")
        snakes.forEach((segment) => {
            blocks[`${segment.x}-${segment.y}`].classList.remove("snake_color")
        })

        start.style.display = 'none'
        direction = 'down'
        snakes = [
            { x: 3, y: 20 }
        ]
        foods = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        intervalId = setInterval(() => {
            showSnake()
        }, 400);


    })
}
main()