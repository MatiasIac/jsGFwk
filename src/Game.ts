/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
/// <reference path="engine.ts" />
/// <reference path="scene.ts" />

namespace jsGFwk {

    export class Game {

        _configuration: Configuration;
        _sceneHandler: SceneHandler;
        _engine: Engine;

        constructor(configuration: Configuration) {
            this._configuration = configuration;
            this._sceneHandler = new SceneHandler();
            this._engine = new Engine(this._configuration, [this._sceneHandler]);
        }

        start(): void {
            
        }

        pause(): void {

        }

        public get scene() : IScene {
            return this._sceneHandler;
        }
        
    }
}