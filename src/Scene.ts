/// <reference path="definitions.ts" />

namespace jsGFwk {
    class Scene {
        _name: string;
        _objects: Array<IAnimatedObject | IDrawableObject>;

        constructor(name: string, gameObjects: Array<IAnimatedObject | IDrawableObject>) {
            this._name = name;
            this._objects = gameObjects;
        }

        public initializeObjects() : void {
            this._objects.forEach(x => x.define());
        }

        public get animatedObjects() : Array<IAnimatedObject | IDrawableObject> {
            return this._objects;
        }
        
        public get name() : string {
            return this._name;
        }
    }

    export class SceneHandler implements IScene, IComponent {
        _currentScene?: Scene;
        _scenes: Array<Scene>;

        constructor() {
            this._currentScene = undefined;
            this._scenes = new Array<Scene>();
        }

        add(name: string, gameObjects: Array<IAnimatedObject | IDrawableObject>) {
            this._scenes.push(new Scene(name, gameObjects));
        }

        enable(name: string) {
            if (this._currentScene !== undefined) {
                this._currentScene.animatedObjects.forEach(element => element.destroy());
            }

            let scene = this._scenes.filter(element => element.name === name);
            this._currentScene = scene[0];
            this._currentScene.initializeObjects();
        }

        process(): void {
            if (this._currentScene !== undefined) {
                this._currentScene.animatedObjects.forEach(element => {
                    element.update();
                });

                this._currentScene.animatedObjects.forEach(element => {
                    if ("draw" in element) {
                        element.draw();
                    }
                });
            }
        }

    }
}