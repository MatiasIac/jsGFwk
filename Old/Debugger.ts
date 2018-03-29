/// <reference path="GameObject.ts" />

namespace jsGame {
    export class Debugger {

        constructor() { }

        static FPS = function (x: number = 10, y: number = 10) : IGameObject {
            return jsGame.GameObject.extend({
                name: "debugger_fps",
                visible: true,
                init: function () {
                    this.bag = {
                        deltaAccumulator: 0,
                        maxFps: 0,
                        countFps: 0,
                        x: 10,
                        y: 10
                    };
                },
                update: function (delta: number) {
                    this.bag.deltaAccumulator += delta;
                    this.bag.countFps++;

                    if (this.bag.deltaAccumulator > 1) {
                        this.bag.deltaAccumulator = 0;
                        this.bag.maxFps = Math.max(this.bag.countFps, this.bag.maxFps);
                        this.bag.countFps = 0;
                    }
                },
                draw: function (ctx: any) {
                    ctx.fillStyle = 'green';
                    ctx.font = '10px Arial';
                    ctx.fillText('FPS: ' + this.bag.maxFps, this.bag.x, this.bag.y);
                }
            }, { x: x, y: y});
        };
    }
}