var hurrySign = {
	id: "hurrySign",
	zOrder: 1,
	visible: true,
	
	deltaCount: 0,
	
	x: 700,
	y: 250,
	
	init: function () {
		this.x = 750;
		this.y = 250;
	},
	
	update: function (delta) {
		this.deltaCount += 1 / (jsGFwk._gameObjects.turtle.x - jsGFwk._gameObjects.magma.x) * 10.00;
		console.log(this.deltaCount);
        if (this.deltaCount >= 2) { this.deltaCount = 0; }
	
		if ((jsGFwk._gameObjects.turtle.x - jsGFwk._gameObjects.magma.x) < 150 ) {
			var annoyngMeter = jsGFwk._gameObjects.turtle.x - jsGFwk._gameObjects.magma.x;
            var annoyingQuotient = 1 - (annoyngMeter - 100) / 50;
            var annoyngSin = Math.sin(this.deltaCount * 1 + Math.random() * annoyingQuotient * 2);
            var annoyngCos = Math.cos(this.deltaCount * 0.8 + Math.random() * annoyingQuotient * 2);

			this.x = annoyngCos * (10 + annoyingQuotient * 10) + 750 - 300 * annoyingQuotient;
			this.y = annoyngSin * 10 + 180;
            /*if (annoyingQuotient > 0.4) {
                if (!soundStarted) {
                    g_SoundManager.alarm.play();
                }
                g_SoundManager.alarm.loop = "loop";
            } else {
                g_SoundManager.alarm.pause();
            }*/
		
		}
	},
	
	draw: function (context) { 
		context.save();
			context.drawImage(jsGFwk.Sprites.alertSign.image, this.x, this.y);
		context.restore();
	}
}