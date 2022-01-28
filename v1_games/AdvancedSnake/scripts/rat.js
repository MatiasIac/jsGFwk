var rat = {
    
    id: 'rat',
    visible: true,
    zOrder: 1,

    TILE_WIDTH: 57,
    TILE_HEIGHT: 57,
    ANIM_X_OFFSET: 0,
    ANIM_Y_OFFSET: 284,
    ORIENTATION_UP: 3,
    ORIENTATION_LEFT: 1,
    ORIENTATION_DOWN: 0,
    ORIENTATION_RIGHT: 2,
    
    init: function () {        
        
        this.x = 320 - (this.TILE_WIDTH*.5);
        this.y = 320 - (this.TILE_WIDTH*.5);
        
        this.origSimX = 0;
        this.origSimY = 0;
        this.simX = 0;
        this.simY = 0;
        
        this.speed = 5;
        
        this.animIndex = 0;
        this.animAcc = 0;
        this.orientation = this.ORIENTATION_UP;
        
        this.drawPointer = this.drawStandBy;
        
    },    
    
    setSimCoordValues: function(obj){
        
        this.origSimX = this.simX = obj.x;
        this.origSimY = this.simY = obj.y;
        
    },
    
    getSimValueOffset: function(){
        return { 
            offsetX: this.origSimX - this.simX, 
            offsetY: this.origSimY - this.simY
        };
    },
    
    update: function (delta) {
        
        /** anim mov */
        this.animAcc+=delta;       
        if(this.animAcc > .2){
            this.animIndex++;
            if(this.animIndex > 2) this.animIndex = 0;
            this.animAcc = 0;
        }
        
        if (jsGFwk.IO.keyboard._activeKey[38]) {  // up arrow
            this.move(0,-1);                
        }else  if (jsGFwk.IO.keyboard._activeKey[40]) {  // down arrow
            this.move(0,1);
        }else  if (jsGFwk.IO.keyboard._activeKey[39]) {  // right arrow
            this.move(1,0);
        }else  if (jsGFwk.IO.keyboard._activeKey[37]) {  // left arrow
            this.move(-1,0);
        }else{
            this.drawPointer = this.drawStandBy;
        }                             
                
    },
    drawStandBy: function(context) {
        
        context.drawImage(
            jsGFwk.ResourceManager.graphics.atlas.image,
            this.ANIM_X_OFFSET + this.TILE_WIDTH, // clipx
            this.ANIM_Y_OFFSET + this.TILE_WIDTH * this.orientation, // clipy
            this.TILE_WIDTH,
            this.TILE_WIDTH,
            this.x, //x 
            this.y, //y
            this.TILE_WIDTH,
            this.TILE_WIDTH
        );  

    },
    
    drawRunning: function(context){
        
        context.drawImage(
            jsGFwk.ResourceManager.graphics.atlas.image,
            this.ANIM_X_OFFSET + this.TILE_WIDTH * this.animIndex, // clipx
            this.ANIM_Y_OFFSET + this.TILE_WIDTH * this.orientation, // clipy
            this.TILE_WIDTH,
            this.TILE_WIDTH,
            this.x, //x 
            this.y, //y
            this.TILE_WIDTH,
            this.TILE_WIDTH
        );  

    },
    
    draw: function (context) {                
        
        this.drawPointer(context);              
        
    },
    
    move: function(offsetX,offsetY){
        
        if(offsetY > 0){
            this.orientation = this.ORIENTATION_DOWN;
        }else if(offsetY < 0){
            this.orientation = this.ORIENTATION_UP;
        }else if(offsetX > 0){
            this.orientation = this.ORIENTATION_RIGHT;
        }else if(offsetX < 0){
            this.orientation = this.ORIENTATION_LEFT;
        }
        
        var currentCellType = scenario.getCellType(this.simX,this.simY);
        var speed = this.speed;
        if(currentCellType.type === OBSTACLE_TILE_TYPE){
            speed = 1;
        }
        
        var nX = this.simX + offsetX*speed;
        var nY = this.simY + offsetY*speed;
        
        // check if possible next movement
        var nextBlockType = scenario.getCellType(nX,nY);        
        if(nextBlockType.type !== WATER_TILE_TYPE){
            this.simX = nX;
            this.simY = nY;            
        }
        
        jsGFwk.ResourceManager.sounds.walk.audio.play();
        
        this.drawPointer = this.drawRunning;
    }
  
};