var AdditiveTools = AdditiveTools || {};
AdditiveTools.Linq = (function() {
	
	if (Array.prototype.any === undefined) {
		Array.prototype.any = function (test) {
			var result = false;
			for (var i = 0; i < this.length; i++) {
				result = result || test(this[i]);
			}
			return result;
		}
	}

	if (Array.prototype.sum === undefined) {
		Array.prototype.sum = function (summer) {
			var result = 0;
			for (var i = 0; i < this.length; i++) {
				result += summer(this[i]);
			}
			return result;
		}
	}

	if (Array.from === undefined) {
		Array.from = function (obj) {
			var result = [];
			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					result.push(obj[i]);
				}
			}
			return result;
		}
	}

	if (Array.prototype.select === undefined) {
		Array.prototype.select = function (selector) {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(selector(this[i]));
			}
			return result;
		}
	}

	if (Array.prototype.where === undefined) {
		Array.prototype.where = function (selector) {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				if (selector(this[i])) {
					result.push(this[i]);
				}
			}
			return result;
		}
	}
	
})();