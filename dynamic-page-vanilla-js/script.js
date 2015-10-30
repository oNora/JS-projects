var clienjs ;
(function (){

	var hasEventListener = !!document.addEventListener,
		accordionItems = new Array(),
		flagsItems = new Array();

	/**
	 * Initialize main functionality for accordions, flags, drop down menu and load table
	 */
	function init() {
		setUpAccordion();
		flags();
		loadTable();
		addEventFunction( document.getElementById("drop-down"), 'click', showDropDown );
	}

	/**
	 * First setup of accordions when the page loads
	 */
	function setUpAccordion () {

		var divs = document.getElementsByTagName( 'div' );
		for ( var i = 0; i < divs.length; i++ ) {
			if ( divs[i].className == 'accordionItem' ) {
				accordionItems.push( divs[i] );
			}
		}

		for ( var i = 0; i < accordionItems.length; i++ ) {

			addEventFunction( accordionItems[i], 'click', toggleAccordion ) ;
		}

		for ( var i = 1; i < accordionItems.length; i++ ) {
			accordionItems[i].className = 'accordionItem hide';
			accordionItems[i].children[0].innerHTML = 'Click to open';
		}

	}

	/**
	 * Toggle accordion's items
	 * @param {Object} event - mouse click event
	 */
	function toggleAccordion(event) {

		var elementClass =  !!this.parentNode? this.className: event.srcElement.parentNode.className;

		for ( var i = 0; i < accordionItems.length; i++ ) {
			accordionItems[i].className = 'accordionItem hide';
			accordionItems[i].children[0].innerHTML = 'Click to open';
		}

		if ( elementClass == 'accordionItem hide' ) {

			if(this.parentNode){
				this.className = 'accordionItem';
				this.children[0].innerHTML = 'Click to close';
			}else{
				event.srcElement.parentNode.className = 'accordionItem';
				event.srcElement.parentNode.children[0].innerHTML = 'Click to close';
			}

		}
	}

	/**
	 * First setup of flags when the page loads
	 */
	function flags () {

		var flags = document.getElementsByTagName('span');

		for ( var i = 0; i < flags.length; i++ ) {

			if ( flags[i].parentNode.className == 'flags-item' ) {
				flagsItems.push( flags[i] );
			}
		}

		for ( var i = 0; i < flagsItems.length; i++ ) {
			addEventFunction( flagsItems[i], 'click', selectFlag ) ;
		}

	}

	/**
	 * Toggle flags items
	 * @param {Object} evt - mouse click event
	 */
	function selectFlag (evt) {

		var elementClass =  !!this.parentNode? this.parentNode.className: event.srcElement.parentNode.className;

		for ( var i = 0; i < flagsItems.length; i++ ) {
			flagsItems[i].parentNode.className = 'flags-item';
		}

		if ( elementClass == 'flags-item' ) {

			if(this.parentNode){
				this.parentNode.className = 'flags-item selected';
			}else{
				evt.srcElement.parentNode.className = 'flags-item selected';
			}
		}

	}


	/**
	 * Show dropdown - main menu
	 */
	function showDropDown() {
		var ul = document.getElementById("drop-down");
		var chekClassName = ul.className;

		if(chekClassName == 'drop-down select'){
			ul.className ='drop-down';
		}else{
			ul.className ='drop-down select';
		}
	}

	 /**
	  * Assign events
	  * @param {Object}   element   DOM element
	  * @param {String}   eventName type of event
	  * @param {Function} callback  function for the current element
	  */
	function addEventFunction( element, eventName, callback ) {
		if( hasEventListener ) {
			element.addEventListener(eventName, callback, false );
		} else {
			element.attachEvent( 'on' + eventName, callback);
		}
	};


	/**
	 * Get the table's data and append it to the page
	 */
	function loadTable() {

		var title = content.heading,
			htmlTable = '',
			contentTable = content.table;

		htmlTable += '<table>'+
						'<tr>' +
							'<td colspan="4" rowspan="" headers="" class="title"> <div>' + title + '</div> </td>' +
						'</tr>'+
						'<tr class="table-header">' +
							'<td colspan="" rowspan="" headers=""> <div> ID  </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div> First Name </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div> Last Name </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div> Occupation </div> </td>' +
						'</tr>';

		for (var i = 0 ; i < contentTable.length; i++) {
			htmlTable += '<tr class="data-row ' + (i % 2 == 0 ? "odd": "even") + '">' +
							'<td colspan="" rowspan="" headers=""> <div>' + contentTable[i].ID + ' </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div>' + contentTable[i]['First Name'] + ' </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div>' + contentTable[i]['Last Name'] + ' </div> </td>' +
							'<td colspan="" rowspan="" headers=""> <div>' + contentTable[i]['Occupation'] + ' </div> </td>' +
						'</tr>';
		};

		htmlTable += '</table>';
		var selectTable = document.getElementById("table-content");

		selectTable.innerHTML = htmlTable;

	}

	clienjs.init = init;
})(clienjs || (clienjs = {}));

window.onload = clienjs.init;
