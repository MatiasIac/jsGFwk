/// <reference path="definitions.ts" />

namespace jsGFwk {
    export class Sprite implements ISpriteResource {

        path: string;
        name: string;
        type: string;

        constructor() {
            this.path = "";
            this.name = "";
            this.type = "sprite";
        }

        add(name: string, path: string): void {
            this.name = name;
            this.path = path;
        }

    }
}