

export default class dfsMaze{
    constructor(board){
        board.fillWalls();
        this.board = board;
        this.stack = [];
        this.start = [null,null];
        this.directions = {
            up: [[0,1],[0,2]],
            down: [[0,-1],[0,-2]],
            right: [[1,0], [2,0]],
            left: [[-1,0], [-2,0]]
        }
    }
    createMaze(){
        let row = Math.floor((Math.random()*(this.board.rows-1)));
        if(row % 2 ===0){row += (row > (this.board.rows/2)) ? -1 : 1} //Want an odd number. If even adjust by 1 towards middle of board so we dont go out of bounds
        let col = Math.floor((Math.random()*(this.board.cols-1)));
        if(col % 2 ===0){col += (col > (this.board.cols/2)) ? -1 : 1}
        this.start = [row,col];
        //this.board.highlightCell(this.start[0] * this.board.gridSize, this.start[1] * this.board.gridSize, '#00ccff');
        this.board.clearCell(row,col);
        this.stack.push(this.start);
        this.genMaze(1);
    }
    getDirections(node){
        let directions = [];
        //Coords reflect that 0,0 is in the top left while max,max is bottom right
        //Up [-1,0] [-2,0]
        if(node[0] > 2) {
            if (this.board.grid[node[0]-2][node[1]] === this.board.gridKey.WALL) {
                if (this.board.grid[node[0]-1][node[1]] === this.board.gridKey.WALL) {
                    directions.push({
                        end: [node[0]-2, node[1]],
                        mid: [node[0]-1, node[1]]
                    });
                }
            }
        }
        //Down [1,0][2,0]
        if(node[0] < this.board.rows - 3){ // -1 for array starting at 0, -3 for moving away from edge
            if (this.board.grid[node[0]+2][node[1]] === this.board.gridKey.WALL) {
                if (this.board.grid[node[0]+1][node[1]] === this.board.gridKey.WALL) {
                    directions.push({
                        end: [node[0]+2, node[1]],
                        mid: [node[0]+1, node[1]]
                    });
                }
            }
        }
        //left [0,-1][0,-2]
        if(node[1] > 2) {
            if (this.board.grid[node[0]][node[1] - 2] === this.board.gridKey.WALL) {
                if (this.board.grid[node[0]][node[1] - 1] === this.board.gridKey.WALL) {
                    directions.push({
                        end: [node[0], node[1]-2],
                        mid: [node[0], node[1]-1]
                    });
                }
            }
        }
        //right [0,1][0,2]
        if(node[1] < this.board.rows - 3){ // -1 for array starting at 0, -3 for moving away from edge
            if (this.board.grid[node[0]][node[1] + 2] === this.board.gridKey.WALL) {
                if (this.board.grid[node[0]][node[1] + 1] === this.board.gridKey.WALL) {
                    directions.push({
                        end: [node[0], node[1]+2],
                        mid: [node[0], node[1]+1]
                    });
                }
            }
        }
        if(directions.length > 0) {
            let r = Math.floor(Math.random() * directions.length );
            return directions[r];
        }
        else{
            return null;
        }
    }

    genMaze(x){
        //if(x>50){return;}
        let currNode = this.stack[this.stack.length-1];
        let nextNodes = this.getDirections(currNode);
        if(nextNodes === null){
            this.stack.pop();
        }
        else{
            this.board.clearCell(nextNodes.end[0],nextNodes.end[1]);
            this.board.clearCell(nextNodes.mid[0],nextNodes.mid[1]);
            this.stack.push([nextNodes.end[0],nextNodes.end[1]]);
        }
        if(this.stack.length > 0){
            window.requestAnimationFrame(()=>this.genMaze(x+1));
        }
    }
    //Random start point & mark as open
    //pick random direction
    //Check 2 squares in that direction
        //if walls mark those to squares as open.
        //else back track
            //backtrack move back 2 cells and check direction

}