jsGFwk.Path = {
	
	_plugInName: "Path",
	_loaded: false,
	_path: (function () {
	
		var path = function () {
			var self = this;
			self._path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			self.length = 0;
		};
		
		path.prototype.setPath = function(point1, point2, tension1, tension2) {
			var self = this;
						
			if (!tension1) { tension1 = point1; }
			if (!tension2) { tension2 = point2; }
			
			self._path.setAttribute('d', 'M' + point1.x + ',' + point1.y + 'C' + tension1.x + ',' + tension1.y + ' ' + tension2.x + ',' + tension2.y + ' ' + point2.x + ',' + point2.y);
			self.length = self._path.getTotalLength();
		};
		
		path.prototype.getPointAt = function (percent) {
			var self = this;
			var point = self._path.getPointAtLength(self.length * percent);
			var p1 = self._path.getPointAtLength(percent - 0.01);
            var p2 = self._path.getPointAtLength(percent + 0.01);
			return {
				x: point.x,
				y: point.y,
				angle: (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI)
			};
		};
		
		return path;
	}()),

	onPreRender: function (context) {},	
	onStart: function () {},
	onObjectCreated: function (newObject) {	
		if (!newObject.path) {
			newObject.path = new this._path();
		}
	},
	onStop: function () {},
	onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
}