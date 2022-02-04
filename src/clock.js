class Clock {

    _name = "Clock";

    _counter = 0;
    triggerTime = 0;
    _action = { };

    constructor(process) { 
        if (process !== undefined) {
			this.setAction(process.action || this._action);
			this.triggerTime = process.triggerTime || this.triggerTime;
		}
    }

    reset() { this._counter = 0; }

    setAction(action) { this._action = action; }

    tick(delta) {
		this._counter += delta;

		if (this._counter >= this.triggerTime) {
			this._counter = 0;
			this._action();
		}
	}
}

export { Clock };