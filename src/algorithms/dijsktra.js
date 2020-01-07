import PriorityQueue from "./priorityQueue";

export default class DSP{
    constructor(board, searchMode = 2){
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
        this.grid[this.start.row][this.start.col] = 0;
        this.end = {
            row: this.board.endPos[0],
            col: this.board.endPos[1],
            dist: null
        };
        this.searchMode = searchMode;
    }

    //Helpers
     getNeighbors(aNode) {
         let neighbors = [];
         if (this.searchMode === 1) {
             neighbors = [
                 [-1, -1], [0, -1], [1, -1],
                 [-1, 0], [1, 0],
                 [-1, 1], [0, 1], [1, 1]
             ];
         } else {
             neighbors = [
                 [0, -1],
                 [-1, 0], [1, 0],
                 [0, 1]
             ];
         }

         neighbors.map(ele => { // adjust the neighbor array to the current node
             ele[0] = ele[0] + aNode.row;
             ele[1] = ele[1] + aNode.col;
             return ele;
         });
         //Filters based on the board
         neighbors = neighbors.filter((ele) => { //remove out of bound results
             return this.board.inBounds(ele[0], ele[1])
         });
         neighbors = neighbors.filter((ele) => {//Filter out any squares from the board that are not open.
             return (this.board.grid[ele[0]][ele[1]] !== this.board.gridKey.WALL)
         });
         return neighbors;
     }

      processNeighbors(neighborArr, aNode){
       let neighbors = neighborArr.map(ele => { // Convert the array into nodes
            return  {
                row: ele[0],
                col: ele[1],
                dist: this.grid[ele[0]][ele[1]]
            };
        });
        //Filters based on dijkstra grid
        neighbors = neighbors.filter((ele) =>{ // Get only the nodes whose paths would be shorter going through current, or who havent been seen yet.
            return (aNode.dist+1 < ele.dist || ele.dist === null)
        });
        for (let i of neighbors){ //Add neighbors to list.
            i.dist = aNode.dist + 1;
            this.grid[i.row][i.col] =i.dist;
            this.pQue.insert(i);
        }
    }


    // searchGrid(){
    //     if(this.start === null || this.end === null){console.log("No start or end"); return;}
    //     this.pQue.insert(this.start);
    //     while(!this.pQue.isEmpty() || !this.pQue.peak() === undefined){
    //         let currNode = this.pQue.remove();
    //        // this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#00ccff');
    //         if (currNode.row === this.end.row && currNode.col ===this.end.col){
    //             this.end.dist = currNode.dist+1;
    //             this.extractPath();
    //             break;
    //         }//change to extract path when its done
    //
    //        setTimeout(()=> this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#00ccff'), 0);
    //        let neighbors = this.getNeighbors(currNode);
    //        this.processNeighbors(neighbors,currNode);
    //     }
    // }

    rSearchGrid(){
        if(this.pQue.isEmpty()){
            if(this.start === null || this.end === null){console.log("No start or end"); return;}
            this.pQue.insert(this.start);
        }
        if(!this.pQue.isEmpty() || !this.pQue.peak() === undefined){
            let currNode = this.pQue.remove();
            if (currNode.row === this.end.row && currNode.col ===this.end.col){
                this.end.dist = currNode.dist+1;
                this.extractPath();
            }
            else {
                this.board.highlightCell(currNode.row * this.board.gridSize, currNode.col * this.board.gridSize, '#00ccff');
                let neighbors = this.getNeighbors(currNode);
                this.processNeighbors(neighbors, currNode);
                window.requestAnimationFrame(()=>this.rSearchGrid());
            }
        }
    }
    // extractPath(){
    //     let path = [];
    //     path.push(this.end);
    //     let currNode = this.end;
    //     while(currNode.dist!== 0){
    //         let nodes = this.getNeighbors(currNode);
    //         for (let node of nodes){
    //             if(currNode.dist > this.grid[node[0]][node[1]] && this.grid[node[0]][node[1]] !== null){
    //                 currNode = {
    //                     row: node[0],
    //                     col: node[1],
    //                     dist: this.grid[node[0]][node[1]]
    //                 };
    //             }
    //         }
    //         this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#119900');
    //         //setTimeout(()=> this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#119900'), 1000);
    //         path.push(currNode);
    //     }
    // }

    extractPath(path = []){
        if(path.length === 0 ){
            path.push(this.end);
        }
        let currNode = path[path.length-1];
        if(currNode.dist !==0){
            let nodes = this.getNeighbors(currNode);
            for (let node of nodes){
                if(currNode.dist > this.grid[node[0]][node[1]] && this.grid[node[0]][node[1]] !== null){
                    currNode = {
                        row: node[0],
                        col: node[1],
                        dist: this.grid[node[0]][node[1]]
                    };
                }
            }
            this.board.highlightCell(currNode.row*this.board.gridSize, currNode.col*this.board.gridSize, '#119900');
            path.push(currNode);
            window.requestAnimationFrame(()=>this.extractPath(path));
        }
    }
}


