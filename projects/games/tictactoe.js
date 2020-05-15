var turns = 0;
var playerTurn = 1;
var playerChar = "";
var p1Char = "1";
var p2Char = "2";
var winChar = "W";
var winner = 0;
var p1Tot = localStorage.getItem("tp1Score")
var p2Tot = localStorage.getItem("tp2Score")
var board = [
		[' ',' ',' '],
		[' ',' ',' '],
		[' ',' ',' ']];

function nextTurn(col) {
	playerTurn == 1 ? playerChar = p1Char : playerChar = p2Char;
	document.getElementById("startBtn").style.display = "none";
	getChoice(col);
	winner = checkWin();
	updateBoard();	
	if(winner) {
		setTimeout(function() {
			var winTxt = "Player " + winner + " wins!";
			if(winner == 1) { 
				p1Tot++;
				localStorage.setItem("tp1Score",p1Tot);
				document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("tp1Score");
			}else {
				p2Tot++;
				localStorage.setItem("tp2Score",p2Tot);
				document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("tp2Score");
			}
			document.getElementById("overText").innerHTML = winTxt;
			document.getElementById("startBtn").innerHTML = "Play again?";
			document.getElementById("startBtn").style.display = "inline-block";
		},1000);		
	} else {
		if(turns >= 8) {
			setTimeout(function() {
				document.getElementById("overText").innerHTML = "DRAW! No-one wins!";
				document.getElementById("startBtn").innerHTML = "Play again?";
				document.getElementById("startBtn").style.display = "block";
			},1000);
		}
		playerTurn = 3 - playerTurn;
		var txt = "Player " + playerTurn + "'s turn!";
		document.getElementById("overText").innerHTML = txt;
		turns++;
	}
}

function cellToRC(cell) {
	var row = 0;
	var col = 0;
	switch(cell) {
		case 1:
			row = 0;
			col = 0;
			break;
		case 2:
			row = 0;
			col = 1;
			break;
		case 3:
			row = 0;
			col = 2;
			break;
		case 4:
			row = 1;
			col = 0;
			break;
		case 5:
			row = 1;
			col = 1;
			break;
		case 6:
			row = 1;
			col = 2;
			break;
		case 7:
			row = 2;
			col = 0;
			break;
		case 8:
			row = 2;
			col = 1;
			break;
		case 9:
			row = 2;
			col = 2;
			break;
	}
	/*
	var row = Math.floor(cell / 3);
	var col = Math.floor(cell % 3) - 1;
	if(cell==3) {row = 0};
	if(cell==6) {row = 1};
	if(row == 3) {row = +2};
	if(col == -1) {col = +2};
*/
	var rowCol = {
		row: row,
		col: col
	}
	return rowCol;
}

function isValid(cell) {
	var rowCol = cellToRC(cell);
	var row = rowCol.row;
	var col = rowCol.col;
	
	//console.log("Cell: " + cell + " Row: " + row + " Col: " + col);
	if(board[row][col] == p1Char || board[row][col] == p2Char) {
		return false;
	}else {
		return true;
	}
}

function getChoice(cell) {
	var rowCol = cellToRC(cell);
	var row = rowCol.row;
	var col = rowCol.col;
	playerTurn == 1 ? playerChar = p1Char : playerChar = p2Char;

	//Add choice to array
	if(board[row][col] == " ") {
		board[row][col] = playerChar;
	}
}

function updateBoard() {
	document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("tp1Score");
	document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("tp2Score");
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var w = 400;
	var h = 400;
	var pad = 30;
	ctx.canvas.width  = w + pad;
	ctx.canvas.height = h + pad;
	var s = w / 3;
	canvas.addEventListener('mousedown', onCanvasClick, false);
	function onCanvasClick() {
		var ev = event;
		var x = ev.pageX - canvas.offsetLeft;
		var y = ev.pageY - canvas.offsetTop;
		var cellChoice = 0;
		//console.log(x + ", " + y);
		if(x >= 0 && x < s) {
			if(y >= 0 && y < s) {
				cellChoice = 1;
			} else if(y >= s && y < 2*s) {
				cellChoice = 4;
			} else if(y >= 2*s && y < 3*s) {
				cellChoice = 7;
			}
		} else if(x >= s && x < 2*s) {
			if(y >= 0 && y < s) {
				cellChoice = 2;
			} else if(y >= s && y < 2*s) {
				cellChoice = 5;
			} else if(y >= 2*s && y < 3*s) {
				cellChoice = 8;
			}
		} else if(x >= 2*s && x < 3*s) {
			if(y >= 0 && y < s) {
				cellChoice = 3;
			} else if(y >= s && y < 2*s) {
				cellChoice = 6;
			} else if(y >= 2*s && y < 3*s) {
				cellChoice = 9;
			}
		} 

		if(!cellChoice == 0) {
			if(!isValid(cellChoice)) {
				document.getElementById("overText").innerHTML = "That cell is not available, Player " + playerTurn + " try another.";
			} else {
				nextTurn(cellChoice);
				canvas.removeEventListener('mousedown', onCanvasClick, false);
			}
		} 
	}
	drawBoard();
}

function drawBoard() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var s = canvas.width / 3;
	var pad = 30;

	let rows = board.length;
	let cols = board[0].length;
	for(let i= 0; i < rows; i++) {
		for(let j= 0; j < cols; j++) {
			var p = s/2;
			var xPos = j*s + p;
			var yPos = i*s + p;
						
			ctx.font = "50px Arial";
			ctx.lineWidth = 2;
			ctx.strokeStyle = "black";
			ctx.fillStyle = "black";

			ctx.beginPath();
			//Draw squares
			ctx.moveTo(xPos - p,yPos - p);
			ctx.lineTo(xPos + p,yPos - p);
			ctx.lineTo(xPos + p,yPos + p);
			ctx.lineTo(xPos - p,yPos + p);
			ctx.lineTo(xPos - p,yPos - p);
			ctx.closePath();
			ctx.fillStyle = "grey";
			ctx.fill();
			ctx.stroke();

			if(board[i][j] == winChar) {
				ctx.beginPath();
				//Draw winning squares
				ctx.moveTo(xPos - p,yPos - p);
				ctx.lineTo(xPos + p,yPos - p);
				ctx.lineTo(xPos + p,yPos + p);
				ctx.lineTo(xPos - p,yPos + p);
				ctx.lineTo(xPos - p,yPos - p);
				ctx.closePath();
				ctx.fillStyle = "rgba(54, 125, 217, 0.5)";
				//ctx.fillStyle = "pink";
				ctx.fill();
				ctx.stroke();
			}
			
			if(board[i][j] == p1Char || (winner == 1 && board[i][j] == winChar)) {
				//Draw O
				//ctx.fillStyle = "rgb(54, 125, 217)";
				ctx.fillStyle = "rgb(27, 143, 33)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, 50, 0, 2*Math.PI);
				ctx.closePath();
				ctx.moveTo(xPos ,yPos);
				ctx.arc(xPos, yPos, 30, 2*Math.PI, 0,true);
				ctx.fill();
			} else if(board[i][j] == p2Char || (winner == 2 && board[i][j] == winChar)){
				//Draw X
				ctx.strokeStyle = "rgb(217, 44, 60)";
				ctx.lineWidth = 20;
				ctx.beginPath();
				ctx.moveTo(xPos - 45,yPos - 45);
				ctx.lineTo(xPos + 45,yPos + 45);
				ctx.moveTo(xPos + 45,yPos - 45);
				ctx.lineTo(xPos - 45,yPos + 45);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
}

function checkWin() {
	var player = playerTurn;
	let rows = board.length;
	let cols = board[0].length;
	if (turns > 3) {
		for(let i= 0; i < rows; i++) {
			for(let j= 0; j < cols; j++) {
				if(board[i][j] == playerChar) {
					if((board[0][j] == board[1][j]) && (board[1][j] == board[2][j])) {
						//console.log("Player " + playerTurn + " wins horizontally!");
						board[0][j] = winChar;
						board[1][j] = winChar;
						board[2][j] = winChar;
						return player;
					}
					if((board[i][0] == board[i][1]) && (board[i][1] == board[i][2])) {
						//console.log("Player " + playerTurn + " wins vertically!");
						board[i][0] = winChar;
						board[i][1] = winChar;
						board[i][2] = winChar;
						return player;
					}
					if((board[0][0] == board[1][1]) && (board[1][1] == board[2][2])) {
						//console.log("Player " + playerTurn + " wins diagonally right!");
						board[0][0] = winChar;
						board[1][1] = winChar;
						board[2][2] = winChar;
						return player;
					}
				}
				if((board[0][2] == playerChar) && (board[0][2] == board[1][1]) && (board[1][1] == board[2][0])) {
					//console.log("Player " + playerTurn + " wins diagonally left!");
					board[0][2] = winChar;
					board[1][1] = winChar;
					board[2][0] = winChar;
					return player;
				}
			}
		}
	}
	
	return 0;
}

function replay() {
	window.location.reload();
}

function resetScores() {
	localStorage.setItem("tp1Score",0);
	localStorage.setItem("tp2Score",0);
	replay();

}