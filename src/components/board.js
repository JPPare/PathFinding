
export default class Board{
    constructor(aCanvas, areaWidth, areaHeight, grid_Size){
        this.width = areaWidth;
        this.height = areaHeight;
        this.gridSize = grid_Size;
        this.startPos = [null, null, false]; //x, y, isSet
        this.endPos = [null, null, false];
        this.rows = Math.floor(this.height/this.gridSize);
        this.cols = Math.floor(this.width/this.gridSize);
        this.grid = new Array(this.rows).fill(1).map(() => new Array(this.cols).fill(1));

        this.canvas = aCanvas;
        this.ctx = this.canvas.getContext("2d");
    }//End Constructor

    isStartSet(){
        return this.startPos[2];
    }
    setStartPos(x,y){
        this.startPos = [x,y,true];
    }
    isEndSet(){
        return this.endPos[2];
    }
    setEndPos(x,y){
        this.endPos = [x,y,true];
    }

    drawInitBoard() {
        for(let x of this.grid){x.fill(0);} //Reset the grid to all zeros
        console.log(this.grid);
        this.ctx.clearRect(0,0, this.width, this.height);
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0,0, this.width, this.height);
        //Horizontal lines
        for (let x = 0; x <= this.width; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        //Vertical lines
        for (let y = 0; y <= this.height; y += this.gridSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    } //End drawBoard

    getCellFromPos(xPos, yPos){

    }

    highlightCell(xPos,yPos, cellColor,){
        //Get the canvas boarder so mouse click coords will be relative
        let r = this.canvas.getBoundingClientRect();
        xPos -= 0;//r.top;
        yPos -= 0;//r.left;
        if(xPos < 0 || yPos < 0 || xPos > this.width || yPos > this.height){console.log("Out of bounds");}
        else{
            //console.log("Highlighting ", xPos-r.top, yPos-r.left);
            this.ctx.fillStyle = cellColor;

            let x = Math.floor(xPos/this.gridSize)*this.gridSize;
            let y = Math.floor(yPos/this.gridSize)*this.gridSize;
            this.ctx.fillRect(x,y,this.gridSize, this.gridSize);
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "black"; //Cell Boarder
            this.ctx.stroke();
        }
    }//End highlightCell
}//End Board