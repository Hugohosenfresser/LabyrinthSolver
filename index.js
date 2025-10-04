let MazeWrapper = document.getElementById('Maze-Wrapper');
let ItemTypes = ["default", "start", "goal"]
let CheckedSquares = [];

function GenerateMaze() {
    MazeWrapper.innerHTML = '';
    
    let RowCount = document.getElementById('Generate-Rows-Count').value;
    let ColumnCount = document.getElementById('Generate-Columns-Count').value;

    for (let CreatedColumns = 0; CreatedColumns < ColumnCount; CreatedColumns++) {
        var Row = document.createElement("div");
        Row.id = CreatedColumns;
        Row.classList.add('Row');
        MazeWrapper.appendChild(Row);

        for (let CreatedRows = 0; CreatedRows < RowCount; CreatedRows++) {
            var Item = document.createElement("div");
            Item.classList.add('MazeItem');
            Item.setAttribute("column", CreatedColumns);
            Item.setAttribute("row", CreatedRows);
            Item.setAttribute("onclick","ChangeItemType(this)");
            Item.setAttribute("type", "default");
            Item.setAttribute("checked", "false");
            Item.innerHTML = (CreatedColumns + 1) + "-" + (CreatedRows + 1);
            Row.appendChild(Item);
            console.log("Created Item.");
        }
    }
}

function ChangeItemType(Item) {
    let currentType = Item.getAttribute("type");

    // If somehow the type isn't set or is invalid, reset to first
    let currentIndex = ItemTypes.indexOf(currentType);
    if (currentIndex === -1) {
        currentIndex = 0;
    }

    // Move to the next type, looping back to start if at the end
    let nextIndex = (currentIndex + 1) % ItemTypes.length;
    Item.setAttribute("type", ItemTypes[nextIndex]);

    // Debugging logs
    console.log("ArrayIndex: " + nextIndex);
    console.log("Type: " + Item.getAttribute("type"));
    console.log("ItemTypes.length: " + ItemTypes.length);
}

function RunMaze() {
    let StartItem = document.querySelector('[type="start"]');
    let GoalItem = document.querySelector('[type="goal"]');
}

function CheckNeighbors(Item) {
    let GoalItem = document.querySelector('[type="goal"]');
    Neighbors = [];
    NeighborsPreset = [1, -1];

    // Check Neighbors
    

}   