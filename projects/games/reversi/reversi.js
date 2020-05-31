var screenWidth = window.screen.width;
var sizeOfCells = screenWidth / 8;
screenWidth > 320 ? sizeOfCells = 50 : sizeOfCells = screenWidth / 8;

var turns = 0;
var playerTurn = 1;
var playerChar = "";
var p1Char = "1";
var p2Char = "2";
var availChar = "A";
var winChar = "W";
var winner = 0;
var p1Tot = localStorage.getItem("rp1Score");
var p2Tot = localStorage.getItem("rp2Score");
var p1Count = 0;
var p2Count = 0;
var showPlayer = false;
var showAvail = false;
var compPlayer = false;
var cntL = 0;
var cntR = 0;
var cntU = 0;
var cntD = 0;
var cntDRU = 0;
var cntDRD = 0;
var cntDLU = 0;
var cntDLD = 0;
var canFlipR = false;
var canFlipL = false;
var canFlipU = false;
var canFlipD = false;
var canFlipDRU = false;
var canFlipDRD = false;
var canFlipDLU = false;
var canFlipDLD = false;
var moves = 0;
var compMoves = [{}];
var board = [
	[' ',' ',' ',' ',' ',' ',' ',' '],
	[' ',' ',' ',' ',' ',' ',' ',' '],
	[' ',' ',' ',' ',' ',' ',' ',' '],
	[' ',' ',' ','1','2',' ',' ',' '],
	[' ',' ',' ','2','1',' ',' ',' '],
	[' ',' ',' ',' ',' ',' ',' ',' '],
	[' ',' ',' ',' ',' ',' ',' ',' '],
	[' ',' ',' ',' ',' ',' ',' ',' ']
];



checkCanMove();

function showHint() {
	showAvail = !showAvail;
	
	if(showAvail) {
		document.getElementById("showHintBtn").innerHTML = "Hide available moves.";
	} else {
		document.getElementById("showHintBtn").innerHTML = "Show available moves.";
	}
	
	updateBoard();
	//console.log("Total: " + turns);
}

function playComp() {
	compPlayer = true;
	updateBoard();
	//compPlayer = false;
}

function countPieces() {
	p1Count = 0;
	p2Count = 0;
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board[0].length; j++) {
			if(board[j][i] == p1Char) {
				p1Count++;
			}else if(board[j][i] == p2Char) {
				p2Count++;
			}
		}
	}
	/*
	document.getElementById("p1Total").innerHTML = "Player 1 has " + p1Count;
	document.getElementById("p2Total").innerHTML = "Player 2 has " + p2Count;*/
}

function checkFlip(cellChoice) {
	var w = board[0].length;
	var x = cellChoice.x - 1;
	var y = cellChoice.y - 1;
	playerTurn == 1 ? playerChar = p1Char : playerChar = p2Char;
	var otherChar = (playerChar == p1Char) ? p2Char : p1Char;
	cntL = 0;
	cntR = 0;
	cntU = 0;
	cntD = 0;
	cntDRU = 0;
	cntDRD = 0;
	cntDLU = 0;
	cntDLD = 0;
	canFlipR = false;
	canFlipL = false;
	canFlipU = false;
	canFlipD = false;
	canFlipDRU = false;
	canFlipDRD = false;
	canFlipDLU = false;
	canFlipDLD = false;

	//Check right
	for(let i = x; i < w -1; i++) {
		if(board[y][i+1] == otherChar) {
			cntR++;
		}else if((i!=x) && (board[y][i+1] == playerChar)) {
			canFlipR = true;
		}else {
			break;
		}
	}

	//Check left
	for(let i = x; i > 0; i--) {
		if(board[y][i-1] == otherChar) {
			cntL++;
		}else if((i!=x) && (board[y][i-1] == playerChar)) {
			canFlipL = true;
		}else {
			break;
		}
	}
	
	//Check down
	for(let i = y; i < w-1; i++) {
		if(board[i+1][x] == otherChar) {
			cntD++;
		}else if((i!=y) && (board[i+1][x] == playerChar)) {
			canFlipD = true;
		}else {
			break;
		}
	}
	
	//Check up
	for(let i = y; i > 0; i--) {
		if(board[i-1][x] == otherChar) {
			cntU++;
		}else if((i!=y) && (board[i-1][x] == playerChar)) {
			canFlipU = true;
		} else {
			break;
		}
	}
	
	//Check diag right up
	for(let i = y; i > 0; i--) {
		let diff = y - i + 1;
		if(board[i-1][x+diff] == otherChar) {
			cntDRU++;
		}else if((i!=y) && (board[i-1][x+diff] == playerChar)) {
			canFlipDRU = true;
		} else {
			break;
		}
	}
	
	//Check diag right down
	for(let i = y; i < w-1; i++) {
		let diff = i - y + 1;
		if(board[i+1][x-diff] == otherChar) {
			cntDRD++;
		}else if((i!=y) && (board[i+1][x-diff] == playerChar)) {
			canFlipDRD = true;
		} else {
			break;
		}
	}
	
	//Check diag left up
	for(let i = y; i > 0; i--) {
		let diff = y - i + 1;
		if(board[i-1][x-diff] == otherChar) {
			cntDLU++;
		}else if((i!=y) && (board[i-1][x-diff] == playerChar)) {
			canFlipDLU = true;
		} else {
			break;
		}
	}
	
	//Check diag left down
	for(let i = y; i < w-1; i++) {
		let diff = i - y + 1;
		if(board[i+1][x+diff] == otherChar) {
			cntDLD++;
		}else if((i!=y) && (board[i+1][x+diff] == playerChar)) {
			canFlipDLD = true;
		} else {
			break;
		}
	}
}

function flipPieces(cellChoice) {
	var x = cellChoice.x - 1;
	var y = cellChoice.y - 1;
	//Flip right
	if(cntR > 0 && canFlipR){
		for(let n = x; n <= x + cntR; n++) {
			board[y][n] = playerChar;
		}
	}

	//Flip left
	if(cntL > 0 && canFlipL){
		for(let n = x - cntL; n <= x; n++) {
			board[y][n] = playerChar;
		}
	}
		
	//Flip down
	if(cntD > 0 && canFlipD){
		for(let n = y; n <= y + cntD; n++) {
			board[n][x] = playerChar;
		}
	}
	
	//Flip up
	if(cntU > 0 && canFlipU){
		for(let n = y - cntU; n <= y; n++) {
			board[n][x] = playerChar;
		}
	}
	
	//Flip diag right up
	if(cntDRU > 0 && canFlipDRU){
		for(let n = y - cntDRU; n <= y; n++) {
			let diff = y - n;
			board[n][x+diff] = playerChar;
		}
	}
	
	//Flip diag right down
	if(cntDRD > 0 && canFlipDRD){
		for(let n = y; n <= y + cntDRD; n++) {
			let diff = n - y;
			board[n][x-diff] = playerChar;
		}
	}
	
	//Flip diag left up
	if(cntDLU > 0 && canFlipDLU){
		for(let n = y - cntDLU; n <= y; n++) {
			let diff = y - n;
			board[n][x-diff] = playerChar;
		}
	}

	//Flip diag left down
	if(cntDLD > 0 && canFlipDLD){
		for(let n = y; n <= y + cntDLD; n++) {
			let diff = n - y;
			board[n][x+diff] = playerChar;
		}	
	}
}

function nextTurn(cellChoice) {
	playerTurn == 1 ? playerChar = p1Char : playerChar = p2Char;
	
	getChoice(cellChoice);
	flipPieces(cellChoice);
	countPieces();
	playerTurn = 3 - playerTurn;
	var p1txt = "<span style='color:rgb(27,143,33); font-size: 20px;'>Player 1 has " + p1Count + " pieces.</span></br>";
	var p2txt = "<span style='color:rgb(217,44,60); font-size: 20px;'>Player 2 has " + p2Count + " pieces.</span></br>";
	var txt =  "It is Player " + playerTurn + "'s turn!";
	document.getElementById("overText").innerHTML = p1txt + p2txt + txt;
	if(playerTurn==1){
		document.getElementById("overText").style.color = "rgb(27, 143, 33)";
	} else if(playerTurn==2) {
		document.getElementById("overText").style.color = "rgb(217, 44, 60)";
	}
	turns++;
	checkCanMove();
	checkWin();
}

function updateBoard() {
	document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("rp1Score");
	document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("rp2Score");
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var w = board[0].length * sizeOfCells;
	var h = w;
	ctx.canvas.width  = w;
	ctx.canvas.height = h;
	var cellChoice = { x: 0, y: 0};

	if(compPlayer) {
		checkCanMove();
		var ranNum = Math.floor(Math.random() * moves);
		cellChoice.x = compMoves[ranNum].x;
		cellChoice.y = compMoves[ranNum].y;
		if(isValid(cellChoice)) {
			nextTurn(cellChoice);
			drawBoard();
		}
	} else {
		canvas.addEventListener('mousedown', onCanvasClick, false);
		function onCanvasClick() {
			var ev = event;
			var x = ev.pageX - canvas.offsetLeft;
			var y = ev.pageY - canvas.offsetTop;
	
			cellChoice.x = Math.floor(x/sizeOfCells) + 1;
			cellChoice.y = Math.floor(y/sizeOfCells) + 1;
			//console.log("x: " + cellChoice.x + " y: " + cellChoice.y);
			if(cellChoice.x != 0) {
				if(isValid(cellChoice)) {
					nextTurn(cellChoice);
					drawBoard();
				}
			} 
		}
	}	
	drawBoard();
}

function checkCanMove() {
	moves = 0;
	compMoves = [{}];
	compMoves.splice(0,1);
	for(let i = 0; i < board.length; i++) {
		for(let j = 0; j < board[0].length; j++) {
			var cellCheck = {x:i+1, y:j+1};
			checkFlip(cellCheck);
			if((board[j][i] != p1Char) && (board[j][i] != p2Char)) {
				board[j][i] = " ";
			}
			if(canFlipR || canFlipL || canFlipU || canFlipD || canFlipDRU || canFlipDRD || canFlipDLU || canFlipDLD) {
				if((board[j][i] != p1Char) && (board[j][i] != p2Char)) {
					moves++;
					board[j][i] = availChar;
					var compXY = { x: i + 1 , y: j + 1};
					compMoves.push(compXY);
				}
			}
		}
	}
	//console.log("Available moves: " + moves);
}

function checkWin() {
	if(moves == 0){
		if(p1Count > p2Count) {
			p1Tot++;
			document.getElementById("overText").innerHTML = "Player 1 wins " + p1Count + " to " + p2Count;
			localStorage.setItem("rp1Score",p1Tot);
			document.getElementById('p1Score').innerHTML = "Player 1: " + localStorage.getItem("rp1Score");
			document.getElementById("startBtn").innerHTML = "Play again?";
			document.getElementById("startBtn").style.display = "inline-block";
		}else if(p2Count > p1Count) {
			p2Tot++;
			document.getElementById("overText").innerHTML = "Player 2 wins " + p2Count + " to " + p1Count;
			localStorage.setItem("rp2Score",p2Tot);
			document.getElementById('p2Score').innerHTML = "Player 2: " + localStorage.getItem("rp2Score");
			document.getElementById("startBtn").innerHTML = "Play again?";
			document.getElementById("startBtn").style.display = "inline-block";
		} else {
			document.getElementById("overText").innerHTML = "Draw! No-one wins!";
			document.getElementById("startBtn").innerHTML = "Play again?";
			document.getElementById("startBtn").style.display = "inline-block";
		}
	}
}

function isValid(cellChoice) {
	var x = cellChoice.x - 1;
	var y = cellChoice.y - 1;
	var validMove = false;
	checkFlip(cellChoice);
	
	if(canFlipR || canFlipL || canFlipU || canFlipD || canFlipDRU || canFlipDRD || canFlipDLU || canFlipDLD) {
		validMove = true;
	}
	if(moves == 0){
		checkWin();
		return false;
	} 
	if(board[y][x] == p1Char || board[y][x] == p2Char) {
		document.getElementById("overText").innerHTML = "Player " + playerTurn + " that spot is already taken! <br> Choose somewhere else!";
		return false;
	}else if(!validMove) {
		document.getElementById("overText").innerHTML = "Player " + playerTurn + " that is an invalid move! <br> Choose somewhere else!";
		return false;
	}else {
		document.getElementById("overText").innerHTML = "Player " + playerTurn + "'s turn!";
		return true;
	}
}

function getChoice(cellChoice) {
	var x = cellChoice.x - 1;
	var y = cellChoice.y - 1;
	
	//Add choice to array
	board[y][x] = playerChar;
}

function drawBoard() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	ctx.font = "30px Arial";
	let rows = board.length;
	let cols = board[0].length;
	let pad = sizeOfCells / 2;
	for(let i= 0; i < rows; i++) {
		for(let j= 0; j < cols; j++) {
			var xPos = j*sizeOfCells + pad;
			var yPos = i*sizeOfCells + pad;
			//Draw grid
			ctx.beginPath();
			ctx.moveTo(xPos - pad,yPos - pad);
			ctx.lineTo(xPos + pad,yPos - pad);
			ctx.lineTo(xPos + pad,yPos + pad);
			ctx.lineTo(xPos - pad,yPos + pad);
			ctx.lineTo(xPos - pad,yPos - pad);
			ctx.closePath();
			ctx.fillStyle = "grey";
			ctx.fill();
			ctx.stroke();
			
			//Draw P1
			if(board[i][j] == p1Char || (winner == 1 && board[i][j] == winChar)) {
				ctx.fillStyle = "rgb(27, 143, 33)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, (pad*0.9), 0, 2*Math.PI);
				ctx.fill();
					
			//Draw P2
			} else if(board[i][j] == p2Char || (winner == 2 && board[i][j] == winChar)){
				ctx.fillStyle = "rgb(217, 44, 60)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, (pad*0.9), 0, 2*Math.PI);
				ctx.fill();
			
			//Draw available moves
			} else if((board[i][j] == availChar) && showAvail){
				ctx.fillStyle = "rgb(147, 150, 147)";
				ctx.beginPath();
				ctx.arc(xPos, yPos, (pad*0.9), 0, 2*Math.PI);
				ctx.fill();
			}
		}
	}
}

function resetScores() {
	localStorage.setItem("rp1Score",0);
	localStorage.setItem("rp2Score",0);
	replay();
}

function replay() {
	window.location.reload();
}