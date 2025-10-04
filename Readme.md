# LabyrinthSolver

A simple interactive maze generator and solver implemented with HTML, CSS, and JavaScript.
Draw walls, set start and goal points, and watch the maze-solving algorithm find the path!

---

## Features

- Generate a customizable grid maze (specify rows and columns)
- Interactive drawing modes:
  - **default** (empty space)
  - **start** (maze start point)
  - **goal** (maze end point)
  - **wall** (obstacle)
- Visualize the maze-solving process with animation
- Show or hide grid coordinates for easy navigation
- Save and load presets as JSON files for quick maze setup
- Reset and delete maze options for easy experimentation

---

## How to Use

1. **Generate Maze**
   Set the number of rows and columns, then click **Generate Maze**.

2. **Select Draw Mode**
   Choose one of the draw modes (default, start, goal, wall) from the menu.

3. **Draw on the Maze**
   Click and drag on the grid cells to draw walls, set start/goal points, or clear cells.

4. **Run Labyrinth Solver**
   Click **Run Maze** to visualize the pathfinding algorithm finding the path from start to goal.

5. **Reset or Delete**
   Use the **Reset Maze** button to clear the search progress or **Delete Maze** to start fresh.

6. **Save and Load Presets**
   Save your maze setup as a JSON preset or load existing presets from the included options or your own files.

---

## Technology Stack

- **HTML5** for structure
- **CSS3** for styling with attribute selectors
- **Vanilla JavaScript** for interactivity and maze logic

---

## Installation

Simply clone this repository and open `index.html` in your browser.

```bash
git clone https://github.com/yourusername/puzzle-solver.git
cd puzzle-solver
open index.html
```

---

## File structure
```
.
├── main.html
├── style.css
├── index.js
├── LICENSE
├── Readme
└── json_presets/
    ├── basic.json
    └── swirl.json
```

---

## License
This project is licensed under the [MIT License](LICENSE).