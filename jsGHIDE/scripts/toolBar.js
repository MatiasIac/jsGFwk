var toolbar = function() {
	var self = this;
	var settings = {
		fileMenu: {
			container: $('.fileMenu'),
			menuItem: $('.fileMenuItem')
		},
		objectMenu: {
			container: $('.objectMenu'),
			menuItem: $('.objectMenuItem')
		},
		testMenu: {
			container: $('.testMenu'),
			menuItem: $('.testMenuItem')
		},
		menuWidth: 150
	};
	
	function hideMenuContainer() {
		settings.fileMenu.container.hide();
		settings.objectMenu.container.hide();
		//settings.testMenu.container.hide();
		
		settings.fileMenu.container.css('width', '0px');
		settings.objectMenu.container.css('width', '0px');
		//settings.testMenu.container.css('width', '0px');
		zafiro.resize();
	};
	
	function showMenu(menu) {
		if (menu.width() == settings.menuWidth) { hideMenuContainer(); return; }

		hideMenuContainer();		
		menu.css('width', settings.menuWidth + 'px');
		menu.show();
		
		zafiro.resize();
		zafiro.resize();
	}
	
	settings.fileMenu.menuItem.on('click', function() {
		if ($(this).hasClass('disabled')) {	return;	}
		showMenu(settings.fileMenu.container);
	});
	
	settings.objectMenu.menuItem.on('click', function() {
		if ($(this).hasClass('disabled')) {	return;	}
		showMenu(settings.objectMenu.container);
	});
	
	settings.testMenu.menuItem.on('click', function() {
		settings.testMenu.container.show();
	});
	
	this.onResize = function (height) {
		settings.fileMenu.container.css('height', height + 'px');
		settings.objectMenu.container.css('height', height + 'px');
	};
	
	this.getActiveMenuWidth = function() {
		return settings.fileMenu.container.width() || settings.objectMenu.container.width();
	};

};