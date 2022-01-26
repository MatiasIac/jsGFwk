class jsGFwk {
    _gameObjects = {};
    _includes = [];

    settings = {
        width: 640,
        height: 480,
        canvas: "canvas",
        frameRate: 1000/33,
        clearColor: "rgb(0,0,0)",
    };

    constructor() { 
        window._gfwk = this;
    }

    _destroyObject(id) {
        delete this._gameObjects[id];
    }

    createObject(object) {
        if (object.id === undefined) return;

        object.destroy = this._destroyObject.bind(this, object.id);
        
        this._gameObjects[object.id] = object;
        
        for (var i = 0; i < this._includes.length; i++) {
            if (this._includes[i].onObjectCreated !== undefined) {
                this._includes[i].onObjectCreated(this._gameObjects[object.id]);
            }
        }
        
        if (object.init !== undefined) { object.init(); }
    }

    sort() {
        let arr = [];
        
        for (let prop in this._gameObjects) {
            arr.push(this._gameObjects[prop]);
        }
    
        arr.sort((a, b) => a.zOrder - b.zOrder);
        
        for (let i = 0; i < arr.length; i++) {
            delete this._gameObjects[arr[i].id];
            this._gameObjects[arr[i].id] = arr[i];
        }
    }

    include(component) {
        for (let i = 0; i < this._includes.length; i++) {
            if (component._name === this._includes[i]._name) return;
        }

        this._includes[this._includes.length] = component;
    }

    start() {
        for (let i = 0; i < this._includes.length; i++) {
            if (this._includes[i].onStart !== undefined) {
                this._includes[i].onStart();
            }
        }
    }

    stop() {
        for (let i = 0; i < this._includes.length; i++) {
            if (this._includes[i].onStop !== undefined) {
                this._includes[i].onStop();
            }
        }
    }
}