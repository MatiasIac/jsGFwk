var errorConsole = function () {
	var self = this;

	var settings = {
		_errorsContainer: $('.errorContainer'),
		_errorPanel: $('.errorConsole'),
		size: {
			collapsed: 25,
			expanded: 150
		},
		currentStatus: 'collapsed'
	};
	
	$('.innerTitleMenu', settings._errorPanel).on('click', function () {
		settings.currentStatus = (settings.currentStatus === 'collapsed' ? 'expanded' : 'collapsed');
		_toggleOnConfig();
	});

	function _expandConsole() {
		settings.currentStatus = 'expanded';
		_toggleOnConfig();
	}
	
	function _toggleOnConfig() {
		settings._errorPanel.css('height', settings.size[settings.currentStatus] + "px");
	}
	
	function _write(text) {
		var message = $('<div class="singleLineError">' + text + '</div>');
		settings._errorsContainer.append(message);
	};
	
	function _clear() {
		settings._errorsContainer.empty();
	};
	
	return {
		write: _write,
		clear: _clear,
		expand: _expandConsole
	};
};