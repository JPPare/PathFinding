import PriorityQueue from "./priorityQueue";


export default class DSP{
    constructor(board){
        //grid to hold distance from start to each node
        this.grid = new Array(board.rows).fill(null).map(() => new Array(board.cols).fill(null));
        this.node = {row: null,col:null, dist:null};
        this.pQue = new PriorityQueue((a,b)=>{return a.dist < b.dist;});
        this.board = board;
        this.start = {
            row: this.board.startPos[0],
            col: this.board.startPos[1],
            dist: 0
        };
        this.end = {
            row: this.board.endPos[0],
            col: this.board.endPos[1],
            dist: null
        };

    }

    //Helpers
     getNeighbors(aNode){
        let neighbors = [
            [-1,-1], [0,-1], [1,-1],
            [-1, 0],         [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];
        neighbors.map(ele => { // adjust the neighbor array to the current node
            ele[0] = ele[0] + aNode.row;
            ele[1] = ele[1] + aNode.col;
            return ele;
        });
        //Filters based on the board
        neighbors = neighbors.filter((ele)=>{ //remove out of bound results
            return this.board.inBounds(ele[0],ele[1])
        });
        neighbors = neighbors.filter((ele) =>{//Filter out any squares from the board that are not open.
           return (this.board.grid[ele[0]][ele[1]] !== this.board.gridKey.WALL)
        });

         neighbors = neighbors.map(ele => { // Convert the array into nodes
            return  {
                row: ele[0],
                col: ele[1],
                dist: this.grid[ele[0]][ele[1]]
            };

        });
        //Filters based on dijkstra grid
        neighbors = neighbors.filter((ele) =>{ // Get only the nodes whose paths would be shorter going through current, or who havent been seen yet.
            //console.log(aNode.dist +1, ele.dist);
            return (aNode.dist+1 < ele.dist || ele.dist === null)
        });

        neighbors.map((ele) =>{//update distance to each node
            return ele.dist = aNode.dist+1;
        });
        for (let i of neighbors){ //Add neighbors to list.
            this.grid[i.row][i.col] = i.dist;
            this.pQue.insert(i);
        }
    }


    searchGrid(){
        if(this.start === null || this.end === null){console.log("No start or end"); return;}
        this.pQue.insert(this.start);
       //for(let x = 0; x < 200; x++){
       while(!this.pQue.isEmpty() || !this.pQue.peak() === undefined){
            let currNode = this.pQue.remove();
            if (currNode.row === this.end.row && currNode.col ===this.end.col){console.log("Found");break;}
           setTimeout(()=> this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#00ccff'), 100);
           this.getNeighbors(currNode);
        }
    }
   
    //add start to pQue
    //while
        //get unvisited neighbors
        // -1, -1 | 0, -1 | 1, -1
        // -1, 0  | 0, 0  | 1, 0
        // -1, 1  | 0, 1  | 1, 1
        //update neighbor distances &
        //add neighbor to pQue
        // update chart
        //extract path
}


