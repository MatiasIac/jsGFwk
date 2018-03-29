namespace jsGFwk {
    export class Configuration {
        
        _width: number = 640; 
        _height: number = 480; 
        _defaultColor: string = 'black';
        _canvasName: string = `jsgfwk-${parseInt(String(Math.random() * 100000)) + 100}-canvas`; 
        _2dCanvas: any = null;
        _2dContext: any = null;
        _bufferCanvas: any = null;
        _bufferContext: any = null;

        _setup(): void {
            this._2dCanvas = document.getElementById(this._canvasName);

            if (this._2dCanvas === null) {
                this._2dCanvas = document.createElement('canvas');
                this._2dCanvas.width = this._width;
                this._2dCanvas.height = this._height;
                this._2dCanvas.id = this._canvasName;
                document.getElementsByTagName('body')[0].appendChild(this._2dCanvas);
            }

            this._2dContext = this._2dCanvas.getContext('2d');
            this._bufferCanvas = document.createElement('canvas');
            this._bufferCanvas.width = this._2dCanvas.width;
            this._bufferCanvas.height = this._2dCanvas.height;
            this._bufferContext = this._bufferCanvas.getContext('2d');
        }

        constructor(width?: number, height?: number, color?: string, canvasId?: string) {
            this._width = width || this._width;
            this._height = height || this._height;
            this._defaultColor = color || this._defaultColor;
            this._canvasName = canvasId || this._canvasName;
            this._setup();
        }

        public get context() : any {
            return this._2dContext;
        }

        public get canvas(): any {
            return this._2dCanvas;
        }

        public get bufferContext() : any {
            return this._bufferContext;
        }

        public get bufferCanvas(): any {
            return this._bufferCanvas;
        }

        public get width(): number {
            return this._width;
        }

        public get height(): number {
            return this._height;
        }

        public get color(): string {
            return this._defaultColor;
        }
    }
}