var snake = {
    
    id: 'snake',
    visible: true,
    zOrder: 1,
    
    TILE_WIDTH: 64,
    TILE_HEIGHT: 64,
    ANIM_X_OFFSET: 317,
    ANIM_Y_OFFSET: 0,
    ORIENTATION_UP: 3,
    ORIENTATION_LEFT: 1,
    ORIENTATION_DOWN: 0,
    ORIENTATION_RIGHT: 2,
    
    init: function () {        
        
        this.x = 0;
        this.y = 0;        
        
        this.speed = 1;
        
        this.animIndex = 0;
        this.animAcc = 0;
        this.orientation = this.ORIENTATION_UP;
        
        this.offsetX  = 0;
        this.offsetY = 0;

        this.calculatedPath = null;
        this.calculatedPathIndex = 0;
        this.pathComplete = false;
        
        this.pointA = null;
        this.pointB = null;
        
        this.drawPointer = this.drawRunning;
        
    },   
    
    calculatePF: function(){
        
        
        if(this.pointA!==null && this.pointB!==null){
            
            console.log(this.pointA);
            console.log(this.pointB);
               
            this.calculatedPath = findPath(scenario.grid,[this.pointA.x, this.pointA.y],[this.pointB.x, this.pointB.y]);                                                                        
            if(this.calculatedPath.length > 0){
                this.calculatedPathIndex = 0;
                this.pathComplete = false;
                console.log(this.calculatedPath);
            }            
            
        }
        
    },  
    
    setCoords: function(coords,pointA,pointB){
        
        this.internalX = coords.x;
        this.internalY = coords.y;
        
        this.pointA = pointA;
        this.pointB = pointB;
        
        this.calculatePF();
                
    },    
    
    update: function (delta) {
        
        /** anim mov */
        this.animAcc+=delta;       
        if(this.animAcc > .2){
            this.animIndex++;
            if(this.animIndex > 2) this.animIndex = 0;
            this.animAcc = 0;            
        }
        
        this.offsetX = this.offsetY = 0;                
        if(this.calculatedPath !== null && this.calculatedPath !== undefined && this.calculatedPath.length > 0){
          
            this.calculateOffset();
        }
        
        this.move(this.offsetX,this.offsetY);
        
    },
    getFixedOffset : function(valueA,valueB){
        
        if(valueA - valueB !== 0){
            
            if(valueA - valueB < 0){
                return -1;
            }else{
                return 1;
            }
            
        }else{
            
            return 0;
            
        }
        
    },
    
    calculateOffset: function(){
        
       var snakeOBJ = scenario.getGridCoordinate(this.internalX,this.internalY);       
       //console:debugger;
       
       if(this.calculatedPathIndex < this.calculatedPath.length){                      
           
            var i = this.calculatedPath[this.calculatedPathIndex];            
            var wCoord = scenario.getWorldCoordinate(i[0],i[1]);
                       
            if(Math.abs(wCoord.x  - this.internalX) < 1 && Math.abs(wCoord.y - this.internalY) < 1 ){     
                this.calculatedPathIndex++;             
            }else{                
            
                this.offsetX = i[0] - snakeOBJ.x;
                this.offsetY = i[1] - snakeOBJ.y;                
                if(this.offsetX === 0 && this.offsetY  === 0){
                    this.offsetX = this.getFixedOffset(wCoord.x,this.internalX);
                    this.offsetY = this.getFixedOffset(wCoord.y,this.internalY);
                }
            }
            
       }else{
           
           if(!this.pathComplete){
                this.pathComplete = true;
                var t = this.pointB;
                this.pointB = this.pointA;
                this.pointA = t;
                this.calculatePF();
           }
           
       }
              
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
            57,
            57
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
        
        this.drawPointer = this.drawRunning;
     
        this.internalX += offsetX * this.speed;
        this.internalY += offsetY * this.speed;
        
    },
    
  
};