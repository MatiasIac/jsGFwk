jsGFwk.Fonts = {
	_plugInName: "Fonts",
	_loaded: false,
	_error: {
		hasError: false,
		message: ""
	},
	_styles: {},
	_fontList: [],
	
	createFont: function(font) {
		this._fontList.push(font);
	},

	onStart: function () {
		this._styles = document.createElement('style');
		this._styles.type = "text/css";
		var head = document.getElementsByTagName('head');
		
		if (head.length == 0) {
			this._error.hasError = true;
			this._error.message = "No <head> node found in the DOM.";
			return;
		}
		
		var fonts = "";
		for (var i = 0; i < this._fontList.length; i++) {
			fonts += "@font-face { font-family: '" + this._fontList[i].name + "'; src: url('" + this._fontList[i].source + "');}\n";
		}
		
		this._styles.innerHTML = fonts;
		
		head[0].appendChild(this._styles);
	},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
};