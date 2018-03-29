/// <reference path="configuration.ts" />
/// <reference path="definitions.ts" />

namespace jsGFwk {
    
    export class Engine {
        _updatables: Array<IComponent>;
        _configuration: Configuration;
        _lastTime: number = 0;

        constructor(configuration: Configuration, updatables: Array<IComponent>) {
            this._configuration = configuration;
            this._updatables = updatables;

            const self = this;

            const _r = function() {
                let currentTime = new Date().getTime(), 
                    delta = (currentTime - self._lastTime) / 1000;
            
                self._lastTime = currentTime;

                self._configuration.bufferContext.save();
                self._configuration.bufferContext.fillStyle = self._configuration.color;
                self._configuration.bufferContext.fillRect(0, 0, 
                        self._configuration.width, 
                        self._configuration.height);
                self._configuration.bufferContext.restore();

                self._updatables.forEach(x => x.process());

                self._configuration.context.drawImage(self._configuration.bufferCanvas, 0, 0);
                window.requestAnimationFrame(_r);
            };

            window.requestAnimationFrame(_r);
        }
    }
}