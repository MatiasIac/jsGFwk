// This is a generic way to export the added modules easily.
// (I am lazy to do it manually everywere)

// It is a function than returns a setup function.
module.exports = function (exported) {

  // The setup function just copies keys of the exported module into the Framework.
  return  function (isLoaded, jsGFwk) {
    // If it's not loaded, we return.
    if (!isLoaded) return;
	  var keys = Object.keys(exported);
	  for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
			jsGFwk[key] = exported[key]; 
	  }
  };

};
