window.onload = function()
{
	$("shufflebutton").onclick = shuffle;
	placeElements();
};

//Place the elmemts into right position
var numberOn_Piece = [];
function placeElements()
{
	// var puzzlearea = $("puzzlearea");
	var puzzlepieces = $$("#puzzlearea div");
	for (var i = 0; i < puzzlepieces.length; i++) {
		puzzlepieces[i].className = "puzzlepiece";
		puzzlepieces[i].id = i;
		numberOn_Piece[i] = i + 1;
		setPositionOfSinglePiece(puzzlepieces[i], i);
		setBackgroundForSinglePiece(puzzlepieces[i], i);
		//Event Handling
		puzzlepieces[i].addEventListener('click', movePieceEvent);
		puzzlepieces[i].onmouseover = highlightPiece;
		puzzlepieces[i].onmouseout = dehighlightPiece;
	}
	numberOn_Piece[puzzlepieces.length] = 0;
}

//Place a single piece into right position
var size = 4;
function setPositionOfSinglePiece(piece, index)
{
	//index -> (x, y)
	var x = Math.floor(index / size);
	var y = index % size;

    var fromTheTopEdge = x * (400 / size);
    var fromTheLeftEdge = y * (400 / size);
    piece.style.top = fromTheTopEdge + "px";
    piece.style.left = fromTheLeftEdge + "px";
}

//Set background images of the pieces
function setBackgroundForSinglePiece(piece, index)
{
	var x = Math.floor(index / size);
	var y = index % size;
    var fromTheRightEdge = 400 - x * (400 / size);
    var fromTheBottomEdge = 400 - y * (400 / size);
    piece.style.backgroundPosition = fromTheBottomEdge + "px " + fromTheRightEdge + "px";
}

//Move Pieces
function movePieceEvent(event)
{
	var index = parseInt(this.id);
	var dest = canMoveTo(index);
	if (dest != -1) {
		movePieceFromTo(this, index, dest);
		//Reset the numberOn_Piece[i]
		numberOn_Piece[dest] = numberOn_Piece[index];
		numberOn_Piece[index] = 0;
		this.id = dest;
	}

	//Judge whether it is a successful status
	//If success, change the background image of the body
	var puzzlepieces = $$("#puzzlearea div");
	var correctCount = 0;
	for (var i = 0; i < puzzlepieces.length; i++) {
		if (numberOn_Piece[i] == i + 1)
			correctCount++;
	}
	if (numberOn_Piece[puzzlepieces.length] == 0)
		correctCount++;
	if (correctCount == 16) {
		// alert("OH YEAH YOU ARE SUCCESSFUL!");
		$$('body')[0].setStyle({backgroundColor:'#900'});
	}
	else {
		$$('body')[0].setStyle({backgroundColor:'white'});
	}
}

function movePieceFromTo(piece, index, dest)
{
	//Calculation
	var fromX = Math.floor(index / size) * (400 / size);
	var fromY = (index % size) * (400 / size);
	var destX = Math.floor(dest / size) * (400 / size);
	var destY = (dest % size) * (400 / size);
	var interval = 10;

	//Begin moving
	var i = 0;
	if (fromX == destX) {
		for (i = 1; i <= 100 / interval; i++)
			setTimeout(stepMoveTo, i * interval, piece, fromX, fromY + (destY-fromY)/(100/interval) * i);
	}
	else {
		for (i = 1; i <= 100 / interval; i++)
			setTimeout(stepMoveTo, i * interval, piece, fromX + (destX-fromX)/(100/interval) * i, fromY);
	}
	//Finish moving
}

//Caller: movePiece
function canMoveTo(index)
{
	var destination = null;
	var left = index - 1;
	var right = index + 1;
	var up = index - 4;
	var down = index + 4;

	if (left >= 0 && left < 16)
		//if 0 left side and index is not leftmost
		if (numberOn_Piece[left] == 0 && index % size != 0) {
			return left;
		}
	if (right >= 0 && right < 16)
		if (numberOn_Piece[right] == 0 && index % size != 3) {
			return right;
		}
	if (up >= 0 && up < 16)
		if (numberOn_Piece[up] == 0 && Math.floor(index / size) != 0) {
			return up;
		}
	if (down >= 0 && down < 16)
		if (numberOn_Piece[down] == 0 && Math.floor(index / size) != 3) {
			return down;
		}
	return -1;
}

//Caller: movePiece
function stepMoveTo(piece, x, y)
{
	piece.style.top = x + "px";
	piece.style.left = y + "px";
}

//Highlight and dehighlight pieces
function highlightPiece(event)
{
	if (canMoveTo(parseInt(this.id)) != -1) {
		this.style.borderColor = "red";
		this.style.color = "#006600";
		this.style.textDecoration = "underline";
	}
}

function dehighlightPiece(event)
{
	this.style.borderColor = "black";
    this.style.color = "black";
    this.style.textDecoration = "";
}

// Shuffle the pieces
function shuffle(event)
{
	var puzzlepieces = $$("#puzzlearea div");
	//use 20 steps to mess up the puzzle
	for (var step = 0; step < 200; step++) {
		list = [];
		//select the movable pieces
		for (var i = 0; i < puzzlepieces.length; i++) {
			var tempIndex = parseInt(puzzlepieces[i].id);
			if (canMoveTo(tempIndex) != -1)
				list.push(puzzlepieces[i]);
		}
		var piece = list[Math.floor(Math.random() * list.length)];
		var index = parseInt(piece.id);
		var dest = canMoveTo(index);
		movePieceFromTo(piece, index, dest);
		numberOn_Piece[dest] = numberOn_Piece[index];
		numberOn_Piece[index] = 0;
		piece.id = dest;
		list = [];
	}
	
}