class Container extends VisualGameObject {

	_managedObjects = {};
	_totalObjects = 0;

	constructor(name, blueprint) {
		super(name, null, null, null, null, 0, true);

		this._blueprint = blueprint;
	}

	length() {
		let count = 0;
		for (let p in this._managedObjects) {
			if (this._managedObjects.hasOwnProperty(p)) {
				count++;
			}
		}
			
		return count;
	}

	getClonedAt(index) {
		let i = 0;
		for (var p in this._managedObjects) {
			if (this._managedObjects.hasOwnProperty(p)) {
				i++;
				if (i === index) { return this._managedObjects[p]; }
			}
		}
	}

	eachCloned(func) {
		let event = { cancel: false };

		for (let p in this._managedObjects) {
			if (this._managedObjects.hasOwnProperty(p)) {
				func(this._managedObjects[p], event);
				if (event.cancel) { break; }
			}
		}
	}

	clearAll() {
		for (let o in this._managedObjects) { this._managedObjects[o].destroy(); }
		this._managedObjects = {};
		this._totalObjects = 0;
	}

	cloneObject(parameters) {
		const self = this;
		let cloned = Object.create(this._blueprint);
		
		this._totalObjects++;

		cloned._containerElementPosition = this._totalObjects;
		cloned.destroy = function() {
			delete self._managedObjects[cloned._containerElementPosition];
		};
		
		if (cloned.init != undefined) { cloned.init(parameters); }
		this._managedObjects[this._totalObjects] = cloned;
		
		return cloned;
	}

	update(delta) {
		for (let o in this._managedObjects) {
			if (this._managedObjects[o].update !== undefined) { this._managedObjects[o].update(delta); }
		}
	}

	draw(context) {
		for (let o in this._managedObjects) {
			if (this._managedObjects[o].draw !== undefined) { this._managedObjects[o].draw(context); }
		}
	}
}

class Containers {

    _name = "Container";

    constructor() { }

    static create(name, blueprint) {
		const newContainer = new Container(name, blueprint);
		return newContainer;
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = { Container, Containers };
}