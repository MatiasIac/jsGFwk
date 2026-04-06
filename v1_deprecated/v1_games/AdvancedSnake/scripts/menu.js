var Menu = {
	id: "Menu",
	visible: true,
	
	mouseClickId: 0,
	dummyStartGameObject: { width: 275, height: 56, x: 186, y: 243 },
        dummyDebugGameObject: { width: 130, height: 29, x: 501, y: 603 },
	dummyMouse: { width: 1,	height: 1, x: 0, y: 0 },
	
	init: function () {
            
            this.animRatIndex = 0;
            this.animRatAcc = 0;
            this.ratX = -200;            
            
            jsGFwk.Collisions.onObjectCreated(this.dummyStartGameObject);
            jsGFwk.Collisions.onObjectCreated(this.dummyDebugGameObject);
            jsGFwk.Collisions.onObjectCreated(this.dummyMouse);
             

            var self  = this;
            this.mouseClickId = jsGFwk.IO.mouse.registerClick(function (coord) {
                jsGFwk._gameObjects.Menu.dummyMouse.x = coord.x;
                jsGFwk._gameObjects.Menu.dummyMouse.y = coord.y;

                if (jsGFwk._gameObjects.Menu.dummyMouse.isRectColliding(jsGFwk._gameObjects.Menu.dummyStartGameObject)) {
                    jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.Menu.mouseClickId);
                    self.startGame(false);
                }

                if (jsGFwk._gameObjects.Menu.dummyMouse.isRectColliding(jsGFwk._gameObjects.Menu.dummyDebugGameObject)) {
                    jsGFwk.IO.mouse.unregisterClick(jsGFwk._gameObjects.Menu.mouseClickId);                            
                    self.startGame(true);
                }

            });
	},
	startGame: function(d){
            debug = d;
            jsGFwk.Scenes.scenes.menu.disable();
            jsGFwk.Scenes.scenes.gameplay.enable();
            globalInit();
        }, 
	update: function (delta) { 
        
            this.animRatAcc+=delta;       
            if(this.animRatAcc > .2){
               this.animRatIndex++;
               if(this.animRatIndex > 2) this.animRatIndex = 0;
               this.animRatAcc = 0;
            }
            this.ratX+=2;
            if(this.ratX > 840){
                this.ratX = -200;
            }
        },
	
	draw: function (context) {
		
            context.save();
                context.drawImage(jsGFwk.ResourceManager.graphics.splash.image,0, 0);
                
                
                context.drawImage(
                jsGFwk.ResourceManager.graphics.atlas.image,
                    57 * this.animRatIndex, // clipx
                    284 + 57 * 2, // clipy
                    57,
                    57,
                    this.ratX, //x 
                    474, //y
                    57,
                    57
                );
                
                context.drawImage(
                    jsGFwk.ResourceManager.graphics.atlas.image,
                    317 + 64* this.animRatIndex, // clipx
                    64 * 2, // clipy
                    64,
                    64,
                    this.ratX - 100, //x 
                    474, //y
                    57,
                    57
                );  
                
                context.drawImage(
                    jsGFwk.ResourceManager.graphics.atlas.image,
                    337, // clipx
                    292, // clipy
                    175,
                    220,
                    -9, //x 
                    360, //y
                    337,
                    292
                ); 
                
            context.restore();
	}
};