!function(t){var i={};function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var r in t)e.d(s,r,function(i){return t[i]}.bind(null,r));return s},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){"use strict";e.r(i);class s{constructor(t=((t,i)=>t<i)){this.heap=[null],this.comparator=t}isEmpty(){return this.heap.length<=1}insert(t){if(this.heap.push(t),this.heap.length>2){let t=this.heap.length-1;for(;this.comparator(this.heap[t],this.heap[Math.floor(t/2)])&&([this.heap[t],this.heap[Math.floor(t/2)]]=[this.heap[Math.floor(t/2)],this.heap[t]],t=Math.floor(t/2),!(t<=1)););}}remove(){if(!this.isEmpty()){if(2===this.heap.length)return this.heap.pop();let t=this.heap[1];if(this.heap[1]=this.heap.pop(),2===this.heap.length)return t;let i=1,e=2*i,s=2*i+1;if(3===this.heap.length)return this.comparator(this.heap[e],this.heap[i])&&([this.heap[e],this.heap[i]]=[this.heap[i],this.heap[e]]),t;for(;(this.comparator(this.heap[e],this.heap[i])||this.comparator(this.heap[s],this.heap[i]))&&(void 0===this.heap[s]||this.comparator(this.heap[e],this.heap[s])?([this.heap[e],this.heap[i]]=[this.heap[i],this.heap[e]],i=e):([this.heap[s],this.heap[i]]=[this.heap[i],this.heap[s]],i=s),e=2*i,s=2*i+1,void 0!==this.heap[e]&&void 0!==this.heap[s]););return t}console.log("Queue is Empty")}peak(){return this.heap[1]}}class r{constructor(t,i=2){this.grid=new Array(t.rows).fill(null).map(()=>new Array(t.cols).fill(null)),this.node={row:null,col:null,dist:null},this.pQue=new s((t,i)=>t.dist<i.dist),this.board=t,this.start={row:this.board.startPos[0],col:this.board.startPos[1],dist:0},this.grid[this.start.row][this.start.col]=0,this.end={row:this.board.endPos[0],col:this.board.endPos[1],dist:null},this.searchMode=i}getNeighbors(t){let i=[];return i=1===this.searchMode?[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]:[[0,-1],[-1,0],[1,0],[0,1]],i.map(i=>(i[0]=i[0]+t.row,i[1]=i[1]+t.col,i)),i=i.filter(t=>this.board.inBounds(t[0],t[1])),i=i.filter(t=>this.board.grid[t[0]][t[1]]!==this.board.gridKey.WALL),i}processNeighbors(t,i){let e=t.map(t=>({row:t[0],col:t[1],dist:this.grid[t[0]][t[1]]}));e=e.filter(t=>i.dist+1<t.dist||null===t.dist);for(let t of e)t.dist=i.dist+1,this.grid[t.row][t.col]=t.dist,this.pQue.insert(t)}rSearchGrid(){if(this.pQue.isEmpty()){if(null===this.start||null===this.end)return void console.log("No start or end");this.pQue.insert(this.start)}if(!this.pQue.isEmpty()||void 0===!this.pQue.peak()){let t=this.pQue.remove();if(t.row===this.end.row&&t.col===this.end.col)this.end.dist=t.dist+1,this.extractPath();else{this.board.highlightCell(t.row*this.board.gridSize,t.col*this.board.gridSize,"#00ccff");let i=this.getNeighbors(t);this.processNeighbors(i,t),window.requestAnimationFrame(()=>this.rSearchGrid())}}}extractPath(t=[]){0===t.length&&t.push(this.end);let i=t[t.length-1];if(0!==i.dist){let e=this.getNeighbors(i);for(let t of e)i.dist>this.grid[t[0]][t[1]]&&null!==this.grid[t[0]][t[1]]&&(i={row:t[0],col:t[1],dist:this.grid[t[0]][t[1]]});this.board.highlightCell(i.row*this.board.gridSize,i.col*this.board.gridSize,"#119900"),t.push(i),window.requestAnimationFrame(()=>this.extractPath(t))}}}class h{static handleInput(t,i){let e=t.target.id;"aStar"===e?console.log("Selected: ",t.target.text):"clearAllBtn"===e?h.clearAll(i):"clearStartBtn"===e?h.clearStart(i):"clearEndBtn"===e?h.clearEnd(i):"runBtn"===e?h.runBtn(i):console.log(t.target)}static clearAll(t){t.drawInitBoard()}static clearStart(t){if(t.isStartSet()){const i=t.startPos[0],e=t.startPos[1];t.clearCell(i,e),t.startPos=[null,null]}}static clearEnd(t){if(t.isEndSet()){const i=t.endPos[0],e=t.endPos[1];t.clearCell(i,e),t.endPos=[null,null]}}static runBtn(t){if(t.isStartSet()&&t.isEndSet()){t.refreshBoard(),new r(t).rSearchGrid(),console.log("Done")}}}let o=document.getElementById("gameScreen"),l=parseInt(o.getAttribute("height")),n=parseInt(o.getAttribute("width")),a=document.getElementById("navBar"),d=0,c=new class{constructor(t,i,e,s){this.width=i,this.height=e,this.gridSize=s,this.startPos=[null,null],this.endPos=[null,null],this.currPos=[null,null],this.rows=Math.floor(this.height/this.gridSize),this.cols=Math.floor(this.width/this.gridSize),this.grid=new Array(this.rows).fill(null).map(()=>new Array(this.cols).fill(1)),this.gridKey={WALL:0,OPENSPACE:1,START:2,END:3},this.canvas=t,this.ctx=this.canvas.getContext("2d")}isStartSet(){return null!==this.startPos[0]}setStartPos(t,i){this.startPos=[t,i]}isEndSet(){return null!==this.endPos[0]}setEndPos(t,i){this.endPos=[t,i]}isSpaceOpen(t,i){return this.grid[t][i]===this.gridKey.OPENSPACE}inBounds(t,i){return!(t<0||i<0||t>=this.rows||i>=this.cols)}drawInitBoard(){for(let t of this.grid)t.fill(this.gridKey.OPENSPACE);this.startPos=[null,null],this.endPos=[null,null],this.ctx.clearRect(0,0,this.width,this.height),this.ctx.fillStyle="grey",this.ctx.fillRect(0,0,this.width,this.height);for(let t=0;t<=this.width;t+=this.gridSize)this.ctx.moveTo(t,0),this.ctx.lineTo(t,this.height),this.ctx.stroke();for(let t=0;t<=this.height;t+=this.gridSize)this.ctx.moveTo(0,t),this.ctx.lineTo(this.width,t),this.ctx.stroke()}refreshBoard(){for(let t=0;t<=this.rows-1;t++)for(let i=0;i<=this.cols-1;i++)1===this.grid[t][i]&&this.clearCell(t,i)}drawWall(t,i){this.inBounds(t,i)?t===this.currPos[0]&&i===this.currPos[1]||(this.currPos=[t,i],this.grid[t][i]===this.gridKey.OPENSPACE?(this.grid[t][i]=this.gridKey.WALL,this.highlightCell(t*this.gridSize,i*this.gridSize,"black")):this.grid[t][i]===this.gridKey.WALL&&this.clearCell(t,i)):console.log("out of bounds")}drawStart(t,i){this.inBounds(t,i)?this.grid[t][i]===this.gridKey.OPENSPACE&&(this.grid[t][i]=this.gridKey.START,this.startPos=[t,i],this.highlightCell(t*this.gridSize,i*this.gridSize,"#66ff00")):console.log("out of bounds")}drawEnd(t,i){this.inBounds(t,i)?this.grid[t][i]===this.gridKey.OPENSPACE&&(this.grid[t][i]=this.gridKey.END,this.endPos=[t,i],this.highlightCell(t*this.gridSize,i*this.gridSize,"#6600ff")):console.log("out of bounds")}clearCell(t,i){this.inBounds(t,i)?(this.grid[t][i]=this.gridKey.OPENSPACE,this.highlightCell(t*this.gridSize,i*this.gridSize,"grey")):console.log("out of bounds")}highlightCell(t,i,e){if(t<0||i<0||t>this.width||i>this.height)console.log("Out of bounds",t,i);else{this.ctx.fillStyle=e;let s=Math.floor(t/this.gridSize)*this.gridSize,r=Math.floor(i/this.gridSize)*this.gridSize;this.ctx.fillRect(s,r,this.gridSize,this.gridSize),this.ctx.lineWidth=1,this.ctx.strokeStyle="black",this.ctx.stroke()}}}(o,n,l,10);function u(t){const{x:i,y:e}=t.target.getBoundingClientRect();let s=Math.floor((t.clientX-i)/c.gridSize),r=Math.floor((t.clientY-e)/c.gridSize);!1===c.isStartSet()?c.drawStart(s,r):!1===c.isEndSet()?c.drawEnd(s,r):c.drawWall(s,r)}c.drawInitBoard(),o.addEventListener("click",t=>{u(t)}),o.addEventListener("mousemove",t=>{1===d&&u(t)}),o.addEventListener("mouseleave",()=>{d=0}),o.addEventListener("mousedown",()=>{d=1}),o.addEventListener("mouseup",()=>{d=0}),a.addEventListener("click",t=>h.handleInput(t,c))}]);