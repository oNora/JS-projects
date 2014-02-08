var Toolbar = function () {

	function init() {
		$('#createButton').on('click', function () {
			createButton();
		});

		$('#createText').on('click', function () {
			createText();
		});
	}

	this.render = function () {
		var toolbarElement = '<div id="toolbar">' 
							+ '<div class="buttonDiv"><button type="button" id="createButton">Create Button</button></div>'
							+ '<div class="buttonDiv"><button type="button" id="createText">Create Text</button></div>'
							+ '</div>';

		$('.wrapper').append(toolbarElement);
		$('#toolbar').draggable({'zIndex': 5000});
		init();

		colorpicker('#3cff3c');
	}

	function createButton () {
		createButtonElement.render();
	}

	function createText () {
		createTextElement.render();
	}
}

var myTop = 40,
	myLeft = 30,
	myDivs = 0;

var createElement = function (bgColor, elementName) {
	var currentBackground = bgColor;

	this.render = function () {
		myDivs++;
		myTop += 30;
		myLeft += 50;

		if (myTop > 300) {
			myTop=100;
			myLeft=20;
		}
		var divButton = '<div class="createdDivButton" id="button' + myDivs
						+ '" data-buttonInfo="' + elementName + '" style="z-index: ' + myDivs 
						+ '; left:' + myLeft + 'px; top:' + myTop + 'px; background-color: ' + currentBackground + '">'
						+ '<a href = "#"> It\'s a ' + elementName + '</a></div>';
		$('.wrapper').append(divButton);
		$('.createdDivButton').draggable({'zIndex': 5000});
	}


	this.getBackground = function (id) {
		var elementBackgroundColor = $('#' + id).css('backgroundColor');
		var hexcolor = rgb2hex(elementBackgroundColor);
		$('#picker').spectrum('set', hexcolor);
		selectBackgroundColor(id);
	}

	this.setBackground = function (elementid) {
		var newBackgroundColor = $('.sp-input').val();
		$("#picker").spectrum("hide");
		$('#' + elementid).css('background-color', newBackgroundColor);
		currentBackground = newBackgroundColor;
	}
}

var createButtonElement = new createElement('#3cff3c', 'button');
var createTextElement = new createElement('#ffff3c', 'text');

function colorpicker (background) {
	$('#picker').spectrum({
		color: background,
		showInput: true
	});
}

function rgb2hex (rgb) {
	var hexDigits = '0123456789abcdef'
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
	}
	return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function selectBackgroundColor(elId) {
	var defineElement = $('#' + elId).data('buttoninfo');

	$('.sp-choose').off('click').on('click', function () {
		if (defineElement === 'button') {
			createButtonElement.setBackground(elId);
		} else {
			createTextElement.setBackground(elId);
		}

		$("#picker").spectrum("hide");
	});
}


$(document).ready(function () {
	var t = new Toolbar;
	t.render();
	
	$(document).on('dblclick', '.createdDivButton, .createdDivText', function () {
		$("#picker").spectrum("show");

		var clickedElementId = $(this).attr('id');
		var definElemet = $(this).data('buttoninfo');

		if (definElemet === 'button') {
			createButtonElement.getBackground(clickedElementId);
		} else {
			createTextElement.getBackground(clickedElementId);
		}
	});
	$('.sp-container').draggable();

	$('.sp-cancel').on('click', function(){
		$("#picker").spectrum("hide");
	});
});