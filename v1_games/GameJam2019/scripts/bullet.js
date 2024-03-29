var bullet = {
    onInit: function(params) {
        this.x = params.x;
        this.y = params.y;
        this.targetX = params.targetX;
        this.targetY = params.targetY;
        this.speed = 3;
        this.width = 9;
        this.height = 8;

        this.radius = 4;
        this.center = { x: 2, y: 2 };

        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
    },
    onUpdate: function() {
        var self = this;

        if (this.x < 0 || this.x > width) {
            this.destroy();
        }

        if (this.y < 0 || this.y > height) {
            this.destroy();
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        if (jsGFwk.Collisions.areCollidingBy(this, {
            x: spaceship.x,
            y: spaceship.y,
            width: 18,
            height: 39
        }, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
            for (var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({ x: this.x, y: this.y });
            }

            stats.updateLive(1);
            mExplosionJuke.play();
            this.destroy();
        }

        if (aidcapsule.isRectColliding(this) && aidcapsule.isAlive) {
            for (var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({ x: this.x, y: this.y });
            }

            mExplosionJuke.play();
            aidcapsule.hit();
            this.destroy();
        }

        asteroidContainer.eachCloned(function (item, event) {
            if (jsGFwk.Collisions.areCollidingBy(self, 
                item, jsGFwk.Collisions.collidingModes.RECTANGLE)) {
                event.cancel = true;
                for (var i = 0; i < 10; i++) {
                    particlesContainer.cloneObject({ x: self.x, y: self.y });
                }
                
                item.hit();
                popJuke.play();

                dropPowerUp({ x: item.x, y: item.y });

                self.destroy();
            }
        });

        if (angryAsteroid.isRadColliding(this) && !endGame) {
            for (var i = 0; i < 10; i++) {
                particlesContainer.cloneObject({ x: this.x, y: this.y });
            }
            mExplosionJuke.play();
            angryAsteroid.hit();
            this.destroy();
        }

    },
    onDraw: function(context) {
        context.drawImage(jsGFwk.Sprites.bullet.image, this.x, this.y);
    }
};