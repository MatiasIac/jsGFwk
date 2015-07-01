var game = {
    id: 'game',
    visible: true,
    init: function () {
        this.blocks = [
            { positions: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan' },
            { positions: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue' },
            { positions: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' },
            { positions: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' },
            { positions: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green' },
            { positions: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'aqua' },
            { positions: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red' }];
        
        this.blockSize = 20;
        this.currentBlock = 0;
        this.currentRotation = 0;
        this.xGridPos = 0;
        this.yGridPos = 0;
        this.acc = 0;
        this.rows = 30;
        this.cols = 15;
        
        this.board = [];
        for (var i = 0; i < this.rows; i++) {
            this.board.push([]);
            for (var j = 0; j < this.cols; j++) {
                this.board[i].push(0);
            }
        }
    },
    
    eachBlock: function (blockType, x, y, rotation, drawPointer) {
        var result, row = 0, col = 0,
            blocks = blockType.positions[rotation];
        
        for(var bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
            if (blocks & bit) {
              drawPointer(x + col, y + row);
            }
            
            if (++col === 4) {
              col = 0;
              ++row;
            }
        }
    },
    
    isBoardFilled: function (x, y) {
        return this.board[y][x] === 1;
    },
    
    filled: function (targetX, targetY, targetRotation) {
        var self = this,
            block = self.blocks[self.currentBlock],
            result = false;
        
        self.eachBlock(block, targetX, targetY, targetRotation, function (x, y) {
            if ((x < 0) || (x >= self.cols) || (y < 0) || (y >= self.rows) || self.isBoardFilled(x, y)) {
                result = true;
            }
        });
        
        return result;
    },
    
    drawBoard: function (ctx) {
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j] === 1) {
                    ctx.fillStyle = "gray";
                    ctx.fillRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                    ctx.strokeRect(j * this.blockSize, i * this.blockSize, this.blockSize, this.blockSize);
                }
            }
        }
    },
    
    update: function (delta) {
        this.acc += delta;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            if (!this.filled(this.xGridPos + 1, this.yGridPos, this.currentRotation)) {
                this.xGridPos++;
            }
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            if (!this.filled(this.xGridPos - 1, this.yGridPos, this.currentRotation)) {
                this.xGridPos--;
            }
        }
                
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            this.yGridPos = 28;
        }
        
        if (this.acc >= 0.5) {
            this.acc = 0;
            
            if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
                var nextRotation = this.currentRotation + 1;
                if (nextRotation > 3) {
                    nextRotation = 0;
                }
                if (!this.filled(this.xGridPos, this.yGridPos, nextRotation)) {
                    this.currentRotation = nextRotation;
                }
            }
            
            if (!this.filled(this.xGridPos, this.yGridPos + 1, this.currentRotation)) {
                this.yGridPos++;
            } else {
                //Este elemento pasa a la matrix
            }
        }
    },
    draw: function (ctx) {
        var self = this;
        
        this.eachBlock(self.blocks[self.currentBlock], 
                        self.xGridPos, self.yGridPos, 
                        self.currentRotation, function(x, y) {
            ctx.fillStyle = self.blocks[self.currentBlock].color;
            ctx.fillRect(x * self.blockSize, y * self.blockSize, self.blockSize, self.blockSize);
            ctx.strokeRect(x * self.blockSize, y * self.blockSize, self.blockSize, self.blockSize);
        });
        
        this.drawBoard(ctx);
    }
};