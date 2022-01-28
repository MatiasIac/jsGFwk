class WebStorage {

    _name = "WebStorage";
    _isAvailable = false;

    static STORAGE_TYPES = {
        "JSON": "JSON"
    };

    constructor() {
        this._isAvailable = typeof(Storage) !== "undefined";

        if (!this._isAvailable) {
            console.warn("Storage is not available.");
        }
    }

    setData(data, name, type) {
		let dataToStore = null;
		
		switch (type) {
			case WebStorage.STORAGE_TYPES.JSON:
			default:
				dataToStore = JSON.stringify(data);
				break;
		}
		
		localStorage.setItem(name, dataToStore);
	}
	
	getData(key) {
		if (localStorage[key]) { return localStorage[key]; }
		
		return null;
	}
	
	getJson(key) {
		var data = this.getData(key);
		
		if (data === null) { return null; }
		
		return JSON.parse(data);
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = WebStorage;
}