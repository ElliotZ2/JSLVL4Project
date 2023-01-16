var allTiles = [];
var selectedTiles = [];
var gameWon = false;
var gameStart = false;
var swaps = 0;

function initialize() {
    cutPieces();
}

function cutPieces() {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        parts = [],
        img = new Image();
    img.onload = split;

    function split() {
        var origImgWidth = img.width;
        var origImgHeight = img.height;

        for (var i = 0; i < 16; i++) {
            var x = (i % 4) * -1 * origImgWidth / 4;
            var y = Math.floor(i / 4) * -1 * origImgHeight / 4;

            canvas.width = origImgWidth / 4;
            canvas.height = origImgHeight / 4;

            console.log("x:" + x + " y:" + y + " dWidth:" + origImgWidth + " dHeight:" + origImgHeight);

            ctx.drawImage(this, x, y, origImgWidth, origImgHeight);

            parts.push(canvas.toDataURL());

            /*
            var slicedImage = document.createElement('img')
            slicedImage.src = parts[i];
            var div = document.getElementById('grid');
            div.appendChild(slicedImage);*/

        }

        console.log(parts);
        populateGrid(parts);
    }

    img.crossOrigin = 'anonymous';
    //image src is whatever you want
    img.src = "images/bridge.jpg"
}

function populateGrid(imagePieces) {
    let positions = [];
    while (positions.length < 16) {
        let random = Math.floor(Math.random() * 16) + 1;
        if (!positions.includes(random)) {
            positions.push(random);
        }
    }
    /*
    var slicedImage = document.createElement('img')
    slicedImage.src = parts[i];
    var div = document.getElementById('grid');
    div.appendChild(slicedImage);
    */

    for (let i = 0; i < 16; i++) {
        let image = document.createElement('img');
        image.src = imagePieces[i];
        image.setAttribute("id", "tile"+i);
        image.classList.add("tile");
        image.addEventListener('click', function() {
            tileClick(image);
        })
        allTiles.push(image);
    }
    console.log(allTiles);

    for(let i = 0 ; i < 16; i++) {
        let gridElement = document.getElementById('grid');
        gridElement.appendChild(allTiles[i]);
    }
}

function shuffle() {
    let positions = [];
    while (positions.length < 16) {
        let random = Math.floor(Math.random() * 16) + 1;
        if (!positions.includes(random)) {
            positions.push(random);
        }
    }
    for(let i = 0 ; i < 16; i++) {
        let index = positions[i] - 1;
        let gridElement = document.getElementById('grid');
        gridElement.appendChild(allTiles[index]);
        console.log(index);
    }
    gameStart = true;
}

function tileClick(tile) {
    if(!gameStart) {
        return;
    }
    if(gameWon) {
        return;
    }
    if(selectedTiles.includes(tile)) {
        selectedTiles = [];
        return;
    }
    selectedTiles.push(tile);
    if(selectedTiles.length >= 2) {
        const grid = document.getElementById('grid');
        let placeHolder = document.createElement('img');
        grid.replaceChild(placeHolder, selectedTiles[1]);
        grid.replaceChild(selectedTiles[1], selectedTiles[0]);
        grid.replaceChild(selectedTiles[0], placeHolder);
        selectedTiles=[];
        checkForWin();
    }
}

function checkForWin() {
    const grid = document.getElementById('grid');
    let prev = -1;
    let increasing = true;
    for (const tile of grid.childNodes) {
        let number = tile.id.replace(/\D/g,'');
        if(Number(number) > Number(prev)) {
            prev = number;
        }
        else{
            increasing = false;
            break;
        }
    }
    if(increasing) {
        console.log("win");
        gameWon = true;
    }
}