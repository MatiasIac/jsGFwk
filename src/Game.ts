/// <reference path="Sprite.ts" />

namespace jsGame {
    export class Game {
        _configuration = { 
            width: 640, 
            height: 480, 
            clearColor: 'black'
        };

        sprite: Object;
        camera: Object;
        debugger: Object;
        storage: Object;

        constructor(width: number, height: number, clearColor: string) {
            this._configuration.width = width || 640;
            this._configuration.height = height || 480;
            this._configuration.clearColor = clearColor || 'black';

            //this.sprite = new Sprite();
        }

        static FrameworkObject = class {

        };
    }
}