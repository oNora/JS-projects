'use strict';
(function($) {

    var repeat = function(what, num) {
        return new Array(num + 1).join(what);
    };

  //Add segments to a slider
  $.fn.addSliderSegments = function (amount) {
    return this.each(function () {
    var segmentGap = 100 / (amount - 1) + '%',
        segment = '<div class="ui-slider-segment" style="margin-left: ' + segmentGap + ';></div>';
        $(this).prepend(repeat(segment, amount - 2));
    });
  };
})(jQuery);

/**
 *
 * @param {Object} params       - Object of arrays with all parameters needed to create menu with options.
 * @param {Object} selectors    - IDs for main UI elements
 * @param {String} parentEl     - html element where the menu is appended
 * @constructor
 */
var reusableOptions = function(params, selectors){

    var $this = this;

    /**
     * Form for menu options
     * @type {String}
     */
    var menuHtml = '<form id="' + selectors.optionsWrapper + '">' +
                        '<div class="options-wrapper"></div>' +
                        '<div class="gmUI_changeOption">' +
                        '<button type="button" class="btn btn-large btn-inverse" id="' + selectors.saveBtn + '">Save</button>' +
                        '<button type="button" class="btn btn-large btn-inverse gmUI_cancelButton" id="' + selectors.cancelBtn + '">Cancel</button>' +
                        '</div>' +
                        '</form>';

    /**
     * Templates for options
     * @type {Object}
     */
    var templates ={
        'slider': Handlebars.compile('<div class="option gmUI_slider"> <div class="gmUI_wrapperSlider">' +
                                    '<label id="label_{{id}}" for="slider{{id}}" class="gmUI_sample" data-gmUi-id="{{id}}" data-gmUi-option-type="{{type}}">{{name}}:</label>' +
                                    '<div id="slider{{id}}" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" aria-disabled="false"></div>' +
                                    '<span id="gmUI_sliderInfo{{id}}" class="gmUI_slider">{{defaultVal}}</span>' +
                                    '</div></div>'),
        'checkbox':Handlebars.compile('<div class="option gmUI_checkbox">' +
                                    '<div class="gmUI_wrapperCheckbox"><label  id="label_{{id}}" class="share-label gmUI_sample" data-gmUi-id="{{id}}" data-gmUi-option-type="{{type}}">{{name}}:</label>' +
                                    '<div class="gmUI_sampleSwitch"><div><input name="checkbox{{id}} "id="checkbox{{id}}" type="checkbox" data-toggle="switch" {{defaultVal}}></div>' +
                                    '</div></div></div>'),
        'colorpicker': Handlebars.compile('<div class="option gmUI_colorpicer"><div class="gmUI_colorPicker">' +
                                        '<label id="label_{{id}}" class="gmUI_sample" data-gmUi-id="{{id}}" data-gmUi-option-type="{{type}}">{{name}}:</label>' +
                                        '<div class="gmUI_divColor {{id}}"><div id="colorSelector"><div style="background-color: {{color}}"></div></div></div>' +
                                        '</div></div>'),
        'select': Handlebars.compile('<div class="option gmUI_select"><div class="gmUI_wrapperSelect">' +
                                    '<label for="spinner" id="label_{{id}}" class="gmUI_sample" data-gmUi-id="{{id}}" data-gmUi-option-type="{{type}}">{{name}}: </label>' +
                                    '<div class="span3"><select name="herolist" value="0" class="select-block span3" id="{{id}}"></select></div>' +
                                    '</div></div>'),
        'number': Handlebars.compile('<div class="option gmUI_number"><div class="gmUI_sampleCustonOption">' +
                                    '<label id="label_{{id}}" for="{{id}}" class="gmUI_sample" data-gmUi-id="{{id}}" data-gmUi-option-type="{{type}}">{{name}}: </label>' +
                                    '<input type="number" name="{{id}}" min="{{min}}" max="{{max}}" id="{{id}}" value="{{defaultVal}}"/>' +
                                    '</div></div>')
    };

    /**
     * Check for saved options. If it has not saved option, show the initial
     * @param {Object} option    - single options object
     * @returns {Object}         - single options object
     */
    function getValue(option) {
        var current = $this.saveObj[option.id];
        return (current !== undefined)? current : option.defaultVal;
    }

    $this.saveObj = {};
    console.log('$this.saveObj', $this.saveObj);
    var setOptions = $this.saveObj;

    /**
     * constructor for creating different options
     * @type {Object}
     */
    var optionsCreater = {
        'slider':function(element, option) {
            var max = option.values.length - 1;
            var maxSegments = max + 1;
            var slider = element.children()[0].children[1];

            var value;
            if(option.currentValue === undefined){
                value = setOptions[option.id] || option.defaultVal;
            } else {
                value = option.currentValue;
                var infoEl = element.children()[0].children[2];
                $(infoEl).html(value);
            }

            var sliderPositionValue = option.values.indexOf(value);

            $(slider).slider({
                min: 0,
                max: max,
                value: sliderPositionValue,
                step: 1,
                orientation: 'horizontal',
                range: 'min',
                slide: function( event, ui ) {
                    var sliderInfoId;
                    var sliderValue;
                    if(option.subOptions){
                        var setFieldValueFunc = function setFieldValues(fieldValues) {
                            for(var subI = 0; subI < fieldValues.length; subI++){

                                if (fieldValues[subI].presets){
                                    var optionPresets = fieldValues[subI].presets[0];
                                    var fieldValueForDisplay;
                                    for( var pres in optionPresets) {
                                        if (pres == optionValue){
                                            fieldValueForDisplay = optionPresets[pres];
                                            $('#'+option.subOptions[subI].id).val(fieldValueForDisplay);
                                        }
                                    }
                                }
                            }
                        };
                        var optionValue = '';
                        sliderInfoId = '#gmUI_sliderInfo'+option.id;
                        sliderValue = ui.value;
                        $(sliderInfoId).html(option.values[sliderValue]);
                        optionValue = option.values[sliderValue];
                        setFieldValueFunc(option.subOptions);
                    }else{
                        sliderInfoId = '#gmUI_sliderInfo'+option.id;
                        sliderValue = ui.value;
                        $(sliderInfoId).html(option.values[sliderValue]);
                    }
                }
            }).addSliderSegments(maxSegments);

            return element;
        },
        'checkbox':function(element, option){
            var checkbox = element.children()[0].children[1].children[0].children[0];

            if(option.currentValue !== undefined){
                if((option.currentValue == 'on') || (option.currentValue == 'checked')){
                    $(checkbox).attr('checked','checked');
                } else {
                    $(checkbox).removeAttr('checked');
                }
            }

            $(checkbox).wrap('<div class="switch" />').parent().bootstrapSwitch();
            return element;
        },
        'colorpicker':function(element, option){
            var colorPickerId = option.id;
            var colorSelector = element.children()[0].children[1].children[0].children[0];

            var valueToUpdate = option.currentValue;

            if(option.currentValue !== undefined){
                $(colorSelector).css('background-color', valueToUpdate);
                option.color = valueToUpdate;
            }


            $(colorSelector).ColorPicker({
                color: ''+option.color+'',
                onShow: function (colpkr) {
                    $(colpkr).fadeIn(500);
                    return false;
                },
                onHide: function (colpkr) {
                    $(colpkr).fadeOut(500);
                    return false;
                },
                onChange: function (hsb, hex) {
                    $('.gmUI_divColor.'+colorPickerId+' #colorSelector div').css('backgroundColor', '#' + hex);
                }
            });
            return element;
        },
        'select':function(element, option){
            var selectEl = element.children()[0].children[1].children[0];
            for(var i=0; i<option.options.length; i++){
                $(selectEl).append('<option value="'+i+'">'+option.options[i]+'</option>');
            }

            var valueToUpdate = option.currentValue;
            if(option.currentValue !== undefined){
                $(selectEl).find('option[value="'+valueToUpdate+'"]').attr('selected','selected');
            }

            $(selectEl).selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
            return element;
        },
        'number':function(element, option){
            var selectEl = element.children()[0].children[1];
            var valueToUpdate = option.currentValue;

            if(option.currentValue !== undefined){
                $(selectEl).val(valueToUpdate);
            }
            return element;
        }
    };

    var createFunction = function (option){
        option.currentValue = getValue(option);
        var createElements = $(templates[option.type](option));
        return optionsCreater[option.type](createElements, option);
    };

    /**
     * Public function to center menu with options
     */
    $this.positionMenus = function(){
        var getElement = $('#' + selectors.optionsWrapper);
        var height;
        var width;
        if(getElement.length != 0){
            height = getElement.outerHeight();
            width = getElement.outerWidth();
            getElement.css({
                'margin-top': -( height/2 ) + 'px',
                'margin-left': -( width/2 ) + 'px'
            });
        }
    };

    /**
     * Initialisation the menu with options
     */
    function create(){

        // var w = $('#' + selectors.buttonsMenu).parent();
        $('#' + selectors.buttonsMenu).hide();
        $('#' + selectors.buttonsMenu).before(menuHtml);

        for (var i=0; i < params.length; i++) {
            var option = params[i];
            var formSelector = $('#' + selectors.optionsWrapper + ' > div:first-of-type');

            formSelector.append( createFunction(option) );
            var subOptions = option.subOptions;
            if(subOptions !== undefined){
                for(var y=0; y < subOptions.length; y++) {
                    formSelector.append( createFunction(subOptions[y]) );
                }
            }
        }

        $this.positionMenus();
    }

    /**
     * public function to show menu with options when is needed
     */
    $this.showOptions = function(){
            create();
            $('#' + selectors.optionsWrapper).on('click',  ('#' + selectors.cancelBtn), $this.removeOptions.bind(this));
            $('#' + selectors.optionsWrapper).on('click', ('#' + selectors.saveBtn), $this.doSaveOptions.bind(this));
    };

    /**
     * close menu with options
     */
     $this.removeOptions = function (){
         console.log('$this.saveObj 2', $this.saveObj);
        $('#' + selectors.optionsWrapper).remove();
        $('.colorpicker').remove();
        $('#' + selectors.buttonsMenu).show();
    }

    /**
     * Saving new options
     */
     $this.doSaveOptions= function () {

        var savedOptions = {};

        var saveOptions = {
            'slider':function(elTitle){
                var elTextValue = $('[data-gmUi-id="'+elTitle+'"]').next().next('span').text();
                savedOptions[elTitle] = elTextValue;
            },
            'checkbox':function(elTitle){
                var elTextValueArr = $('[data-gmUi-id="'+elTitle+'"]').next().find('div.switch-animate').attr('class').split(' ');
                var elTextValue;
                for(var i = 0; i < elTextValueArr.length; i++){
                    if((elTextValueArr[i] === 'switch-on') || (elTextValueArr[i] === 'switch-off')){
                        elTextValue = elTextValueArr[i].split('-')[1];
                    }
                }
                savedOptions[elTitle] = elTextValue;
            },
            'colorpicker':function(elTitle){
                    var elTextValue = $('[data-gmUi-id="'+elTitle+'"]').next().find('div#colorSelector').children().css('background-color');

                    function rgb2hex(rgb) {
                        var hexDigits = '0123456789abcdef';
                        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                        function hex(x) {
                            return isNaN(x) ? '00' : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                        }
                        return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
                    }

                    var hexed = (rgb2hex(elTextValue));
                    savedOptions[elTitle] = hexed;
            },
            'select':function(elTitle){
                var elTextValue = $('[data-gmUi-id="'+elTitle+'"]').next().find('select').val();
                savedOptions[elTitle] = elTextValue;
            },
            'number':function(elTitle){
                var elTextValue = $('[data-gmUi-id="'+elTitle+'"]').next().val();
                savedOptions[elTitle] = elTextValue;
            }
        };

        $('div.option').each(function(){
            var elDataAttr = $(this).find('label').data();
            var elTypeName = elDataAttr.gmuiOptionType;
            var elLabel = elDataAttr.gmuiId;
            saveOptions[elTypeName](elLabel);

        });

        $this.saveObj = savedOptions;
        $this.removeOptions();
    }
};