class Scene {

    _name = "Scene";
    _sceneObjects = [];
    _sceneManager = null;

    constructor(name, sceneObjects) { 
        this._name = name;
        this._sceneObjects = sceneObjects;
    }

    deactivate() {
        var i = 0;
        for (; i < this._sceneObjects.length; this._sceneObjects[i++].destroy());

        this._deactivationCallback();
    }

    activate() {
        var i = 0;
        for (; i < this._sceneObjects.length; this._sceneManager._gfwk.createObject(this._sceneObjects[i++]));

        this._activationCallback(this);
    }

    _activationCallback(scene) { };
    _deactivationCallback() { };
}

class ScenesManager {

    _name = "ScenesManager";
    _activeScene = undefined;
    scenes = [];

    constructor() { }

    create(name, objects) {
        const scene = new Scene(name, objects);
        
        scene._activationCallback = this._onSceneActivated.bind(this);
        scene._deactivationCallback = this._onSceneDeactivated.bind(this);
        scene._sceneManager = this;

        this.scenes[name] = scene;
    }

    _onSceneActivated(scene) { this._activeScene = scene; }

    _onSceneDeactivated() { this._activeScene = undefined; }
}

export { Scene, ScenesManager };