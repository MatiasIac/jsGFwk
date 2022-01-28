var bullet = {
    onInit: function (params) {
        this.x = params.x;
        this.y = params.y;
        this.width = 2;
        this.height = 2;
        this.speed = (Math.random() * 1) + 0.5;
        this.angle = params.angle;
        this.radius = 2;
    },
    onUpdate: function (delta) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        
        if ((this.x < 0 && this.x > jsGFwk.settings.width) ||
            (this.y < 0 && this.y > jsGFwk.settings.height)) {
            this.destroy();
            return;
        }
        
        if (jsGFwk.Collisions.areCollidingBy(this, witch, 
             jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            witch.hit();
            this.destroy();
        }
        
        if (jsGFwk.Collisions.areCollidingBy(this, gate, 
             jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(255,0,180,1)';
        context.fill();
        context.closePath();
    }
};