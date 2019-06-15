var gameController = {
    id: "gameController",
    visible: true,

    enParrilla: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    potenciaFuego: 0,
    dinero: 500,
    vidas: 3,

    nombreCortes: ["bife angosto", "chorizo", "asado", "tapa de asado", "chinchulin", "matambre"],

    btnCarbon: { x: 10, y: 500, width: 50, height: 50 },
    btnCorte1: { x: 10, y: 130, width: 50, height: 50 },
    btnCorte2: { x: 10, y: 190, width: 50, height: 50 },
    btnCorte3: { x: 10, y: 250, width: 50, height: 50 },
    btnCorte4: { x: 10, y: 310, width: 50, height: 50 },
    btnCorte5: { x: 10, y: 370, width: 50, height: 50 },
    btnCorte6: { x: 10, y: 430, width: 50, height: 50 },

    reduceFuego: function() {
        this.potenciaFuego--;
    },

    quemado: function(pos) {
        this.enParrilla[pos] = -1;
        
        var x = ((pos % 4) * 146) + 110;
        var y = ((parseInt(pos / 4)) * 110) + 215;

        this.dinero -= 50;
        dineroContainer.cloneObject({x: x, y: y, dinero: "- $50"});
    },

    pedidoPerdido: function() {
        this.vidas--;

        if (this.vidas <= 0) {
            //end game
            jsGFwk.IO.mouse.unregisterClick(this.mouseUpId);
            jsGFwk.Scenes.scenes.start.enable();
        }
    },

    init: function () {
        var self = this;
        this.enParrilla = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this.dinero = 500;
        this.potenciaFuego = 0;
        this.vidas = 3;
        corteContainer.clearAll();
        carbonContainer.clearAll();
        dineroContainer.clearAll();

        this.mouseUpId = jsGFwk.IO.mouse.registerClick(function(e) {
            e.width = 1;
            e.height = 1;

            corteContainer.eachCloned(function (item, event) {
                if (jsGFwk.Collisions.areCollidingBy(item.rect, e, 0) === true) {

                    if (item.cook < 90) {
                        gaucho.decir("¡No me gusta el\nasado frio!");
                    } else {
                        if (self.enParrilla[item.pos] === pedido.tipo) {
                            pedido.cantidad--;
                            
                            if (pedido.cantidad <= 0) {
                                self.dinero += 300;
                                dineroContainer.cloneObject({x: e.x, y: e.y, dinero: "+ $300"});
                                pedido.tipo = -1;
                            } else {
                                self.dinero += 70;
                                dineroContainer.cloneObject({x: e.x, y: e.y, dinero: "+ $70"});
                            }

                            setRecord(self.dinero);
                        }

                        self.enParrilla[item.pos] = -1;
                        item.destroy();
                    }

                    event.cancel = true;
                }
            });

            if (self.dinero >= 10) {
                if (jsGFwk.Collisions.areCollidingBy(self.btnCarbon, e, 0) === true) {
                    carbonContainer.cloneObject({
                        x: parseInt(Math.random() * 550) + 75,
                        y: parseInt(Math.random() * 300) + 160
                    });
                    self.potenciaFuego += 150;
                    self.dinero -= 10;
                    dineroContainer.cloneObject({x: e.x, y: e.y, dinero: "- $10"});
                }
            }

            if (self.dinero >= 50) {
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
                            self.dinero -= 50;
                            dineroContainer.cloneObject({x: e.x, y: e.y, dinero: "+ $50"});
                            break;
                        }
                    }
                }
            }
        });
    },
    update: function(tick) {
        if (pedido.tipo === -1) {
            var tipo = parseInt(Math.random() * 6);
            var tiempo = parseInt(Math.random() * 20) + 20;
            var cantidad = parseInt(Math.random() * 5) + 1;
            pedido.setPedido(tipo, tiempo, cantidad);
            gaucho.decir("Como me gustaría comer\n" + this.nombreCortes[tipo]);
        }
    },
    draw: function(ctx) {
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[6].image, 
            this.btnCarbon.x, 
            this.btnCarbon.y, 
            this.btnCarbon.width, 
            this.btnCarbon.height);

        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[0].image, this.btnCorte1.x, this.btnCorte1.y, this.btnCorte1.width, this.btnCorte1.height);
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[1].image, this.btnCorte2.x, this.btnCorte2.y, this.btnCorte2.width, this.btnCorte2.height);
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[2].image, this.btnCorte3.x, this.btnCorte3.y, this.btnCorte3.width, this.btnCorte3.height);
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[3].image, this.btnCorte4.x, this.btnCorte4.y, this.btnCorte4.width, this.btnCorte4.height);
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[4].image, this.btnCorte5.x, this.btnCorte5.y, this.btnCorte5.width, this.btnCorte5.height);
        ctx.drawImage(jsGFwk.Sprites.botones.spriteBag[5].image, this.btnCorte6.x, this.btnCorte6.y, this.btnCorte6.width, this.btnCorte6.height);

        ctx.fillStyle = "#E0C941";
        ctx.font = "30pt arial";
        ctx.fillText('$ ' + this.dinero, 30, 80);

        for (var i = 0; i < 3; i++) {
            ctx.drawImage(jsGFwk.Sprites.vidas.spriteBag[(i < this.vidas ? 0 : 1)].image, 330 + (i * 15), 75);            
        }
    }
};