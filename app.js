let cols = 9;
let rows = 9;
let width = 30;
let nBomb = 0;
let scores = 0;
let canClickCanvas = true;


function make2DArray() {
    let arr = [...Array(rows)].map(x => Array(cols).fill(0));
    return arr;
}

function mousePressed() {
    if (canClickCanvas == true) {
        if (mouseButton === LEFT) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {

                    if (i * width < mouseX && mouseX < i * width + width && j * width < mouseY && mouseY < j * width + width) {
                        if (grid[i][j].flag == false) {
                            grid[i][j].reveal = true;
                            if (grid[i][j].bomb == true) {
                                gameOver(false);
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x + i > -1 && x + i < rows && y + j > -1 && y + j < cols) {
                                if (grid[x + i][j + y].reveal == true && grid[x + i][j + y].total == 0) {
                                    grid[i][j].reveal = true;
                                }
                            }
                        }
                    }
                }
            }
            for (let i = rows - 1; i >= 0; i--) {
                for (let j = cols - 1; j >= 0; j--) {
                    for (let x = 1; x >= -1; x--) {
                        for (let y = 1; y >= -1; y--) {
                            if (x + i > -1 && x + i < rows && y + j > -1 && y + j < cols) {
                                if (grid[x + i][j + y].reveal == true && grid[x + i][j + y].total == 0) {
                                    grid[i][j].reveal = true;
                                }
                            }
                        }
                    }
                }
            }
            //forsure
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    for (let x = -1; x <= 1; x++) {
                        for (let y = -1; y <= 1; y++) {
                            if (x + i > -1 && x + i < rows && y + j > -1 && y + j < cols) {
                                if (grid[x + i][j + y].reveal == true && grid[x + i][j + y].total == 0) {
                                    grid[i][j].reveal = true;
                                }
                            }
                        }
                    }
                }
            }
            for (let i = rows - 1; i >= 0; i--) {
                for (let j = cols - 1; j >= 0; j--) {
                    for (let x = 1; x >= -1; x--) {
                        for (let y = 1; y >= -1; y--) {
                            if (x + i > -1 && x + i < rows && y + j > -1 && y + j < cols) {
                                if (grid[x + i][j + y].reveal == true && grid[x + i][j + y].total == 0) {
                                    grid[i][j].reveal = true;
                                }
                            }
                        }
                    }
                }
            }
            //update score
            updateScore()
        } else if (mouseButton === CENTER) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (i * width < mouseX && mouseX < i * width + width && j * width < mouseY && mouseY < j * width + width) {
                        if (grid[i][j].flag === false && grid[i][j].reveal === false) {
                            grid[i][j].flag = true;
                        } else {
                            grid[i][j].flag = false;
                        }
                    }
                }
            }
        }
    }
}

//updateScore
function updateScore() {
    if (canClickCanvas) {
        scores = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j].reveal == true) {
                    scores++;
                }
            }
        }
        if (floor((scores / (cols * rows - nBomb)) * 100) == 100)
            gameOver(true);
        document.querySelector(".showScore").textContent = floor((scores / (cols * rows - nBomb)) * 100);
    }
}
//
function gameOver(win) {
    canClickCanvas = false;
    if (win === false)
        document.querySelector(".showGameOver").textContent = "GAMEOVER!!!";
    else {
        document.querySelector(".showGameOver").textContent = "!!! YOU WIN !!!";
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].reveal = true;
        }
    }
    clearTimeout(t);
}
//
function setup() {
    h1 = document.querySelector('.showTime');
    nBomb = 0;
    scores = 0;
    canClickCanvas = true;
    canvas = createCanvas(width * rows, width * cols);
    background(153);
    grid = make2DArray();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i * width, j * width, width);
            if (grid[i][j].bomb == true) {
                nBomb++;
            }
        }
    }
    document.querySelector(".nBOMB").textContent = nBomb;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].countBomb(i, j);
        }
    }
}

function draw() {
    document.querySelector(".clickNewGame").addEventListener('click', newGame);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}
function newGame() {
    clearTimeout(t);
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    timer();
    document.querySelector(".showGameOver").textContent = "";
    document.querySelector(".showScore").textContent = 0;
    var x = document.getElementById("levelSelector").value;
    if (x == "Easy") {
        cols = 9;
        rows = 9;
        setup();
    } else if (x == "Medium") {
        cols = 12;
        rows = 12;
        setup();
    } else {
        cols = 15;
        rows = 15;
        setup();
    }
}



