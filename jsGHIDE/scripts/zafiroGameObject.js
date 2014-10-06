var zafiroGameObject = function () {
	var self_object = this;
	
	this.properties = {
		id: "temp_" + new Date().getTime(),
		zOrder: 0,
		visible: true,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		rotationPoint_x: 0,
		rotationPoint_y: 0,
		angle: 0,
		code: "{\n init: function () { },\n update: function(delta) { },\n draw: function(context) { } \n}"
	}
	
	this.update = function () {
		$('.objectName', self_object.settings.container).html(self_object.properties.id);
	};
	
	this.settings = { 
		container: $('.objectElementTemplate .object').clone(),
		type: 'gameCode',
		includedOnStartUp: false
	};
	
	self_object.settings.container.attr('data-type', self_object.settings.type);
	$('.objectName', self_object.settings.container).html(self_object.properties.id);
	$('.itemIdentifier', self_object.settings.container).attr('data-type', self_object.settings.type);
	
	$('.removeObject', self_object.settings.container).on('click', function () {
		$(self_object).trigger('itemRemoveClick', self_object);
	});
	
	$('.objectName', self_object.settings.container).on('click', function () {
		$(self_object).trigger('itemClick', self_object);
	});
	
	$('.itemIdentifier', self_object.settings.container).on('click', function() {
		var value = $(this).hasClass('included');
		if (value) {
			$(this).removeClass('included');
			self_object.settings.includedOnStartUp = false;
		} else {
			$(this).addClass('included');
			self_object.settings.includedOnStartUp = true;
		}
	});
}