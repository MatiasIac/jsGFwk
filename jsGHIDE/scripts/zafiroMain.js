var Console;
var zafiro = zafiro || {};
zafiro = (function() {

	this.resize = function () {
		var mainContainer = $('.main-container');
		var toolBar = $('.tool-bar');
		var scriptContainer = $('.scripts-container');
		var resultContainer = $('.results-container');
		var iFrame = $('#testResults-iFrame');
		var mover = $('.hMover');
		
		var width = $(window).width() - 2;
		var height = ($(window).height() - toolBar.height());
		mainContainer.css('height', height + 'px');

		var contextMenuWidth = zafiro.toolBar.getActiveMenuWidth();
		var finalWidth = (width - contextMenuWidth) - 350;
		
		scriptContainer.css('width', (finalWidth - 5) + 'px');
		scriptContainer.css('height', (height) + 'px');
		
		mover.css('height', (height)  + 'px');
		
		$('.results-container').css('width', '350px');
		$('.results-container').css('height', (height)  + 'px');
		iFrame.css('width', '350px');
		iFrame.css('height', (height - 3)  + 'px');
		
		zafiro.settings.panels.errorConsole.css('width', (finalWidth - 15) + 'px');
		
		zafiro.toolBar.onResize(height);
	};
	
	$(window).resize(function () {
		zafiro.resize();
	});

	function _init() {
		zafiro.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
			lineNumbers: true,
			styleActiveLine: true,
			matchBrackets: true,
			mode: "javascript",
			viewportMargin: 10
		});
		
		zafiro.editor.on("blur", function () {
			if (zafiro.settings.selectedObject !== null) {
				zafiro.settings.selectedObject.properties.code = zafiro.editor.doc.getValue();
				
				//$('.title-header .properties').empty();
				//$('.title-header .properties').hide();
			}
		});
		
		$('.fileTitle, .fileProperty').on('click', _fileNameClick);
		
		window.onbeforeunload = function(e) {
			return "Are you sure you want to exit from jsGHIDE?";
		};
		
		/*$('.hMover').draggable({ 
			axis: "x", 
			stop: function (e, o) {
				var scriptContainer = $('.scripts-container');
				var iFrame = $('.results-container');
				var main = $('.main-container');
				
				scriptContainer.css('width', o.offset.left + 'px');
				iFrame.css('width', ((main.width() - o.offset.left) - 5) + 'px');
				
				console.log(o.offset.left);
			}
		});*/
	}
	
	function _createNewProject() {
		zafiro.settings.panels.welcome.show();
		zafiro.settings.panels.code.hide();
		zafiro.settings.panels.fileTitle.hide();
		zafiro.settings.panels.graphicResource.hide();
	
		zafiro.project = new zafiroProject();
		$('#page-title').html(zafiro.project.projectName);
		
		var includesContainer = $(".includesList");
		includesContainer.empty();
		
		_renderIncludes(includesContainer);
	}
	
	function _renderIncludes(includesContainer) {
		var includes = zafiro.project.properties.includes;
		
		for (var i = 0; i < includes.length; i++) {
			var item = includes[i];
			
			var htmlProperty = $('<div><span><input type="checkbox" data-index="' + i + '" ' + (item.enabled ? "checked" : "") + '></span><span>' + item.name + '</span></div>');
			includesContainer.append(htmlProperty);
			
			$('input', htmlProperty).on('click', function () {
				var box = $(this);
				var index = parseInt(box.attr('data-index'));
				var value = box.is(':checked');
				zafiro.project.properties.includes[index].enabled = value;
			});
		}
	}
	
	function _newProject() {
		$(zafiro.project).unbind('newProject');
		$(zafiro.actions).bind('newProject', _createNewProject);
	}
	
	function _projectRename() {
		$(zafiro.actions).on('projectRename', function () {
			
			var result = prompt('Rename project', zafiro.project.projectName);
			if (result !== null) {
				zafiro.project.projectName = result;
				$('#page-title').html(zafiro.project.projectName);
			}			
		});
	};
	
	function _newObject() {
		$(zafiro.actions).on('newObject', function () {
			Console.clear();
			var o = zafiro.project.createGameObject();
			var scriptContainer = $('.objectList');
			scriptContainer.append(o.settings.container);
			$(o).on('itemClick', _editObject);
			$(o).on('itemRemoveClick', _removeObject);
		});
	}
	
	function _newFreeCode() {
		$(zafiro.actions).on('newFreeCode', function () {
			Console.clear();
			var o = zafiro.project.createFreeCodeObject();
			var scriptContainer = $('.objectList');
			scriptContainer.append(o.settings.container);
			$(o).on('itemClick', _editObject);
			$(o).on('itemRemoveClick', _removeObject);
		});
	}
	
	function _runProject() {
		$(zafiro.actions).on('runProject', function (e, withDebug) {
			Console.clear();
			
			var executionResult = zafiro.project.run(withDebug);
			var iframe = document.getElementById('testResults-iFrame');
			iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(executionResult);
			
			if (zafiro.project.errors.length > 0) {
				for (var i=0;i < zafiro.project.errors.length; i++) {
					Console.write("<i>Object:</i> <b>" + zafiro.project.errors[i].object.properties.id + "</b> - <i>Throws:</i> <b>" + zafiro.project.errors[i].error + "</b>");
				}
				Console.expand();
			} else {
				zafiro.settings.isRunned = true;
				zafiro.settings.wasWithDebug = withDebug;
			}
		});
	}
	
	function _projectSettings() {
		$(zafiro.actions).on('projectSettings', function () {
			zafiro.settings.panels.projectSettings.dialog({
				width: 230,
				modal: true,
				draggable: false,
				buttons: {
					"Save": function () {
						zafiro.project.properties.canvas.width = parseFloat($('.widthProject', zafiro.settings.panels.projectSettings).val());
						zafiro.project.properties.canvas.height = parseFloat($('.heightProject', zafiro.settings.panels.projectSettings).val());
						zafiro.project.properties.clearColor = $('.clearColorProject', zafiro.settings.panels.projectSettings).val();
						$(this).dialog("close");
					},
					Cancel: function () {
						$(this).dialog("close");
					}
				},
			}).css("font-size", "10pt").css('font-family','arial');
			$('.widthProject', zafiro.settings.panels.projectSettings).val(zafiro.project.properties.canvas.width);
			$('.heightProject', zafiro.settings.panels.projectSettings).val(zafiro.project.properties.canvas.height);
			$('.clearColorProject', zafiro.settings.panels.projectSettings).val(zafiro.project.properties.clearColor);
		});
	}
	
	function _projectResultsCode() {
		$(zafiro.actions).on('projectResultCode', function () {
		
			if (zafiro.settings.isRunned) {
				var executionResult = zafiro.project.run(zafiro.settings.wasWithDebug);
				zafiro.settings.panels.projectResultPopout.dialog({
					width: 500,
					height: 570,
					modal: true,
					draggable: false,
					buttons: {
						"Close": function () {
							$(this).dialog("close");
						}
					},
				}).css("font-size", "10pt").css('font-family','arial');
				var escaped = $('<div/>').text(executionResult).html();
				$('.resultCodeBox', zafiro.settings.panels.projectResultPopout).html(escaped);
				$('.resultCodeBox', zafiro.settings.panels.projectResultPopout).select();
			}
		});
	};
	
	function _projectZipCode() {
		$(zafiro.actions).on('projectZipCode', function () {
			if (zafiro.settings.isRunned) {
				var executionResult = zafiro.project.run(zafiro.settings.wasWithDebug);
				var zip = new JSZip();
				zip.file("index.html", executionResult);
				var content = zip.generate({type:"blob"});
				saveAs(content, zafiro.project.projectName + ".zip");
			}
		});
	};
	
	function _removeObject(e, o) {
		//Clear UI if it is the selected
		if (zafiro.settings.selectedObject !== null) {
			if (zafiro.settings.selectedObject.properties.id === o.properties.id) {
				zafiro.settings.selectedObject = null;
				zafiro.settings.panels.welcome.show();
				zafiro.settings.panels.code.hide();
				zafiro.settings.panels.fileTitle.hide();
				zafiro.settings.panels.graphicResource.hide();
			}
		}
		
		zafiro.project.deleteObject(o);
	}
	
	function _editObject() {
		zafiro.settings.panels.welcome.hide();
		zafiro.settings.panels.graphicResource.hide();
		zafiro.settings.panels.code.show();
		zafiro.settings.panels.fileTitle.show();
	
		if (zafiro.settings.selectedObject !== null) {
			zafiro.settings.selectedObject.properties.code = zafiro.editor.doc.getValue();
			
			$('.title-header .properties').empty();
			$('.title-header .properties').hide();
		}
	
		var o = this;
		var fileHeader = $('.fileTitle');
		fileHeader.html(o.properties.id);
		zafiro.editor.doc.setValue(o.properties.code);
		zafiro.settings.selectedObject = o;
	}
	
	function _fileNameClick() {
		if (zafiro.settings.selectedObject === null) { return; }
		
		var container = $('.title-header .properties');
		container.empty();
		
		var o = zafiro.settings.selectedObject.properties;
		
		for (var p in o) {
			if (o.hasOwnProperty(p) && p !== "code") {
				var htmlProperty = $('<div><span>' + p + ':</span><span><input type="' + (typeof o[p] === "boolean" ? 'checkbox' : 'textbox') + '"' + (typeof o[p] === "boolean" && o[p] === true ? 'checked' : '')  + ' data-property="' + p + '" id="property_' + p + '" value="' + o[p] + '"></span></div>');
				container.append(htmlProperty);

				if (typeof o[p] === "boolean") {
					$('#property_' + p).on('click', function () {
						var box = $(this);
						var propertyName = box.attr('data-property');
						var value = box.is(':checked');
						if (zafiro.settings.selectedObject !== null) {
							zafiro.settings.selectedObject.properties[propertyName] = value;
							zafiro.settings.selectedObject.update();
						}
					});				
				} else {
					$('#property_' + p).on('blur', function () {
						var box = $(this);
						var propertyName = box.attr('data-property');
						var value = box.val();
						if (zafiro.settings.selectedObject !== null) {
							zafiro.settings.selectedObject.properties[propertyName] = value;
							zafiro.settings.selectedObject.update();
							var fileHeader = $('.fileTitle');
							fileHeader.html(zafiro.settings.selectedObject.properties.id);
						}
					});
				}
			}
		}		
				
		container.show();
	}
	
	return { 
		resize: this.resize,
		functions: {
			bindNewProject: _newProject,
			bindNewObject: _newObject,
			bindNewFreeCode: _newFreeCode,
			bindRunProject: _runProject,
			bindProjectSettings: _projectSettings,
			bindProjectResults: _projectResultsCode,
			bindProjectZipResults: _projectZipCode,
			bindProjectRename: _projectRename,
			createNewProject: _createNewProject
		},
		settings: {
			selectedObject: null,
			isRunned: false,
			wasWithDebug: false,
			panels: { }
		},
		project: {},
		toolBar: {},
		actions: {},
		editor: null,
		init: _init
	};
})();

$(document).ready(function () {
	zafiro.init();
	zafiro.toolBar = new toolbar();
	zafiro.actions = new menuActions();
	
	zafiro.settings.panels = { 
		welcome: $('.welcomeContainer'),
		code: $('.codeContainer'),
		fileTitle: $('.title-header'),
		errorConsole: $('.errorConsole') ,
		graphicResource: $('.graphicResourceContainer'),
		projectSettings: $('.projectSettingsPanel').clone(),
		projectResultPopout: $('.projectResultPopout').clone()
	};
	
	zafiro.functions.createNewProject();
	zafiro.functions.bindNewProject();
	zafiro.functions.bindNewObject();
	zafiro.functions.bindNewFreeCode();
	zafiro.functions.bindProjectSettings();
	zafiro.functions.bindProjectResults();
	zafiro.functions.bindRunProject();
	zafiro.functions.bindProjectRename();
	zafiro.functions.bindProjectZipResults();	
	
	zafiro.resize();
	
	Console = new errorConsole();
});