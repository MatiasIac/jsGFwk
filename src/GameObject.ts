/// <reference path="GameObjectHandler.ts" />

interface IGameObject {
    _parameters: any,
    name: string,
    visible: boolean,
    init() : void,
    update(delta: number) : void,
    draw(ctx: any) : void
}

namespace jsGame.Objects {
    export class AnimatedGameObject implements IGameObject {

        name: string;
        visible: boolean;
        _parameters: any;

        constructor(g: any, p: any) {
            this.name = (g.name === undefined || typeof g.name !== 'string') ? 
                <string><any>(Math.round((Math.random() * 1000) + 1000)) : g.name;

            this.visible = (g.visible === undefined || typeof g.visible !== 'boolean') ?
                false : g.visible;
            
            this.update = g.update || undefined;
            this.draw = g.draw || undefined;
            this.init = g.init || this.init;
            this._parameters = p || undefined;
        }

        update = function (delta: number) { };
        draw = function (ctx: any) { };
        init = function () { };
    }
}

namespace jsGame {
    export class GameObject {
        
        constructor() { }

        static extend = function (gameObject: any, parameters: any) : IGameObject {
            return new jsGame.Objects.AnimatedGameObject(gameObject, parameters);
        };

    }
}