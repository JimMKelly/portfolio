var turns = 0;
var playerTurn = 1;
var playerChar = "";
var p1Char = "1";
var p2Char = "2";
var winChar = "W";
var winner = 0;
var p1Tot = localStorage.getItem("c4p1Score")
var p2Tot = localStorage.getItem("c4p2Score")
var showPlayer = false;

var board = [
		[' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' '],
		[' ',' ',' ',' ',' ',' ',' ']
	];

function showPlayerNum(){
	showPlayer = !showPlayer;
	if(showPlayer) {
		document.getElementById("showPlayer").innerHTML = "Hide player number.";
	} else {
		document.getElementById("showPlayer").innerHTML = "Show player number.";
	}
	drawBoard();
}

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
				localStorage.setItem("c4p1Score",p1Tot);
				document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("c4p1Score");
			}else {
				p2Tot++;
				localStorage.setItem("c4p2Score",p2Tot);
				document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("c4p2Score");
			}
			document.getElementById("overText").innerHTML = winTxt;
			document.getElementById("startBtn").innerHTML = "Play again?";
			document.getElementById("startBtn").style.display = "inline-block";
		},1000);		
	} else {
		if(turns>=41) {
			setTimeout(function() {
				document.getElementById("overText").innerHTML = "DRAW! No-one wins!";
				document.getElementById("startBtn").innerHTML = "Play again?";
				document.getElementById("startBtn").style.display = "inline-block";
			},1000);
		}
		playerTurn = 3 - playerTurn;
		var txt = "Player " + playerTurn + "'s turn!";
		document.getElementById("overText").innerHTML = txt;
		turns++;
	}
}

function isValid(n) {
	if(board[5][n-1] == p1Char || board[5][n-1] == p2Char) {
		return false;
	}else {
		return true;
	}
}

function getChoice(col) {
	var colChoice = col;
	playerTurn == 1 ? playerChar = p1Char : playerChar = p2Char;

	//Add choice to array
	var leaveLoop = false;
	let rows = board.length;
	let cols = board[0].length;
	for(let i= 0; i < rows; i++) {
		if(leaveLoop) {break;}
		for(let j= 0; j < cols; j++) {
			if(j == (+colChoice - 1) && board[i][j] == " ") {
				board[i][j] = playerChar;
				leaveLoop = true;
				break;
			}			
		}
	}
}

function updateBoard() {
	document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("c4p1Score");
	document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("c4p2Score");
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var w = 700;
	var h = 600;
	ctx.canvas.width  = w;
	ctx.canvas.height = h;

	canvas.addEventListener('mousedown', onCanvasClick, false);
	function onCanvasClick() {
		var ev = event;
		var x = ev.pageX - canvas.offsetLeft;
		var y = ev.pageY - canvas.offsetTop;
		var colChoice = 0;
		if(x >= 0 && x < 100) {
			colChoice = 1;
		} else if(x >= 100 && x < 200) {
			colChoice = 2;
		} else if(x >= 200 && x < 300) {
			colChoice = 3;
		} else if(x >= 300 && x < 400) {
			colChoice = 4;
		} else if(x >= 400 && x < 500) {
			colChoice = 5;
		} else if(x >= 500 && x < 600) {
			colChoice = 6;
		} else if(x >= 600 && x < 700) {
			colChoice = 7;
		}
		if(!colChoice == 0) {
			if(!isValid(colChoice)) {
				document.getElementById("overText").innerHTML = "That column is full, Player " + playerTurn + " try another.";
			} else {
				nextTurn(colChoice);
				canvas.removeEventListener('mousedown', onCanvasClick, false);
			}
		} 
	}
	drawBoard();
}

function drawBoard() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	ctx.font = "50px Arial";
	let rows = board.length;
	let cols = board[0].length;
	for(let i= 0; i < rows; i++) {
		for(let j= 0; j < cols; j++) {
			var xPos = j*100 + 50;
			var yPos = (4-i)*100 + 150;
			//Draw grid
			//Draw squares
			ctx.beginPath();
			ctx.moveTo(xPos - 50,yPos - 50);
			ctx.lineTo(xPos + 50,yPos - 50);
			ctx.lineTo(xPos + 50,yPos + 50);
			ctx.lineTo(xPos - 50,yPos + 50);
			ctx.lineTo(xPos - 50,yPos - 50);
			ctx.closePath();

			//Draw cricles
			ctx.moveTo(xPos + 45,yPos);
			ctx.arc(xPos, yPos, 45, 2*Math.PI, 0,true);
			ctx.closePath();
			ctx.fillStyle = "grey";
			ctx.fill();
			ctx.stroke();

			if(board[i][j] == p1Char || (winner == 1 && board[i][j] == winChar)) {
				ctx.fillStyle = "rgb(54, 125, 217)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, 44, 0, 2*Math.PI);
				ctx.fill();
				if(showPlayer || (winner == 1 && board[i][j] == winChar)){
					ctx.fillStyle = "black";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(board[i][j], xPos, yPos);
				}
				
			} else if(board[i][j] == p2Char || (winner == 2 && board[i][j] == winChar)){
				ctx.fillStyle = "rgb(217, 44, 60)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, 44, 0, 2*Math.PI);
				ctx.fill();
				if(showPlayer || (winner == 2 && board[i][j] == winChar)){
					ctx.fillStyle = "black";
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(board[i][j], xPos, yPos);
				}
			}
		}
	}
}

function checkWin() {
	var player = playerTurn;
	let rows = board.length;
	let cols = board[0].length;

	for(let i= 0; i < rows-3; i++) {
		for(let j= 0; j < cols; j++) {
			if(board[i][j] == playerChar) {
				//Check horizontal
				if((board[i][j] == board[i+1][j]) && (board[i+1][j] == board[i+2][j]) &&
				(board[i+2][j] == board[i+3][j])) {
					//console.log("Player " + playerTurn + " wins horizontally!");
					board[i][j] = winChar;
					board[i+1][j] = winChar;
					board[i+2][j] = winChar;
					board[i+3][j] = winChar;
					return player;
				}
				//Check vertical
				if((board[i][j] == board[i][j+1]) && (board[i][j+1] == board[i][j+2]) &&
				(board[i][j+2] == board[i][j+3])) {
					//console.log("Player " + playerTurn + " wins vertically!");
					board[i][j] = winChar;
					board[i][j+1] = winChar;
					board[i][j+2] = winChar;
					board[i][j+3] = winChar;
					return player;
				}
				//Check diag right
				if((board[i][j] == board[i+1][j+1]) && (board[i+1][j+1] == board[i+2][j+2]) &&
				(board[i+2][j+2] == board[i+3][j+3])) {
					//console.log("Player " + playerTurn + " wins diagonally right!");
					board[i][j] = winChar;
					board[i+1][j+1] = winChar;
					board[i+2][j+2] = winChar;
					board[i+3][j+3] = winChar;
					return player;
				}
			}
			//Check diag left
			if((board[i][j+3] == playerChar) && (board[i][j+3] == board[i+1][j+2]) && (board[i+1][j+2] == board[i+2][j+1]) &&
			(board[i+2][j+1] == board[i+3][j])) {
				//console.log("Player " + playerTurn + " wins diagonally left!");
				board[i][j+3] = winChar;
				board[i+1][j+2] = winChar;
				board[i+2][j+1] = winChar;
				board[i+3][j] = winChar;
				return player;
			}
		}
	}

	return 0;
}

function resetScores() {
	localStorage.setItem("c4p1Score",0);
	localStorage.setItem("c4p2Score",0);
	replay();

}

function replay() {
	window.location.reload();
}

