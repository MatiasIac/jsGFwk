var menuActions = function() {
	var self = this;
	
	// PROJECT
	$('.newProject').on('click', function() {
		if (confirm('Are you sure you want to create a new project?')) {
			$(self).trigger('newProject');
		}
	});
	
	$('.settingsProject').on('click', function() {
		$(self).trigger('projectSettings');
	});
	
	//
	$('.popoutIcon').on('click', function () {
		$(self).trigger('projectResultCode');
	});
	
	$('.renameProject').on('click', function() {
	
	});
	
	$('.newObject').on('click', function () {
		$(self).trigger('newObject');
	});

	$('.newFreeCode').on('click', function () {
		$(self).trigger('newFreeCode');
	});
	
	// RUN
	$('.runProject').on('click', function() {
		$(self).trigger('runProject', [false]);
	});
	
	$('.runProjectWithDebugger').on('click', function() {
		$(self).trigger('runProject', [true]);
	});
};