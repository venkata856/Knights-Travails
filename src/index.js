import _ from "lodash";
import "./style.css";
var source = [];
var destination = [];
function Node(data, prev = null, next = null) {
  return {
    data,
    prev,
    next,
  };
}
const directions = [
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
];
let createKnight = () => {
  let knight = new Image();
  knight.src = "../src/knight.svg";
  knight.classList.add("knight");
  return knight;
};

const board = document.createElement("div");

board.className = "chess-board";

document.body.appendChild(board);

for (let i = 1; i <= 8; i++) {
  for (let j = 1; j <= 8; j++) {
    createCell(i, j);
  }
}

setCellColors();

function createCell(x, y) {
  const board = document.querySelector(".chess-board");
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.dataset.x = x;
  cell.dataset.y = y;
  board.appendChild(cell);
}

function setCellColors() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    if (
      (cell.dataset.x % 2 === 1 && cell.dataset.y % 2 === 0) ||
      (cell.dataset.x % 2 === 0 && cell.dataset.y % 2 === 1)
    ) {
      cell.style.backgroundColor = "rgb(225, 223, 223)";
    }
    if (cell.dataset.x == 4 && cell.dataset.y == 4) {
      cell.appendChild(createKnight());
      source = [cell.dataset.x, cell.dataset.x];
    }

    cell.addEventListener(
      "click",
      (e) => {
        clearThePath();
        let targetCells = [];
        const queue = [];
        var final;
        setSource();
        setDestination(e);
        queue.push(Node(source));
        const visited = new Set();

        while (queue.length > 0) {
          const first = queue.shift();

          if (JSON.stringify(first.data) === JSON.stringify(destination)) {
            final = first;
            break;
          }

          visited.add(first.data[0] + "," + first.data[1]);

          for (let neighbor of getNeighbors(first.data)) {
            const f1 = Node(neighbor);
            if (visited.has(neighbor[0] + "," + neighbor[1])) continue;

            first.next = f1;
            f1.prev = first;
            queue.push(f1);
          }
        }

        while (final.prev != null) {
          targetCells.push(final.data);
          final = final.prev;
        }
        targetCells.reverse();

        const targetNodes = targetCells.map(findOutCell);
        for (let nodes of targetNodes) {
          markThePath(nodes);
        }
      },
      { once: false }
    );
  });
}

function findOutCell(neighbor) {
  const cells = document.querySelectorAll("[data-x]");
  let neiCells;

  cells.forEach((cell) => {
    if (
      Number(cell.dataset.x) === neighbor[0] &&
      Number(cell.dataset.y) === neighbor[1]
    ) {
      neiCells = cell;
      return;
    }
  });

  return neiCells;
}

const getNeighbors = (coOrdinates) => {
  const neighbors = [];

  for (const direction of directions) {
    const [rowChange, colChange] = direction;
    const neighborRow = Number(coOrdinates[0]) + rowChange;
    const neighborCol = Number(coOrdinates[1]) + colChange;
    if (
      neighborCol >= 1 &&
      neighborCol <= 8 &&
      neighborRow >= 1 &&
      neighborRow <= 8
    )
      neighbors.push([neighborRow, neighborCol]);
  }

  return neighbors;
};

function setSource() {
  const firstKnight = document.querySelector(".knight");
  console.log();
  source = [
    Number(firstKnight.parentNode.dataset.x),
    Number(firstKnight.parentNode.dataset.y),
  ];
}
function setDestination(e) {
  e.target.style.backgroundColor = "#8fd1f8";
  destination = [Number(e.target.dataset.x), Number(e.target.dataset.y)];
}
function markThePath(cello) {
  const firstKnight = document.querySelector(".knight");

  firstKnight.parentNode.style.backgroundColor = "#f7d5d5";
  firstKnight.parentNode.classList.add("path");
  firstKnight.remove();
  cello.appendChild(createKnight());
}

let clearThePath = () => {
  const pathCells = document.querySelectorAll(".path");

  if (pathCells.length > 0) {
    pathCells.forEach((pathCell) => {
      if (
        (pathCell.dataset.x % 2 === 1 && pathCell.dataset.y % 2 === 0) ||
        (pathCell.dataset.x % 2 === 0 && pathCell.dataset.y % 2 === 1)
      ) {
        pathCell.style.backgroundColor = "rgb(225, 223, 223)";
      } else pathCell.style.backgroundColor = "";
    });
  }
};
