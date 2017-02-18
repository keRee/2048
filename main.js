var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');

var score = 0;
var size = 4;
var width = canvas.width / size - 6;

var cells = [];
var fontSize;
var lose = false;

startGame();
changeSize.onclick = function () {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    startGame();
  }
}
function cell(row, col){
	this.value = 0;
	this.x = col * width + 5 * (col + 1);
	this.y = row * width + 5 * (row + 1);
}

function createCells(){
	for(var i=0;i<size;i++){
		cells[i] = [];
		for(var j=0;j<size;j++){
			cells[i][j] = new cell(i, j);
		}
	}
}

function drawAllCells() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}


function drawCell(cell){
	ctx.beginPath();
	ctx.rect(cell.x, cell.y, width, width);

	switch(cell.value){
		case 0: ctx.fillStyle = "#ccc0b0";break;
		case 2: ctx.fillStyle = "#eee4da";break;
		case 4: ctx.fillStyle = "#ece0c8";break;
		case 8: ctx.fillStyle = "#f2b179";break;
		case 16: ctx.fillStyle = "#f59563";break;
		case 32: ctx.fillStyle = "#f57c5f";break;
		case 64: ctx.fillStyle = "#eb5837";break;
		case 128: ctx.fillStyle = "#e1bb00";break;
		case 256: ctx.fillStyle = "#f4ce4f";break;
		case 512: ctx.fillStyle = "#CD950C";break;
		case 1024: ctx.fillStyle = "#e3ad15";break;
		case 2048: ctx.fillStyle = "#edbf05";break;
		case 4096: ctx.fillStyle = "#ffa570";break;
		default : ctx.fillStyle = "#ccc0b0";
	}

	ctx.fill();

	if (cell.value) {
		var fontSize1 = width*3/8;
	    fontSize = width/2;
	    ctx.font = fontSize + "px Arial";
	    //ctx.fillStyle = '#999';
	    switch(cell.value){
	    	case 2: ctx.fillStyle = "#888";break;
	    	case 4: ctx.fillStyle = "#999";break;
	    	default: ctx.fillStyle = "#E3E3E3";
	    	
	    }
	    switch(cell.value){
	    	case 1024: ctx.font = fontSize1 + "px Arial";break;
	    	case 2048: ctx.font = fontSize1 + "px Arial";break;
	    	case 4096: ctx.font = fontSize1 + "px Arial";break;
	    	default:  ctx.font = fontSize + "px Arial";
	    	
	    }
	    ctx.textAlign = "center";
	    ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
	  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
  if (!lose) {
    if (event.keyCode == 38 || event.keyCode == 87) moveUp();
    else if (event.keyCode == 39 || event.keyCode == 68) moveRight();
    else if (event.keyCode == 40 || event.keyCode == 83) moveDown();
    else if (event.keyCode == 37 || event.keyCode == 65) moveLeft();
    scoreLabel.innerHTML = "Score : " + score;
  }
}

function finishGame() {
  canvas.style.opacity = "0.5";
  lose = true;
}

function drawAllCells() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell() {
  var countFree = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if (!countFree){
    finishGame();
    return;
  }


  while (true) {
    var row = Math.floor(Math.random() * size);
    var coll = Math.floor(Math.random() * size);
    if (!cells[row][coll].value) {
      cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
      drawAllCells();
      return false;
     }
  }
}

function moveRight () {
  for (var i = 0; i < size; i++) {
    for (var j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        var coll = j;
        while (coll + 1 < size) {
          if (!cells[i][coll + 1].value) {
            cells[i][coll + 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll++;
          }
          else if (cells[i][coll].value == cells[i][coll + 1].value) {
            cells[i][coll + 1].value *= 2;
            score +=  cells[i][coll + 1].value;
            cells[i][coll].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}

function moveLeft() {
  for (var i = 0; i < size; i++) {
    for (var j = 1; j < size; j++) {
      if (cells[i][j].value) {
        var coll = j;
        while (coll - 1 >= 0) {
          if (!cells[i][coll - 1].value) {
            cells[i][coll - 1].value = cells[i][coll].value;
            cells[i][coll].value = 0;
            coll--;
          }
          else if (cells[i][coll].value == cells[i][coll - 1].value) {
            cells[i][coll - 1].value *= 2;
            score +=   cells[i][coll - 1].value;
            cells[i][coll].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}

function moveUp() {
  for (var j = 0; j < size; j++) {
    for (var i = 1; i < size; i++) {
      if (cells[i][j].value) {
        var row = i;
        while (row > 0) {
          if (!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          }
          else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}

function moveDown() {
  for (var j = 0; j < size; j++) {
    for (var i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        var row = i;
        while (row + 1 < size) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          }
          else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          }
          else break;
        }
      }
    }
  }
  pasteNewCell();
}

function startGame(){
	createCells();
    drawAllCells();
    pasteNewCell();
    pasteNewCell();
}