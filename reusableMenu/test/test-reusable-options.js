'use strict';
describe('Options menu test', function(){
    var mockOptions = [
        { id: 1, name: 'Volume', type: 'slider', values : ['Quiet', 'Normal', 'Loud', 'Nightmare'], defaultVal : 'Nightmare'},
        { id: 2, name: 'Nameplates', type: 'checkbox', defaultVal: 'checked'},
        { id: 3, name: 'Colorpicker', type: 'colorpicker', color: '#1abc9c'},
        { id: 4, name: 'Difficulty', type: 'slider', values : ['Easy', 'Normal', 'Hard', 'Nightmare'], defaultVal : 'Easy',
            subOptions: [
                { name: 'Enemy sight radius', type: 'number', min: 10, max: 100, presets: [{ Easy: 15, Normal: 20, Hard: 50, Nightmare:80 }], id:'gmUI_sub1', defaultVal : 15 },
                { name: 'Enemy damage', type: 'number', min: 10, max: 100, presets: [{ Easy: 20, Normal: 30, Hard: 40, Nightmare: 70 }], id: 'gmUI_sub2', defaultVal : 20},
                { name: 'Enemy speed', type: 'number', min: 10, max: 100, presets: [{ Easy: 20, Normal: 30, Hard: 40, Nightmare:70 }], id: 'gmUI_sub3', defaultVal : 20}
            ]
        },
        { id: 5, name: 'Enemy running speed', type: 'select', options: ['Slow', 'Normal', 'Fast', 'Super Fast'], value: '0'}
    ];

    var mockSelectors = {
        buttonsMenu    : 'gmUI_menuOption',
        optionsWrapper : 'gmUI_form',
        saveBtn        : 'gmUI_saveButton',
        cancelBtn      : 'gmUI_cancelButton'
    };

    var optionsParams;

    beforeEach(function(){
        optionsParams = new reusableOptions(mockOptions, mockSelectors);

    });

    describe('before showing options menu', function(){

        it('form', function(){
            expect($('#' + mockSelectors.optionsWrapper)).not.to.exist;
        });

        it('first button menu should exist', function(){
            expect($('#' + mockSelectors.buttonsMenu)).to.exist;
        });

        it('showOptions should be called', function (){
            var spy = sinon.spy(optionsParams, 'showOptions');

            $('#show-options').on('click', optionsParams.showOptions.bind(this) );
            $('#show-options').trigger('click');

            sinon.assert.called(spy);
        });

    });

    describe('after showing menu with options', function(){

        beforeEach( function(){
            optionsParams.showOptions();
        });

        afterEach( function(){
            $('#' + mockSelectors.optionsWrapper).remove();
            $('.colorpicker').remove();
            optionsParams = undefined;
        });

        describe('all elements should exist after show', function(){
            it('form', function(){
                expect($('#' + mockSelectors.optionsWrapper)).to.exist;
            });

            it('first button menu should be hidden', function(){
                expect($('#' + mockSelectors.buttonsMenu)).to.be.hidden;
            });

            it('wrapper with class option should exist', function(){
                expect($('.option')).to.exist;
            });

            describe('slider should exist', function(){
                it('gmUI_slider', function(){
                    expect($('.ui-slider')).to.exist;
                });
                it('Span element with name of the value should exist', function(){
                    expect($('.gmUI_slider')).to.exist;
                });

            });

            describe('checkbox should exist', function(){
                it('checkbox', function(){
                    expect($('.switch')).to.exist;
                });
            });

            describe('colorpicer should exist', function(){
                it('gmUI_colorpicer', function(){
                    expect($('.gmUI_colorpicer')).to.exist;
                });

                it('gmUI_divColor', function(){
                    expect($('.gmUI_divColor')).to.exist;
                });
            });

            describe('input type=number should exist', function(){
                it('gmUI_number', function(){
                    expect($('.gmUI_number')).to.exist;
                });

            });

            describe('select should exist', function(){
                it('option div', function(){
                    expect($('.gmUI_select')).to.exist;
                });
            });

            describe('save and cancel button should exists', function(){
                it('save button should be exist', function(){
                    expect($('#' + mockSelectors.saveBtn)).to.exist;
                });
                it('cancel button should be exist', function(){
                    expect($('#' + mockSelectors.cancelBtn)).to.exist;
                });
            });

        });

        describe('cancel click', function(){

            it('spy cancel - removeOptions should be called' , function(){
                var spy = sinon.spy(optionsParams, 'removeOptions');
                optionsParams.showOptions();

                $('#' + mockSelectors.cancelBtn).trigger('click');

                sinon.assert.called(spy);
            });

            it('form does not exist' , function(){
                $('#' + mockSelectors.cancelBtn).trigger('click');
                expect($('#' + mockSelectors.optionsWrapper)).not.to.exist;
            });

            it('saveObj should be object', function () {
                expect(optionsParams.saveObj).to.be.an('object');
            });

        });

        describe('save click', function(){

            beforeEach(function(){
                $('#gmUI_sliderInfo1').html("Normal");
                $("[data-toggle='switch']").removeAttr('checked').bootstrapSwitch('setState', false);
                $('select#5').find('option[value="1"]').attr('selected','selected');
                $('input#gmUI_sub3').val("40");
                $('#colorSelector').children().css('background-color', '#aa1aba');
            });

            it('spy save - doSaveOptions should be called' , function(){
                var spy = sinon.spy(optionsParams, 'doSaveOptions');
                optionsParams.showOptions();

                $('#' + mockSelectors.saveBtn).trigger('click');

                sinon.assert.called(spy);
            });

            it('saveObj should be object', function () {
                $('#' + mockSelectors.saveBtn).trigger('click');
                expect(optionsParams.saveObj).to.be.an('object');
            });

            it('saveObj should NOT be empty', function () {
                $('#' + mockSelectors.saveBtn).trigger('click');
                expect(optionsParams.saveObj).not.to.be.empty;
            });

        });

    });
});

