/// <reference path="definitions.ts" />

namespace jsGFwk {
    export class Color implements IColor {
        border: number;
        red: number;
        green: number;
        blue: number;
        alpha: number;

        constructor(r?:number, g?:number, b?:number, a?:number, border?:number) {
            this.border = border || 0;
            this.red = r || 0;
            this.green = g || 0;
            this.blue = b || 0;
            this.alpha = a || 1;
        }

        fromRGB(r: number, g: number, b: number): void {
            this.fromRGBA(r, g, b, 1);
        }

        fromRGBA(r: number, g: number, b: number, a: number): void {
            this.red = r;
            this.green = g;
            this.blue = b;
            this.alpha = a;
        }

        toRGBString(): string {
            return `RGBA(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        }
    }
}