/*
    Simple Sudoku solver: Backtracking algorithm
      by Wilson Tolentino da Silva
*/

class Sudoku {
    constructor(t) {
        this.newTable = t;
        this.tableofVars = [];
    }


    getVars() {
        for (var i = 0; i < this.newTable.length; i++) {
            for (var j = 0; j < this.newTable.length; j++) {
                if (this.newTable[i][j] === undefined) {
                    this.tableofVars.push([i, j]);
                    this.newTable[i][j] = 0;
                }
            }
        }
    }

    checkRow(row) {
        for(var i=0; i<this.newTable.length; i++) {
            if(i === row[1]) {
                continue;
            }
            if (this.newTable[row[0]][i] === this.newTable[row[0]][row[1]]) {
                return false;
            }
        }
        return true;
    }

    checkColumn(column) {
        for(var i=0; i<this.newTable.length; i++) {
            if(i === column[0]) {
                continue;
            }
            if (this.newTable[i][column[1]] === this.newTable[column[0]][column[1]]) {
                return false;
            }
        }
        return true;
    }

    checkSubGrid(grid) {
        for (var i=Math.floor(grid[0]/3)*3; i<Math.floor(grid[0]/3)*3+3; i++) {
            for (var j=Math.floor(grid[1]/3)*3; j<Math.floor(grid[1]/3)*3+3; j++) {
                if((i === grid[0]) && (j === grid[1])) {
                    continue;
                }
                if(this.newTable[i][j] === this.newTable[grid[0]][grid[1]]) {
                    return false;
                }
            }
        }
        return true;
    }

    main() {
        var nextCell;
        var breakpoint = 5;
        this.getVars();
        console.table(this.newTable);
        for(var i=0; i<this.tableofVars.length;) {
            var possibleMove = false;
            nextCell = this.tableofVars[i];
            for(var j=this.newTable[nextCell[0]][nextCell[1]]+1; j<10; j++) {
                this.newTable[nextCell[0]][nextCell[1]] = j;
                if(this.checkSubGrid(nextCell) && this.checkColumn(nextCell) && this.checkRow(nextCell)) { 
                    possibleMove = true;
                    break;
                }
            }
            if (!possibleMove) {
                this.newTable[nextCell[0]][nextCell[1]] = 0;
                i--;
            }
            else {
                i++;
            }
            breakpoint++;
        }
        console.table(this.newTable);
    }
}

var table = [   [4, 2,   ,  ,  ,  ,  ,  , 9],
                [ ,  , 6, 7,  ,  ,  , 2,  ],
                [ , 9,  ,  , 2, 5,  ,  ,  ],
                [8,  ,  ,  ,  ,  ,  ,  ,  ],
                [ ,  , 1, 3, 7, 9, 5,  ,  ],
                [ ,  ,  ,  ,  ,  ,  ,  , 1],
                [ ,  ,  , 4, 6,  ,  , 3,  ],
                [ , 5,  ,  ,  , 3, 9,  ,  ],
                [3,  ,  ,  ,  ,  ,  , 7, 2],
            ];

var newSudoku = new Sudoku(table);

function setup() {
    createCanvas(710, 400);
    newSudoku.main()
}

function draw() {

}