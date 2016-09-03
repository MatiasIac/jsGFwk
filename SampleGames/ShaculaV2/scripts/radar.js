var Radar = {
    id: "radar",
    visible: false,
    radarContext: null,
    radarCanvas: null,
    innerCircle: 0,
    externalCircle: 0,
    x: 0, y: 0,
    isActive: false,
    threats: [],
    trigger: function () {
        var self = this;

        GLOBAL.spikeContainer.eachCloned(function (item) { 
            self.threats.push({
                x: item.x,
                y: item.y
            }); 
        });

        GLOBAL.batContainer.eachCloned(function (item) { 
            self.threats.push({
                x: item.x,
                y: item.y
            }); 
        });

        GLOBAL.fallingWallContainer.eachCloned(function (item) { 
            self.threats.push({
                x: item.x,
                y: item.y
            }); 
        });

        GLOBAL.sawContainer.eachCloned(function (item) { 
            self.threats.push({
                x: item.x,
                y: item.y
            }); 
        });

        this.isActive = true;
    },
    init: function () {
        this.radarCanvas = document.getElementById('radarCanvas');
        this.radarContext = this.radarCanvas.getContext('2d');
        this.threats = [];
    },
    update: function (delta) {
        if (!this.isActive) {
            this.threats = [];
            this.innerCircle = GLOBAL.maxRadiusLight + Light.diffLight;
            this.externalCircle = (GLOBAL.maxRadiusLight + Light.diffLight) + 40;
        } else {
            this.innerCircle += 4.5;
            this.externalCircle += 4.5;
            this.isActive = this.innerCircle < 630;
        }
    },
    draw: function (ctx) {
        if (this.isActive) {
            this.radarContext.clearRect(0, 0, 630, 480);
            this.radarContext.drawImage(jsGFwk.ResourceManager.graphics['level' + GLOBAL.currentLevel + 'radar'].image, 0, 0);

            for (var i = 0; i < this.threats.length; i++) {
                this.radarContext.drawImage(jsGFwk.Sprites.threat.image, this.threats[i].x, this.threats[i].y);
            }

            var gradient = this.radarContext.createRadialGradient(this.x + 5, this.y, this.innerCircle, 
                this.x + 5, this.y + 5, this.externalCircle);

            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.9, "transparent");
            gradient.addColorStop(1, "black");
            this.radarContext.fillStyle = gradient;
            this.radarContext.fillRect(0, 0, 640, 480);

            this.radarContext.clearRect((this.x + 5) - this.innerCircle, 
                this.y - this.innerCircle, 
                this.innerCircle * 2, this.innerCircle * 2);

            ctx.drawImage(this.radarCanvas, 0, 0);
        }
    }
};