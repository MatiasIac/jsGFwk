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
        this.cols = 10;
    },
    
    cadaBloque: function (blockType, x, y, rotation, drawPointer) {
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
    
    ocupado: function (targetX, targetY, targetRotation) {
        var self = this,
            bloque = self.blocks[self.currentBlock],
            resultado = false;
        
        self.cadaBloque(bloque, targetX, targetY, targetRotation, function (x, y) {
            if ((x < 0) || (x >= self.cols) || (y < 0) || (y >= self.rows)) {
                resultado = true;
            }
        });
        
        return resultado;
    },
    
    update: function (delta) {
        this.acc += delta;
        if (this.acc >= 0.5) {
            this.acc = 0;
            
            if (!this.ocupado(this.xGridPos, this.yGridPos + 1, this.currentRotation)) {
                this.yGridPos++;
            } else {
                //Este elemento pasa a la matrix
            }
        }
    },
    draw: function (ctx) {
        var self = this;
        
        this.cadaBloque(self.blocks[self.currentBlock], 
                        self.xGridPos, self.yGridPos, 
                        self.currentRotation, function(x, y) {
            ctx.fillStyle = self.blocks[self.currentBlock].color;
            ctx.fillRect(x * self.blockSize, y * self.blockSize, self.blockSize, self.blockSize);
            ctx.strokeRect(x * self.blockSize, y * self.blockSize, self.blockSize, self.blockSize);
        });
    }
};