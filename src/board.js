
export default class Board{
    constructor(aCanvas, areaWidth, areaHeight, grid_Size){
        this.width = areaWidth;
        this.height = areaHeight;
        this.gridSize = grid_Size;
        this.startPos = [null, null, false]; //x, y, isSet
        this.endPos = [null, null, false];

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

    drawBoard() {
        //Horizontal lines
        for (let x = this.gridSize; x < this.width; x += this.gridSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        //Vertical lines
        for (let y = this.gridSize; y < this.height; y += this.gridSize) {
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
            console.log("Highlighting ", xPos-r.top, yPos-r.left);
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