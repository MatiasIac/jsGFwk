/// <reference path="definitions.ts" />

namespace jsGFwk {
    export class Point implements IPoint {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
}