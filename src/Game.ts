/// <reference path="Engine.ts" />
/// <reference path="Sprite.ts" />

namespace jsGame {
    export class Game {
        _configuration = { 
            width: 640, 
            height: 480, 
            clearColor: 'black',
            useExistingCanvas: false,
            existingCanvas: ''
        };

        _engine: Engine;

        sprite: Object;
        camera: Object;
        debugger: Object;
        storage: Object;

        constructor(width: number, height: number,
            clearColor: string, canvas: string) {
            this._configuration.width = width || 640;
            this._configuration.height = height || 480;
            this._configuration.clearColor = clearColor || 'black';
            this._configuration.useExistingCanvas = typeof canvas !== 'undefined';
            this._configuration.existingCanvas = canvas || '';

            this._engine = new Engine(this);
        }

        start = function () {
            this._engine._init();
        };
    }
}