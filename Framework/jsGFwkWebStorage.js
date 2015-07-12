jsGFwk.Storage = {
	_plugInName: "Storage",
	_loaded: false,
	_isAvailable: false,
	
	//{name: "", data: obj, type: "JSON"}
	setData: function (cargo) {
		var dataToStore = null;
		
		switch (cargo.type) {
			case "JSON":
			default:
				dataToStore = JSON.stringify(cargo.data);
				break;
		}
		
		localStorage.setItem(cargo.name, dataToStore);
	},
	
	getData: function (key) {
		if (localStorage[key]) {
			return localStorage[key];
		}
		
		return null;
	},
	
	getFromJson: function (key) {
		var data = this.getData(key);
		
		if (data === null) { return null; }
		
		return JSON.parse(data);
	},
	
	onStart: function () {
		this._isAvailable = typeof(Storage) !== "undefined";		
	},
	onObjectCreated: function (newObject) {	},
	onStop: function () {},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}