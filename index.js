var selectedTiles = [];
var allTiles = [];

function initialize() {
    //create 16 tiles
    for(let i = 0; i < 16; i++) {
        let tile = document.createAttribute("div");
        tile.setAttribute("id", "tile" + i);
        tile.classList.add("tile");
        tile.addEventListener("click", function() {
            onTileClick(tile);
        })
    }
    
}

function displayTiles() {

}

function onTileClick(tile) {

}

function shuffle() {

}

function checkForWin() {

}

function swap(tile1, tile2) {

}