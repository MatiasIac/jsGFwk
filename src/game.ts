/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />
/// <reference path="engine.ts" />
/// <reference path="resources.ts" />
/// <reference path="scene.ts" />

namespace jsGFwk {

    export class Game {

        _configuration: Configuration;
        _sceneHandler: SceneHandler;
        _engine: Engine;
        _resources: Resources;

        constructor(configuration: Configuration) {
            this._configuration = configuration;
            this._sceneHandler = new SceneHandler();
            this._engine = new Engine(this._configuration, [this._sceneHandler]);
            this._resources = new Resources();
        }

        start(): void {
            this._engine.start();
        }

        pause(): void {
            this._engine.pause();
        }

        public get scene(): IScene {
            return this._sceneHandler;
        }

        public get resource(): IResourceManager {
            return this._resources;
        }
        
    }
}