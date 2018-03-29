namespace jsGFwk {
    export interface IAnimatedObject {
        define(): void;
        update(): void;
        destroy(): void;
    }

    export interface IDrawableObject extends IAnimatedObject {
        draw(): void;
    }

    export interface IComponent {
        process(): void;
    }

    export interface IScene {
        add(name: string, gameObjects: Array<IAnimatedObject>): void;
        enable(name: string): void;
    }
}