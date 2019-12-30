
import Board from "./board";
//Get gameScreen area and get height and width from it
let canvas = document.getElementById("gameScreen");
let height = parseInt(canvas.getAttribute('height'));
let width = parseInt(canvas.getAttribute('width'));

let mDown = 0;

//Make sure canvas is clear and fill in background color
let ctx = canvas.getContext("2d");
ctx.clearRect(0,0, width, height);
ctx.fillStyle = "grey";
ctx.fillRect(0,0, width, height);

let board = new Board(canvas, width, height, 10);
board.drawBoard();
board.highlightCell(1,1, '#39ff14');


function whileMouseDown(event){
    const {x,y} = event.target.getBoundingClientRect();
    board.highlightCell(event.clientX-x, event.clientY-y, "Black");
}

canvas.addEventListener("click",(event)=>{
    whileMouseDown(event);
});

canvas.addEventListener("mousemove", (event)=>{
   if(mDown == 1) {whileMouseDown(event);}
});

canvas.addEventListener("mouseleave", ()=>{mDown = 0;});
canvas.addEventListener("mousedown", (event)=>{mDown = 1;});
canvas.addEventListener("mouseup", (event)=>{mDown = 0;});