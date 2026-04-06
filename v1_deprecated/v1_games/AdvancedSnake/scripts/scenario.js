WATER_TILE_TYPE = 0;
GRASS_TILE_TYPE = 1;
OBSTACLE_TILE_TYPE = 2;


var scenario = {
    
    id: 'scenario',
    visible: true,
    zOrder: -10,
    
    MAP_WIDTH: 5, // in blocks. Each block size depends on tile with and height
    MAP_HEIGHT: 5,
    TILE_W: 64,
    TILE_H: 64,
    BOUND_DISTANCE: 6,

    
    init: function () {
    
        this.rows = this.MAP_HEIGHT + level * this.MAP_HEIGHT;
        this.cols = this.MAP_WIDTH + level * this.MAP_WIDTH;        
        
        this.correctiveOffsetX = ((this.cols * .1)-1) * 320;
        this.correctiveOffsetY = ((this.rows * .1)-1) * 320;
        
        this.map = [];        
        this.grid = [];                
        this.snakes = [];
        
        
        this.emptySlots = [];        
        this.createScenario(); 
        this.totalCheese = this.addCheese();
        
        for(var i=0; i< level; i++){
            this.addSnake();
        }
 
    },

    getCellType: function(x,y){
        
        var gCoordinate = this.getGridCoordinate(x,y);
        return this.map[gCoordinate.x][gCoordinate.y];
        
    },
    
    getGridCenter : function(){
        return {x: this.cols*.5, y:this.rows*.5 };
    },
        
    getGridCoordinate: function(x,y){        
        return {
            x: Math.floor(x/this.TILE_W), 
            y: Math.floor(y/this.TILE_H)
        };      
    },
    
    getWorldCoordinate : function(gridX,gridY){ // check values returned for this func
        
        var x = gridX * this.TILE_W;
        var y = gridY * this.TILE_H;        
        return {x:x, y:y};        
    },
    
    createScenario: function(){
             
        // bounaries & terrain
        for(var x=0; x< this.cols;  x++){
             var rows = [];
             var gRows = [];
             for(var y=0; y< this.rows; y++){
                 rows[y] = this.getTerrainPiece(x,y);
                 gRows[y] = (rows[y].type === GRASS_TILE_TYPE)?0:1;                 
             }
             this.map[x] = rows;
             this.grid[x] = gRows;
        }
        
    },
    addCheese : function(){
        
        var tCheese = 2 + level * 3;
        for(var i=0; i < tCheese ;i++){
            var r = Math.floor((Math.random() * this.emptySlots.length-1) + 1);
            var d = this.emptySlots[r];
            this.map[d.x][d.y].containCheese = true; 
            this.emptySlots.splice(r,1);
        }  
        
        return tCheese;

    },
    
    addSnake : function(){
        
        var r = Math.floor((Math.random() * this.emptySlots.length-1) + 1);
        var o = this.emptySlots[r];
        this.emptySlots.splice(r,1);
        
        r = Math.floor((Math.random() * this.emptySlots.length-1) + 1);
        var d = this.emptySlots[r];
        this.emptySlots.splice(r,1);                                
                
                
        var snakeCoordA = this.getWorldCoordinate(o.x,o.y);       
        var clone = jsGFwk._gameObjects.snake.cloneObject({ x: snakeCoordA.x, y: snakeCoordA.y});
        clone.init();
        clone.setCoords(snakeCoordA,o,d);                        
        
        this.snakes.push(clone);        
         
    },
    
    getTerrainPiece :function(x,y){
      
      var type = GRASS_TILE_TYPE;

      // boundaries are water
      if(y === 0 || y === this.rows || x === 0 || x === this.cols ){          
          type = WATER_TILE_TYPE; // water          
      }else {
            // print random watter
            var r = Math.floor((Math.random() * 100) + 1);
            if(r > 80 && r < 90){
                type = WATER_TILE_TYPE; // water                  
            }else if(r > 90){
                type = OBSTACLE_TILE_TYPE; // water                  
            }            
      }

      var posX = x * this.TILE_W;
      var posY = y * this.TILE_H;

      if(type === GRASS_TILE_TYPE){
        this.emptySlots.push({x:x, y:y});                  
      }
      
      return {type:type, x:posX, y:posY, containCheese:false};
        
    },
    
    update: function (delta) {
        for(var k = 0; k< this.snakes.length;k++){
            this.snakes[k].update(delta);
        }
                
    },
    
    draw: function (context) {

        // bounaries & terrain
        var gridCoordinate = this.getGridCoordinate(rat.simX,rat.simY);  
        var offsetValues = rat.getSimValueOffset();
                
        var xInit = gridCoordinate.x - this.BOUND_DISTANCE;
        var xEnd = gridCoordinate.x + this.BOUND_DISTANCE;
        
        var yInit = gridCoordinate.y - this.BOUND_DISTANCE;
        var yEnd = gridCoordinate.y + this.BOUND_DISTANCE;
        
        for(var y=yInit; y< yEnd; y++){  
            
            for(var x=xInit; x< xEnd;  x++){             
                
                if(gridCoordinate.x === x && gridCoordinate.y === y && this.map[x][y].containCheese){
                    this.map[x][y].containCheese = false;
                    this.totalCheese--;
                     jsGFwk.ResourceManager.sounds.cheese.audio.play();
                }
                
                var tileInfo = null;
                if(x < 0 || x >= this.cols || y < 0 || y >= this.rows){
                    tileInfo = {
                        x: x * this.TILE_W,
                        y: y * this.TILE_H,
                        type: WATER_TILE_TYPE};
                }else{
                    tileInfo = this.map[x][y];
                }
                
                var tileSprite = this.getTileSprite(tileInfo.type);                                               
                
                context.drawImage(
                        jsGFwk.ResourceManager.graphics.atlas.image,
                        tileSprite.x,
                        tileSprite.y,
                        this.TILE_W,
                        this.TILE_H,
                        tileInfo.x + offsetValues.offsetX - this.correctiveOffsetX,
                        tileInfo.y + offsetValues.offsetY - this.correctiveOffsetY,
                        this.TILE_W,
                        this.TILE_H
                );  
                
                // draw chese over the grass
                if(tileInfo.containCheese){

                    context.drawImage(
                        jsGFwk.ResourceManager.graphics.atlas.image,
                        0, // clipx
                        76, // clipy
                        44,
                        64,
                        tileInfo.x + offsetValues.offsetX - this.correctiveOffsetX,
                        tileInfo.y + offsetValues.offsetY - this.correctiveOffsetY,
                        44,
                        64
                    ); 
            
                }
                
                if(debug){                    
                    
                    var gV = "";
                    try{
                        gV = ":[G" + this.grid[x][y] + "]"
                    }catch(e){}
                    
                    context.fillStyle = "white";
                    context.font = "8pt zxBold";
                    context.fillText(x + "/" + y + "/" + tileInfo.type + gV,  
                        tileInfo.x + offsetValues.offsetX - this.correctiveOffsetX, 
                        32+tileInfo.y + offsetValues.offsetY - this.correctiveOffsetY
                    );                
            
                }
                
                
            }      
        }
        
        for(var k = 0; k< this.snakes.length;k++){
            
            this.snakes[k].x = this.snakes[k].internalX + offsetValues.offsetX - this.correctiveOffsetX;
            this.snakes[k].y = this.snakes[k].internalY + offsetValues.offsetY - this.correctiveOffsetY;
                        
            this.snakes[k].draw(context);            
            
            if(debug){
            
                if(this.snakes[k].calculatedPath!==undefined && this.snakes[k].calculatedPath!==null && this.snakes[k].calculatedPath.length > 0){

                    var pathCoord = this.snakes[k].calculatedPath[0];
                    var prevPoint = this.getWorldCoordinate(pathCoord[0],pathCoord[1]); 
                    var dtext = pathCoord[0] + "[ " + prevPoint.x + " ] /" + pathCoord[1] + "[ " + prevPoint.y + " ]";  
                    for(var j=1; j< this.snakes[k].calculatedPath.length; j++){

                        pathCoord = this.snakes[k].calculatedPath[j];
                        var nextPoint = this.getWorldCoordinate(pathCoord[0],pathCoord[1]); 

                        dtext += " --> " + pathCoord[0] + "[ " + nextPoint.x + " ] /" + pathCoord[1] + "[ " + nextPoint.y + " ]";  

                        context.beginPath();
                        context.moveTo(prevPoint.x + 32 + offsetValues.offsetX - this.correctiveOffsetX, prevPoint.y + 32 + offsetValues.offsetY - this.correctiveOffsetY);
                        context.lineTo(nextPoint.x + 32 + offsetValues.offsetX - this.correctiveOffsetX, nextPoint.y + 32 + offsetValues.offsetY - this.correctiveOffsetY);
                        context.lineWidth = 3;
                        // set line color
                        context.strokeStyle = '#ff0000';
                        context.stroke();

                        prevPoint = nextPoint;                

                    }    
                    //console.log(dtext);
                    //debugger;
                }

            }
            
        }
        
        
        
        

    },
    getTileSprite: function(type){
        
        switch(type){
            case WATER_TILE_TYPE:
                return {x:64,y:0};                
            case GRASS_TILE_TYPE:
                return {x:0,y:0};
            case OBSTACLE_TILE_TYPE:
                return {x:128,y:0};                
        }        
    }
};