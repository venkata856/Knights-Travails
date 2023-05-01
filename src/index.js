import _ from 'lodash';
import './style.css';

let createKnight =()=>{
    let knight = new Image();
    knight.src = "../src/knight.svg";
    knight.classList.add('knight');
    return knight;
  };


const board = document.createElement('div');

board.className = 'chess-board';

document.body.appendChild(board);

for(let i=1;i<=8;i++){
for(let j=1;j<=8;j++){
    createCell(i,j);
    }
}

setCellColors();


function createCell(x,y){
    const board=document.querySelector(".chess-board")
    const cell = document.createElement('div');
    cell.className = 'cell'
    cell.dataset.x = x;
    cell.dataset.y = y
    board.appendChild(cell);
}

function setCellColors(){
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell,index)=>{



        if((cell.dataset.x%2) === 1 && (cell.dataset.y%2) === 0){
            cell.style.backgroundColor ='rgb(225, 223, 223)';
        }
        if((cell.dataset.x%2) === 0 && (cell.dataset.y%2) === 1){
            cell.style.backgroundColor ='rgb(225, 223, 223)';
        }

        if((cell.dataset.x == 4) && (cell.dataset.y == 4)){
            cell.appendChild(createKnight())
        }

        cell.addEventListener('click',e=>{
            console.log(e.target.dataset.x)
            console.log(e.target.dataset.y)
            e.target.style.backgroundColor = 'red'
        },{once : true})


    })

}


