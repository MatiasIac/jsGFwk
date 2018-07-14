/// <reference path="definitions.ts" />

namespace jsGFwk {
    export class Resources implements IResourceManager {

        constructor() {

        }

        add(resource: IResource): void {
            throw new Error("Method not implemented.");
        }

    }

    export class AudioResource implements IAudioResource {
        
        path: string;
        name: string;
        type: string;

        constructor() {
            this.path = "";
            this.name = "";
            this.type = "";
        }
        
        add(name: string, path: string, format: AudioTypes): void {
            throw new Error("Method not implemented.");
        }

        

    }
}