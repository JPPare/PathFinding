
import Board from "./components/Board";
import NavBar from "./components/NavBar";
import BasicSearch from "./algorithms/BasicSearch";

//Get gameScreen area and get height and width from it
let canvas = document.getElementById("gameScreen");
let height = parseInt(canvas.getAttribute('height'));
let width = parseInt(canvas.getAttribute('width'));
let navBar = document.getElementById("navBar");

let border = (canvas.offsetHeight-height)/2;
let mDown = 0;

let board = new Board(canvas, width, height, 10);
let navBarJs = new NavBar(board);
board.drawInitBoard();

//Canvas Event Listeners
function whileMouseDown(event){
    const {x,y} = canvas.getBoundingClientRect();
    let xPos = Math.floor((event.clientX-x-border)/board.gridSize);
    let yPos = Math.floor((event.clientY-y-border)/board.gridSize);
    if(board.isStartSet() === false){board.drawStart(xPos,yPos);}
    else if(board.isEndSet() === false){board.drawEnd(xPos,yPos);}
    else {board.drawWall(xPos, yPos);}
}

canvas.addEventListener("click",(event)=>{
    whileMouseDown(event);
});

canvas.addEventListener("mousemove", (event)=>{
   if(mDown === 1) {whileMouseDown(event);}
});

canvas.addEventListener("mouseleave", ()=>{mDown = 0;});
canvas.addEventListener("mousedown", ()=>{mDown = 1;});
canvas.addEventListener("mouseup", ()=>{mDown = 0;});

//NavBar Event Listener
navBar.addEventListener("click", (event)=>navBarJs.handleInput(event));