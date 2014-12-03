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
	
	$('.popzipIcon').on('click', function () {
		$(self).trigger('projectZipCode');
	});
	
	$('.renameProject').on('click', function() {
		$(self).trigger('projectRename');
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