var UI = {    
    id: "UI",
    visible: true,
    update: function (delta) {
        
    },
    
    draw: function (context) {
                
        context.save();
        
            context.fillStyle = "white";
            
            if(gameManager.status === gameManager.STATUS_PLAYING){                
                
                context.beginPath();
                context.rect(0, 0, 640, 50);
                context.globalAlpha=0.2;
                context.fillStyle = 'black';
                context.fill();
                context.lineWidth = 7;
                context.strokeStyle = 'black';
                context.stroke();
                
                context.globalAlpha=1;
                context.fillStyle = "white";
                context.font = "12pt Arial";
                context.fillText("Tiempo Restante: " + gameManager.time, 10, 15);            
                context.fillText("Quesos Restantes: " + scenario.totalCheese, 10, 35);
                
            }else if(gameManager.status === gameManager.STATUS_GAME_WIN){
                
                context.beginPath();
                context.rect(0, 0, 640, 640);
                context.globalAlpha=0.8;
                context.fillStyle = 'black';
                context.fill();
                context.lineWidth = 7;
                context.strokeStyle = 'black';
                context.stroke();
                
                context.fillStyle = "yellow";    
                context.font = "20pt caveman";
                context.fillText("TITAN DEL QUESO. GANASTE!!.",20,280);
                context.fillText("Preparate para el Siguiente nivel!", 20, 320);   
                context.fillText("Comienza en: " + gameManager.winTime, 150, 380);         
                
            }else if(gameManager.status === gameManager.STATUS_GAME_OVER){
                
                context.beginPath();
                context.rect(0, 0, 640, 640);
                context.globalAlpha=0.8;
                context.fillStyle = 'black';
                context.fill();
                context.lineWidth = 7;
                context.strokeStyle = 'black';
                context.stroke();
                
                context.fillStyle = "yellow";    
                context.font = "20pt caveman";
                context.fillText("n00baso.",100,280);
                context.fillText("Ahora todo de nuevo!", 100, 320);                                           
                                               
                
            }
            
        context.restore();
    }
    
};