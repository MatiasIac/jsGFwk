/**
 * @brief "sweeten" of the framework, for a nicer usage.
 *
 * This module should always should loaded last.
 * It will convert ugly parts of the framework into a more object oriented 
 * approach.
 * Of course, plug-ins using "sweeten" should be loaded after this one,
 * they have to be manually "sweeten" with "jsGFwk.sugar(yourPlugin)"
 *
 * Of course, not all plug-ins will be able to "sweeten"
 *
 * I will try to add even more functionality after I found more things to add 
 * even more sugar.
 *
 */
jsGFwk.Sugar = {
	_plugInName: "Sugar",
	_loaded: false,
  
  onStart: function () {
    
    
    
    // aliassing jsGFwk as j, please, give a short name ALWAYS.
    if (!window.j) {
      window.j = jsGFwk;
    };
    
    var jq = ($ || jQuery || false);
    
    /**
     * Extends an object with others, same as jQuery.extend
     */
    var extend = jq ? jq.extend || function () {
      var result = {};
      for (var i = 0; i < arguments.length; ++i) {
        for (var p in arguments[i]) {
          if (!result.hasOwnProperty(p)) {
            result[p] = arguments[i][p];
          }
        }
      };
      return result;
    };
    
    // Adding a polyfill style to extend
    jsGFwk.extend = extend;
    
    /** 
     * A plug-in interface template, to avoid all the boilerplate done over 
     * and over again.
     **/
    jsGFwk.Plugin = function (name, version) {
      var _loaded = false;
      var _version = extend(version || {}, { major: 0, minor: 1, patch: 0, stability: 'dev' }); 
      
      this.onLoadReady = function () {
        jsGFwk.include(name);
        if (!_loaded) { _loaded = true; this.onStart(); }
      };
      
      this.onStart = function () { 
        var msg = "Plugin " + name + " does not implement onStart method!";
        throw new Error(msg); 
      };
      
    };
    
    var toUnderscore = function(str){
      return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    };
    
    var splitStr = function (str) {
      return toUnderscore(str).split('-');
    };
    
    function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
    
    var propName = function (str) {
      // divide de string into pieces
      arr = splitStr(str);
      // Removing the first element (wich should be a get or set)
      arr.shift();
      for (var i = 1; i < arr.length; ++i) {
        arr[i] = capitalize(arr[i]);
      }
      return arr.join('');
    };
    
    function makeNewProp(obj, name) {
      return obj[name] || {
        configurable: false,
        enumerable: true
      };
    };
    
    /** Let's make sweet all the loaded modules
     * sweeten converts all "obj.getSomething()" into "obj.something" and
     * "obj.setSomething(value)" as "obj.something = value"
     *
     */
    function sweetenAll(obj) {
      var newProps = {};
      var n, o, p;
      for (p in obj) {
        if ( obj.hasOwnProperty(p) ) { 
          if ( (typeof obj[p] == 'object') && obj[p]) {
            sugarizeAll(obj[p]);
          }
          if (p.indexOf('get') === 0) {
            n = propName(p);
            o = newProps[n] = makeNewProp(newProps, n);
            o.get = obj[p];
          };
          if (p.indexOf('set') === 0) {
            n = propName(p);
            o = newProps[n] = makeNewProp(newProps, n);
            o.set = obj[p];
          };       
        };
      };
      
      for (p in newProps) {
        if ( newProps.hasOwnProperty(p) ) { 
          Object.defineProperty(obj, p, newProps[p]);
        };
      };
      
    };
    
    sweetenAll(jsGFwk);
    
    jsGFwk.sugar = sweetenAll;
    
  },
  
  onLoadReady: function () {
		jsGFwk.include(this._plugInName);
		if (!this._loaded) { this._loaded = true; this.onStart(); }
	}
  
};