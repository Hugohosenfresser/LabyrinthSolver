let MazeWrapper = document.getElementById('Maze-Wrapper');
let CheckedSquares = [];
let AnimationSpeed = 50;
let Queue = [];
let DrawMode = "default";
let isDrawing = false;

GenerateMaze();

// Mouse event handlers for drawing
MazeWrapper.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('MazeItem')) {
        isDrawing = true;
        Draw(event.target);
        event.preventDefault(); // Prevent text selection
    }
});

MazeWrapper.addEventListener('mousemove', (event) => {
    if (isDrawing && event.target.classList.contains('MazeItem')) {
        Draw(event.target);
    }
});

document.addEventListener('mouseup', () => {
    isDrawing = false;
});

function GenerateMaze() {
    MazeWrapper.innerHTML = '';
    let generate_coordinates = document.getElementById("Show-Grid-Coordinates-Button");

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
            Item.setAttribute("onclick","Draw(this)");
            Item.setAttribute("type", "default");
            Item.setAttribute("checked", "false");
            Item.innerHTML = (CreatedColumns + 1) + "-" + (CreatedRows + 1)
            if (!generate_coordinates.checked) {
                Item.classList.add('HideCoordinates');
            }
            Row.appendChild(Item);
            console.log("Created Item.");
        }
    }
}

function SetDrawMode(mode) {
    const Start = document.getElementById("start-draw-button");
    const Default = document.getElementById("default-draw-button");
    const Goal = document.getElementById("goal-draw-button");
    const Wall = document.getElementById("wall-draw-button");

    switch (mode) {
        case "default":
            DrawMode = "default";
            break;
        case "start":
            DrawMode = "start";
            break;
        case "goal":
            DrawMode = "goal";
            break;
        case "wall":
            DrawMode = "wall";
            break;
    }
}

function Draw(cell) {
    if (cell.getAttribute('type') !== DrawMode) {
        cell.setAttribute('type', DrawMode);
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function RunMaze() {
    if (document.querySelectorAll('[type="start"]').length > 1) {
        alert("There are to many Starts!")
        return;
    }
    if (document.querySelectorAll('[type="goal"]').length > 1) {
        alert("There are to many Goals!")
        return;
    }

    let StartItem = document.querySelector('[type="start"]');
    let GoalItem = document.querySelector('[type="goal"]');

    if (!StartItem || !GoalItem) {
        console.error("Start or Goal element not found.");
        return;
    }

    Queue = [];
    let predecessorMap = new Map();  // Map to store predecessor for each cell

    Queue.push(StartItem);
    predecessorMap.set(StartItem, null);  // Start has no predecessor

    while (Queue.length > 0) {
        let current = Queue.shift();

        if (current.getAttribute("checked") === "true" || current.getAttribute("type") === "wall") {
            continue; // Skip checked or wall cells
        }

        current.setAttribute("checked", "true");

        await sleep(AnimationSpeed); // For visual effect / animation

        if (current === GoalItem) {
            // Reconstruct the path from Goal to Start
            let path = [];
            let cell = current;

            while (cell !== null) {
                path.push(cell);
                cell = predecessorMap.get(cell);
            }

            // Reverse path to go from Start -> Goal
            path.reverse();

            // Mark the path visually
            for (let i = 0; i < path.length; i++) {
                const item = path[i];
                if (item !== StartItem && item !== GoalItem) {
                    item.setAttribute("path", "true");
                    await sleep(AnimationSpeed); // Adjust speed here (100ms between each cell)
                }
            }
            document.getElementById('Result-Output').innerHTML = "Result: Goal found. Search complete.";
            return;
        }

        // Get row and column for neighbors
        const row = Number(current.getAttribute("row"));
        const col = Number(current.getAttribute("column"));

        const directions = [
            [row - 1, col], // Up
            [row + 1, col], // Down
            [row, col - 1], // Left
            [row, col + 1], // Right
        ];

        for (const [r, c] of directions) {
            const neighbor = document.querySelector(`[row="${r}"][column="${c}"]`);
            if (neighbor && neighbor.getAttribute("checked") !== "true" && neighbor.getAttribute("type") !== "wall") {
                // Only enqueue if not already discovered
                if (!predecessorMap.has(neighbor)) {
                    predecessorMap.set(neighbor, current);
                    Queue.push(neighbor);
                }
            }
        }
    }

    console.log("Goal not found. Search complete.");
    document.getElementById('Result-Output').innerHTML = "Result: Goal not found. Search complete.";
}

function ResetMaze() {
    let CheckedItems = document.querySelectorAll('[checked="true"]');
    let PathItems = document.querySelectorAll('[path="true"]');

    for (let i = 0; i < CheckedItems.length; i++) {
        CheckedItems[i].setAttribute("checked", "false");
        console.log(CheckedItems[i]);
    }
    for (let i = 0; i < PathItems.length; i++) {
        PathItems[i].setAttribute("path", "false");
        console.log(PathItems[i]);
    }
}

function DeleteMaze() {
    MazeWrapper.innerHTML = "";
    GenerateMaze();
}

function ShowGridCoordinates() {
    let generate_coordinates_button = document.getElementById("Show-Grid-Coordinates-Button");
    let Elements = MazeWrapper.querySelectorAll(':scope > * > *');
    if (generate_coordinates_button.checked) {
        [...Elements].forEach((element) => {
            element.classList.remove('HideCoordinates');
        })
    }
    if (!generate_coordinates_button.checked) {
        [...Elements].forEach((element) => {
            element.classList.add('HideCoordinates');
        })
    }
}

function LoadDefaultPreset() {
    let LoadedPreset = document.getElementById("Json-Premade-Selector");

    fetch("./json_presets/" + LoadedPreset.value + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load json preset");
            }
            return response.json();
        })
        .then(data => {
            console.log("Loaded JSON preset:", data);
            SetMazeToJson(data);
        })
        .catch(error => {
            console.log("Couldn't load data:", error);
        });
}

function SetMazeToJson(data) {
    // Set Row Count and Column Count Buttons to the Numbers from the json
    document.getElementById("Generate-Columns-Count").value = data.column_count;
    document.getElementById("Generate-Rows-Count").value = data.row_count;
    GenerateMaze();

    // Set the Show Grid Coordinates Button
    let grid_coordinates_button = document.getElementById("Show-Grid-Coordinates-Button").checked = data.show_grid;
    ShowGridCoordinates();

    // Set Draw Mode
    document.getElementById(data.draw_mode + "-draw-button").checked = true;
    SetDrawMode(data.draw_mode)

    // Set Goal and Start Position
    const start = document.querySelector(`[column="${data.start_position.column}"][row="${data.start_position.row}"]`);
    start.setAttribute("type", "start");

    const goal = document.querySelector(`[column="${data.goal_position.column}"][row="${data.goal_position.row}"]`);
    goal.setAttribute("type", "goal");

    // Set Wall Positions
    const wall_positions = data.wall_positions;
    const Length = Object.keys(data.wall_positions).length

    for (let i = 0; i < Length; i++) {
        const wallKey = `wall_${i}`;
        const wall = data.wall_positions[wallKey];

        const Item_position = document.querySelector(`[column="${wall.column}"][row="${wall.row}"]`);
        Item_position.setAttribute("type", "wall");
    }
}

function LoadCustomPreset() {
    let CustomPresetInput = document.getElementById("CustomPresetInput");
    let LoadedFile = CustomPresetInput.files[0];

    if (!LoadedFile) {
        return;
    }

    const reader = new FileReader();

    reader.onload = () => {
        try {
            const FileData = JSON.parse(reader.result);
            console.log(FileData);
            SetMazeToJson(FileData);
        } catch (error) {
            console.error("Invalid JSON file:", error);
            alert("Failed to load preset: Invalid JSON format.");
        }
    };

    reader.readAsText(LoadedFile);
}


function SavePreset() {
    const Walls = document.querySelectorAll('[type="wall"]');
    console.log(Walls);

    const wallPositions = {};

    for (let i = 0; i < Walls.length; i++) {
        const wall = Walls[i];
        wallPositions["wall_" + i] = {
            column: Number(wall.getAttribute("column")),
            row: Number(wall.getAttribute("row"))
        };
    }

    const Data = {
        name: document.getElementById("CustomPreset-Name-Input").value,
        column_count: Number(document.getElementById("Generate-Columns-Count").value),
        row_count: Number(document.getElementById("Generate-Rows-Count").value),
        show_grid: document.getElementById("Show-Grid-Coordinates-Button").checked,
        draw_mode: DrawMode,
        start_position: {
            column: Number(document.querySelector('[type="start"]').getAttribute("column")),
            row: Number(document.querySelector('[type="start"]').getAttribute("row"))
        },
        goal_position: {
            column: Number(document.querySelector('[type="goal"]').getAttribute("column")),
            row: Number(document.querySelector('[type="goal"]').getAttribute("row"))
        },
        wall_positions: wallPositions
    };

    console.log(Data);
    DownloadHelper(Data.name, Data)
}

function DownloadHelper(filename, data) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".json";
    a.click();

    URL.revokeObjectURL(url); // Clean up
};