var zafiroFreeCodeObject = function () {
	var self_object = this;
	
	this.properties = {
		id: "temp_" + new Date().getTime(),
		code: ""
	}
	
	this.update = function () {
		$('.objectName', self_object.settings.container).html(self_object.properties.id);
	};
	
	this.settings = { 
		container: $('.objectElementTemplate .object').clone(),
		type: 'freeCode',
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
}