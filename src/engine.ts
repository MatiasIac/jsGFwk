/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />

namespace jsGFwk {
    
    export class Engine {
        _updatables: Array<IComponent>;
        _configuration: Configuration;
        _lastTime: number = 0;
        _context: IContext;
        _isRunning: boolean;

        constructor(configuration: Configuration, updatables: Array<IComponent>) {
            this._isRunning = false;
            this._configuration = configuration;
            this._updatables = updatables;
            this._context = new Context(this._configuration);
        }

        _start(): void {
            const self = this;

            const _r = function() {
                // interrupt cycle
                if (self._isRunning === false) return;

                let currentTime = new Date().getTime(), 
                    delta = (currentTime - self._lastTime) / 1000;
            
                self._lastTime = currentTime;
                self._context.clear();
                self._updatables.forEach(x => x.process(self._context));
                self._configuration.context.drawImage(self._configuration.bufferCanvas, 0, 0);

                window.requestAnimationFrame(_r);
            };

            this._lastTime = new Date().getTime();
            window.requestAnimationFrame(_r);
        }

        start(): void {
            this._isRunning = true;
            this._start();
        }

        pause(): void {
            this._isRunning = false;
        }
    }
}