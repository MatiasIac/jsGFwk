/// <reference path="GameObjectHandler.ts" />

interface IGameObject {
    name: string,
    visible: boolean,
    update(delta: number) : void,
    draw(ctx: any) : void
}

namespace jsGame.Objects {
    export class AnimatedGameObject implements IGameObject {

        name: string;
        visible: boolean;

        constructor(g: any) {
            this.name = (g.name === undefined || typeof g.name !== 'string') ? 
                <string><any>(Math.round((Math.random() * 1000) + 1000)) : g.name;

            this.visible = (g.visible === undefined || typeof g.visible !== 'boolean') ?
                false : g.visible;
            
            this.update = g.update || undefined;
            this.draw = g.draw || undefined;
        }

        update = function (delta: number) { };
        draw = function (ctx: any) { };
    }
}

namespace jsGame {
    export class GameObject {

        name: string;
        visible: boolean = true;
        
        constructor() { }

        update = function (delta: string) { };

        static extend = function (gameObject: any) : IGameObject {
            return new jsGame.Objects.AnimatedGameObject(gameObject);
        };

    }
}