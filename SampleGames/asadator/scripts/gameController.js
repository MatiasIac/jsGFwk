var gameController = {
    id: "gameController",
    visible: true,

    pedidos: [],
    enParrilla: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    potenciaFuego: 0,
    dinero: 0,

    btnCarbon: { x: 10, y: 500, width: 50, height: 50 },
    btnCorte1: { x: 10, y: 30, width: 50, height: 50 },
    btnCorte2: { x: 10, y: 90, width: 50, height: 50 },
    btnCorte3: { x: 10, y: 150, width: 50, height: 50 },
    btnCorte4: { x: 10, y: 210, width: 50, height: 50 },
    btnCorte5: { x: 10, y: 270, width: 50, height: 50 },
    btnCorte6: { x: 10, y: 330, width: 50, height: 50 },

    reduceFuego: function() {
        this.potenciaFuego--;
    },

    init: function () {
        var self = this;
        this.pedidos = [];
        this.enParrilla = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.dinero = 0;
        this.potenciaFuego = 0;

        this.mouseUpId = jsGFwk.IO.mouse.registerClick(function(e) {
            e.width = 1;
            e.height = 1;

            corteContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(item.rect, e, 0) === true) {
                    self.enParrilla[item.pos] = -1;
                    item.destroy();
                    event.cancel = true;
                }
            });

            if (jsGFwk.Collisions.areCollidingBy(self.btnCarbon, e, 0) === true) {
                carbonContainer.cloneObject({
                    x: parseInt(Math.random() * 560) + 75,
                    y: parseInt(Math.random() * 300) + 195
                });
                self.potenciaFuego += 100;
            }

            var corte = -1;

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte1, e, 0) === true) {
                corte = 0;
            }

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte2, e, 0) === true) {
                corte = 1;
            }

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte3, e, 0) === true) {
                corte = 2;
            }

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte4, e, 0) === true) {
                corte = 3;
            }

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte5, e, 0) === true) {
                corte = 4;
            }

            if (jsGFwk.Collisions.areCollidingBy(self.btnCorte6, e, 0) === true) {
                corte = 5;
            }

            if (corte >= 0) {
                for (var i = 0; i < self.enParrilla.length; i++) {
                    var item = self.enParrilla[i];
                    
                    if (item === -1) {
                        corteContainer.cloneObject({
                            pos: i,
                            tipo: corte,
                        });
                        self.enParrilla[i] = corte;
                        break;
                    }
                }
            }
        });
    },
    update: function(tick) {

    },
    draw: function(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.btnCarbon.x, this.btnCarbon.y, this.btnCarbon.width, this.btnCarbon.height);

        ctx.fillRect(this.btnCorte1.x, this.btnCorte1.y, this.btnCorte1.width, this.btnCorte1.height);
        ctx.fillRect(this.btnCorte2.x, this.btnCorte2.y, this.btnCorte2.width, this.btnCorte2.height);
        ctx.fillRect(this.btnCorte3.x, this.btnCorte3.y, this.btnCorte3.width, this.btnCorte3.height);
        ctx.fillRect(this.btnCorte4.x, this.btnCorte4.y, this.btnCorte4.width, this.btnCorte4.height);
        ctx.fillRect(this.btnCorte5.x, this.btnCorte5.y, this.btnCorte5.width, this.btnCorte5.height);
        ctx.fillRect(this.btnCorte6.x, this.btnCorte6.y, this.btnCorte6.width, this.btnCorte6.height);
    }
};