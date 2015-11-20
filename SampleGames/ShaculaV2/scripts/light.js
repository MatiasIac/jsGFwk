var Light = {
    id: 'light',
    visible: true,
    diffLight: 0,
    diffLightSinc: 0,
    
    init: function () {
    },
    shakeLight: function (delta) {
		this.diffLight = (Math.sin(this.diffLightSinc) * 1);
		this.diffLightSinc += 0.3;
	},
    update: function (delta) {
        this.shakeLight(delta);
    },
    draw: function (ctx) {
        var gradient = ctx.createRadialGradient(dracul.x + 10, dracul.y + 10, 1,
            dracul.x + 15, dracul.y + 15, GLOBAL.maxRadiusLight + this.diffLight);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "black");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 640, 480);
        
        dracul.drawOil(ctx);
    }
};