
export default class Board{
    constructor(aCanvas, areaWidth, areaHeight, grid_Size){
        this.width = areaWidth;
        this.height = areaHeight;
        this.gridSize = grid_Size;
        this.startPos = [null, null];
        this.endPos = [null, null];
        this.currPos = [null, null];
        this.rows = Math.floor(this.height/this.gridSize);
        this.cols = Math.floor(this.width/this.gridSize);
        //Prefill the grid with open spaces
        this.grid = new Array(this.rows).fill(null).map(() => new Array(this.cols).fill(1));
        this.gridKey = {
            WALL: 0,
            OPENSPACE: 1,
            START: 2,
            END: 3
        };
        this.canvas = aCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.running = false;
    }//End Constructor

    isStartSet(){
        return (this.startPos[0]!==null);
    }
    setStartPos(row,col){
        this.startPos = [row,col];
    }
    isEndSet(){
        return (this.endPos[0]!==null);
    }
    setEndPos(row,col){
        this.endPos = [row,col];
    }
    isSpaceOpen(row,col){
        return (this.grid[row][col] === this.gridKey.OPENSPACE);
    }
    inBounds(row,col){
        return !(row < 0 || col < 0 || row >= this.rows || col >= this.cols);
    }

    drawInitBoard() {
        for(let x of this.grid){x.fill(this.gridKey.OPENSPACE);} //Reset the grid to all zeros
        this.startPos = [null,null];
        this.endPos = [null,null];

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

    refreshBoard(){
        for (let row = 0; row <= this.rows-1; row++){
            for (let col = 0; col <= this.cols-1; col++){
                if(this.grid[row][col] === 1){
                    this.clearCell(row,col);
                }
            }
        }
    }

    //Takes x,y as array grid position
    drawWall(xPos,yPos){
        if(!this.inBounds(xPos,yPos)){ console.log("out of bounds");}
        else if(xPos !== this.currPos[0] || yPos !== this.currPos[1]){
            this.currPos = [xPos,yPos];
            if(this.grid[xPos][yPos] === this.gridKey.OPENSPACE){
                this.grid[xPos][yPos] = this.gridKey.WALL;
                 this.highlightCell(xPos*this.gridSize, yPos*this.gridSize, "black");
            }
            else if(this.grid[xPos][yPos] === this.gridKey.WALL){
                 this.clearCell(xPos,yPos);
            }
        }
    }
    fillWalls(){
        this.start = [null,null];
        this.end = [null,null];
        for(let row = 0; row < this.rows; row++){
            for(let col = 0; col < this.cols; col++){
                this.drawWall(row,col);
            }
        }
    }

    drawStart(xPos,yPos){
        if(!this.inBounds(xPos,yPos)){ console.log("out of bounds");}
        else if(this.grid[xPos][yPos]!==this.gridKey.END){
            this.grid[xPos][yPos] = this.gridKey.START;
            this.startPos = [xPos,yPos];
            this.highlightCell(xPos*this.gridSize,yPos*this.gridSize,'lawngreen');
        }
    }

    drawEnd(xPos,yPos){
        if(!this.inBounds(xPos,yPos)){ console.log("out of bounds");}
        else if(this.grid[xPos][yPos]!==this.gridKey.START){
            this.grid[xPos][yPos] = this.gridKey.END;
            this.endPos = [xPos,yPos];
            this.highlightCell(xPos*this.gridSize,yPos*this.gridSize,'blue');
        }
    }

    clearCell(xPos,yPos){
        if(!this.inBounds(xPos,yPos)){ console.log("out of bounds");}
        else{
            this.grid[xPos][yPos] = this.gridKey.OPENSPACE;
            this.highlightCell(xPos*this.gridSize, yPos*this.gridSize, "grey");
        }
    }

    highlightCell(xPos,yPos, cellColor,){
        //Get the canvas boarder so mouse click coords will be relative
        if(xPos < 0 || yPos < 0 || xPos > this.width || yPos > this.height){console.log("Out of bounds",xPos,yPos);}
        else{
            this.ctx.fillStyle = cellColor;
            //Round input coords down to nearest cell
            let x = Math.floor(xPos/this.gridSize)*this.gridSize;
            let y = Math.floor(yPos/this.gridSize)*this.gridSize;
            this.ctx.fillRect(x,y,this.gridSize, this.gridSize);
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "black"; //Cell Boarder
            this.ctx.stroke();
        }
    }//End highlightCell
}//End Board