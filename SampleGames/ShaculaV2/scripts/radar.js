var Radar = {
    id: "radar",
    visible: false,
    radarContext: null,
    radarCanvas: null,
    innerCircle: 0,
    externalCircle: 0,
    isActive: false,
    init: function () {
        this.radarCanvas = document.getElementById('radarCanvas');
        this.radarContext = this.radarCanvas.getContext('2d');
    },
    update: function (delta) {
        if (!this.isActive) {
            this.innerCircle = GLOBAL.maxRadiusLight + Light.diffLight;
            this.externalCircle = (GLOBAL.maxRadiusLight + Light.diffLight) + 30;
        } else {
            this.innerCircle += 2.5;
            this.externalCircle += 2.5;
            this.isActive = this.innerCircle < 630;
        }
    },
    draw: function (ctx) {
        if (this.isActive) {
            this.radarContext.clearRect(0, 0, 630, 480);
            this.radarContext.drawImage(jsGFwk.ResourceManager.graphics['level' + GLOBAL.currentLevel + 'radar'].image, 0, 0);

            var gradient = this.radarContext.createRadialGradient(Light.x + 5, Light.y, this.innerCircle, 
                Light.x + 5, Light.y + 5, this.externalCircle);

            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.9, "transparent");
            gradient.addColorStop(1, "black");
            this.radarContext.fillStyle = gradient;
            this.radarContext.fillRect(0, 0, 640, 480);

            this.radarContext.clearRect((Light.x + 5) - this.innerCircle, 
                Light.y - this.innerCircle, 
                this.innerCircle * 2, this.innerCircle * 2);

            ctx.drawImage(this.radarCanvas, 0, 0);
        }
    }
};