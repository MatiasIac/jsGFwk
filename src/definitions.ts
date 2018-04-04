namespace jsGFwk {
    export interface IAnimatedObject {
        define(): void;
        update(): void;
        destroy(): void;
    }

    export interface IDrawableObject extends IAnimatedObject {
        draw(context: IContext): void;
    }

    export interface IComponent {
        process(context: IContext): void;
    }

    export interface IScene {
        add(name: string, gameObjects: Array<IAnimatedObject>): void;
        enable(name: string): void;
    }

    export interface IResource {
        path: string;
        name: string;
        type: string;
    }

    export interface ISpriteResource extends IResource {
        add(name: string, path: string): void;
    }

    export interface IAudioResource extends IResource {
        add(name: string, path: string, format: any): void;
    }

    export interface IResourceManager {
        add(sprite: Sprite): void;
    }

    export interface IColor {
        border: number;
        red: number;
        green: number;
        blue: number;
        alpha: number;
        fromRGB(r: number, g: number, b: number): void;
        fromRGBA(r: number, g: number, b: number, a: number): void;
        toRGBString(): string; 
    }

    export interface IPoint {
        x: number;
        y: number;
    }

    export interface IContext {
        clear(): void;
        line(start: IPoint, end: IPoint, color: IColor): void;
        rectangle(start: IPoint, width: number, height: number, color: IColor): void;
        sprite(name: string, position: IPoint, ): void;
    }
}