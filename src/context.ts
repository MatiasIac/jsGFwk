/// <reference path="definitions.ts" />
/// <reference path="configuration.ts" />

namespace jsGFwk {
    export class Context implements IContext {

        _configuration: Configuration;

        constructor(configuration: Configuration) {
            this._configuration = configuration;
        }

        _defineStyle(color: IColor): void {
            this._configuration._bufferContext.fillStyle = color.toRGBString();
            this._configuration._bufferContext.lineWidth = color.border;
        }

        clear(): void {
            this._configuration.bufferContext.save();
                this._configuration.bufferContext.fillStyle = this._configuration.color;
                this._configuration.bufferContext.fillRect(0, 0, 
                        this._configuration.width, 
                        this._configuration.height);
                this._configuration.bufferContext.restore();
        }

        line(start: IPoint, end: IPoint, color: IColor): void {
            throw new Error("Method not implemented.");
        }

        rectangle(start: IPoint, width: number, height: number, color: IColor): void {
            this._defineStyle(color);
            this._configuration._bufferContext.fillRect(start.x, start.y, width, height);
        }
    }
}