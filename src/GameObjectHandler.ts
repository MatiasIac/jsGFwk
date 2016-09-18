/// <reference path="Game.ts" />
/// <reference path="GameObject.ts" />

namespace jsGame {
    export class GameObjectHandler {

        _fwk: Game;
        _activeObjects: Array<IGameObject> = [];
        _objectsToAdd: Array<IGameObject> = [];
        _objectsToRemove: Array<IGameObject> = [];

        constructor(fwk: Game) {
            this._fwk = fwk;
        }

        add = function (gameObject: IGameObject) {
            this._objectsToAdd.push(gameObject);
        };

        remove = function (gameObject: IGameObject) {
            this._objectsToRemove.push(gameObject);
        };

        processObjects = function () {
            //remove all marked objects
            for (var i = 0; i < this._objectsToRemove.length; i++) {
                for (var j = 0; j < this._activeObjects.length; j++) {
                    if (this._objectsToRemove[i].name === this._activeObjects.name) {
                        this._activeObjects.splice(j, 1);
                        break;
                    }
                }
            }
            this._objectsToRemove = [];

            //add all the new ones
            for (var i = 0; i < this._objectsToAdd.length; i++) {
                this._activeObjects.push(this._objectsToAdd[i]);
            }
            this._objectsToAdd = [];
        };

        getActiveObjects = function () : Array<IGameObject> {
            return this._activeObjects;
        };

    }
}