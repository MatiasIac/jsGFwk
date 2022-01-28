var gameManager = {
    
    id: "gameManager",
    visible: true,
    
    STATUS_PLAYING: "playing",
    STATUS_GAME_OVER: "gameover",
    STATUS_GAME_WIN: "win",
    
    
    init: function(){
    
        this.time = 60;
        this.status = this.STATUS_PLAYING;
        this.winTime = 4;
        this.intervalFunc= null;
        
        var self = this;
        self.tickTimer = new jsGFwk.Timer({
            
            action: function(){
                self.time--;
                if(self.time<=0 && this.status === this.STATUS_PLAYING ){
                    self.gameOver();                    
                }
            },tickTime: 1            
        });
    
              
    },
    
    update: function (delta) {
        
        this.tickTimer.tick(delta);
        
        if(this.status === this.STATUS_PLAYING){
            
            if(scenario.totalCheese <= 0){
                this.win();
            }
            
            var rPos = scenario.getGridCoordinate(rat.simX,rat.simY);
            for(var i=0;i<scenario.snakes.length;i++){
                
                var sPos = scenario.getGridCoordinate(scenario.snakes[i].internalX,scenario.snakes[i].internalY);
            
                if(rPos.x === sPos.x && rPos.y === sPos.y){
                    jsGFwk.ResourceManager.sounds.kicked.audio.play();
                    this.gameOver();
                }            
                
            }
            
        }
        
        if(this.status === this.STATUS_GAME_WIN){
            if(this.winTime <=0){                
                clearInterval(this.intervalFunc);               
                gameManager.winTime = 0;
            }
        }
        
    },
    
    win: function(){
        
        this.status = this.STATUS_GAME_WIN;
        
        this.winTime = 3;
        var self = this;
        this.intervalFunc = setInterval(function(){
            self.winTime--;
        },1000);
        
        rat.destroy();
        for(var i=0;i<scenario.snakes.length;i++){
            scenario.snakes[i].destroy();
        }
        scenario.snakes = [];
        
        setTimeout(function(){
            clearInterval(this.intervalFunc);
            level ++;
            jsGFwk.Scenes.scenes.gameplay.disable();
            jsGFwk.Scenes.scenes.gameplay.enable();
            globalInit();                 
        },3000);
        
        
    },
    
    gameOver: function(){
        
        this.time = 0;
        this.status = this.STATUS_GAME_OVER;
        rat.destroy();
        
        setTimeout(function(){
            
            for(var i=0;i<scenario.snakes.length;i++){            
                scenario.snakes[i].destroy();            
            }
            scenario.snakes = [];

            jsGFwk.Scenes.scenes.gameplay.disable();
            jsGFwk.Scenes.scenes.menu.enable();
            level = 1;
            
        },4000);
        
        
    },  
    
    draw: function (context) {
        
    }
    
};