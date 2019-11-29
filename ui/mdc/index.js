if (isset(window.app) && isset(window.app.ui)){

    addClass(document.body, 'mdc-typography');

    window.app.tools.var('mdc');

    window.app.ui.add('init', () => {

        mdc.autoInit();
    });

    window.app.ui.add('is', (el) => {

        window.app.ui.event();

        if(!empty(window.app.ui.is)){

            if (typeof window.app.ui.is.desactive === 'function') {
                window.app.ui.is.desactive();
            }
        }

        if (is_object(el) && typeof el.active === 'function') {
            el.active();
        }
    });

    window.app.tools.mdc.form_field = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-form-field');
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
    
            html.mdc = mdc.formField.MDCFormField.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.button = (options)=>{
        
        var html = window.app.tools.button(options);

        html.options.add('class', 'mdc-button');
        html.options.get('label').add('class', 'mdc-button__label');

        html.icon.setOptions('aria-hidden', true);
        // html.icon.setOptions('role', 'button');

        // html.label.options.add('class', 'mdc-button__label');
        
        html.insert(html.var('ripple', HTML(`
        <div class="mdc-button__ripple">
        `)));
        

        html.label.add('active', ()=>{
            html.icon.addClass('mdc-button__icon');
        });
        
        html.label.add('desactive', ()=>{
            html.icon.removeClass('mdc-button__icon');
        });

        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
    
            html.mdc = mdc.ripple.MDCRipple.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.text_field = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-text-field');


        html.options.get('class').set('leading', 'mdc-text-field--with-leading-icon');
        html.options.get('class').set('trailing', 'mdc-text-field--with-trailing-icon');
        
        html.options.get('leading').add('class', 'mdc-text-field__icon');
        
        html.insert(html.var('leading', window.app.tools.icon(html.options.get('leading'))));
        
        html.leading.setOptions('tabindex', 0);
        html.leading.setOptions('role', 'button');

        html.leading.set('click', ()=>{
            
            html.input.focus();
        });
        
        html.leading.add('active', () => {
            html.addClass(html.options.get('class').get('leading'));
        });
        html.leading.add('desactive', () => {
            html.removeClass(html.options.get('class').get('leading'));
        });
        

        html.options.get('input').add('class', 'mdc-text-field__input');

        html.insert(html.var('input', window.app.tools.input(html.options.get('input'))));
        html.input.setOptions('type', 'text');

		html.input.set('update', (options)=>{
            
			if(!empty(options instanceof Object_Container)){
				var options = options.last();
            }
            
            if(!isset(options)){
                var options = '';
            }

			var type = html.input.getOptions('type');
			
			if(!empty(type)){

				if(type == 'checkbox' || type == 'radio'){
                            
                    if(isset(html.mdc) && isset(html.mdc.checked)){
                        
                        html.mdc.checked = !empty(options);
                    }
                    else{

                        html.input.first().checked = !empty(options);
                    }
				}
				else{
                            
                    if(isset(html.mdc) && isset(html.mdc.value)){

                        html.mdc.value = options;
                    }
                    else{

                        html.input.first().value = options;
                    }
				}
			}
		});
        
        Object.defineProperty(html, "value", { 
            get: function () {

                return html.input.value;
            },
            set: function (val) {
                
                html.input.value = val;
            }
        });

        html.focus = html.input.focus;

        html.options.get('label').add('class', 'mdc-floating-label');
        
        html.insert(html.var('label', window.app.tools.label(html.options.get('label'))));


        html.options.get('trailing').add('class', 'mdc-text-field__icon');
        
        html.insert(html.var('trailing', window.app.tools.icon(html.options.get('trailing'))));

        html.trailing.setOptions('tabindex', 0);
        html.trailing.setOptions('role', 'button');

        html.trailing.set('click', ()=>{
            
            html.input.focus();
        });
        
        html.trailing.add('active', () => {
            html.addClass(html.options.get('class').get('trailing'));
        });
        html.trailing.add('desactive', () => {
            html.removeClass(html.options.get('class').get('trailing'));
        });


        html.insert(html.var('ripple', `
        <div class="mdc-line-ripple">
        `));
        
        html.add('update', (options) => {

            html.leading.update(options.get('leading'));
            html.input.update(options.get('input'));
            html.label.update(options.get('label'));
            html.trailing.update(options.get('trailing'));
        });
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
    
            html.mdc = mdc.textField.MDCTextField.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.text_field_helper = (options)=>{

        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-text-field-helper-line');
        
        html.options.get('label').add('class', 'mdc-text-field-helper-text');

		html.var('label', window.app.tools.label(html.options.get('label')));
		html.insert(html.label.set(null, '<div aria-hidden="true">'));
        
        html.add('update', (options) => {

            html.label.update(options.get('label'));
        });
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
    
            html.mdc = mdc.textField.MDCTextFieldHelperText.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.radio = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-radio');
        

        html.options.get('input').add('class', 'mdc-radio__native-control');

        html.insert(html.var('input', window.app.tools.input(html.options.get('input'))));
        html.input.setOptions('type', 'radio');

		html.input.set('update', (options)=>{
            
			if(!empty(options instanceof Object_Container)){
				var options = options.last();
            }
            
            if(!isset(options)){
                var options = '';
            }

			var type = html.input.getOptions('type');
			
			if(!empty(type)){

				if(type == 'checkbox' || type == 'radio'){
                            
                    if(isset(html.mdc) && isset(html.mdc.checked)){
                        
                        html.mdc.checked = !empty(options);
                    }
                    else{

                        html.input.first().checked = !empty(options);
                    }
				}
				else{
                            
                    if(isset(html.mdc) && isset(html.mdc.value)){

                        html.mdc.value = options;
                    }
                    else{

                        html.input.first().value = options;
                    }
				}
			}
		});
        
        Object.defineProperty(html, "value", { 
            get: function () {

                return html.input.value;
            },
            set: function (val) {
                
                html.input.value = val;
            }
        });

        html.focus = html.input.focus;
        
        html.insert(html.var('background', HTML(`
        <div class="mdc-radio__background">
        `)));
        
        html.background.insert(html.background.var('outer', `
        <div class="mdc-radio__outer-circle">
        `));
        
        html.background.insert(html.background.var('inner', `
        <div class="mdc-radio__inner-circle">
        `));

        html.insert(html.var('ripple', `
        <div class="mdc-radio__ripple">
        `));
        
        html.add('update', (options) => {

            html.input.update(options.get('input'));
        });
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.radio.MDCRadio.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.checkbox = (options, label)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-checkbox');
        

        html.options.get('input').add('class', 'mdc-radio__native-control');

        html.insert(html.var('input', window.app.tools.input(html.options.get('input'))));
        html.input.setOptions('type', 'checkbox');

		html.input.set('update', (options)=>{
            
			if(!empty(options instanceof Object_Container)){
				var options = options.last();
            }
            
            if(!isset(options)){
                var options = '';
            }

			var type = html.input.getOptions('type');
			
			if(!empty(type)){

				if(type == 'checkbox' || type == 'radio'){
                            
                    if(isset(html.mdc) && isset(html.mdc.checked)){
                        
                        html.mdc.checked = !empty(options);
                    }
                    else{

                        html.input.first().checked = !empty(options);
                    }
				}
				else{
                            
                    if(isset(html.mdc) && isset(html.mdc.value)){

                        html.mdc.value = options;
                    }
                    else{

                        html.input.first().value = options;
                    }
				}
			}
		});
        
        Object.defineProperty(html, "value", { 
            get: function () {

                return html.input.value;
            },
            set: function (val) {
                
                html.input.value = val;
            }
        });

        html.focus = html.input.focus;
        
        html.insert(html.var('background', HTML(`
        <div class="mdc-checkbox__background">
        `)));
        
        html.background.insert(html.background.var('checkmark', `
        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
              fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        `));
        
        html.background.insert(html.background.var('mixedmark', `
        <div class="mdc-checkbox__mixedmark">
        `));

        html.insert(html.var('ripple', `
        <div class="mdc-checkbox__ripple">
        `));
        
        html.add('update', (options) => {

            html.input.update(options.get('input'));
        });
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.checkbox.MDCCheckbox.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.switch = (options, label)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-switch');  
        
        
        html.insert(html.var('track', `
        <div class="mdc-switch__track">
        `));
        
        html.insert(html.var('underlay', HTML(`
        <div class="mdc-switch__thumb-underlay">
        `)));
        
        html.underlay.insert(html.underlay.var('thumb', HTML(`
        <div class="mdc-switch__thumb">
        `)));

        html.options.get('input').add('class', 'mdc-switch__native-control');

        html.underlay.thumb.insert(html.var('input', window.app.tools.input(html.options.get('input'))));
        html.input.setOptions('type', 'checkbox');
        html.input.setOptions('role', 'switch');

		html.input.set('update', (options)=>{
            
			if(!empty(options instanceof Object_Container)){
				var options = options.last();
            }
            
            if(!isset(options)){
                var options = '';
            }

			var type = html.input.getOptions('type');
			
			if(!empty(type)){

				if(type == 'checkbox' || type == 'radio'){
                            
                    if(isset(html.mdc) && isset(html.mdc.checked)){
                        
                        html.mdc.checked = !empty(options);
                    }
                    else{

                        html.input.first().checked = !empty(options);
                    }
				}
				else{
                            
                    if(isset(html.mdc) && isset(html.mdc.value)){

                        html.mdc.value = options;
                    }
                    else{

                        html.input.first().value = options;
                    }
				}
			}
		});
        
        Object.defineProperty(html, "value", { 
            get: function () {

                return html.input.value;
            },
            set: function (val) {
                
                html.input.value = val;
            }
        });
        
        html.input.add('change', (e)=>{

            html.dispatch(html.input.value, 'change');
        });

        // html.focus = html.input.focus;

        html.set('focus', () => {
            if(isset(html.mdc)){
                html.mdc.ripple_.layout();
            }
            // else{
                html.input.focus();
            // }
        });
        
        html.add('update', (options) => {

            html.input.update(options.get('input'));
        });
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.switchControl.MDCSwitch.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.list = (options)=>{
        
        var html = HTML(`
        <ul>
        `, options);

        html.options.add('class', 'mdc-list');
        // html.options.add('class', 'mdc-list--two-line');
        
        html.add('is', (el) => {

            if(!empty(html.is)){

                if (typeof html.is.deselected === 'function') {
                    html.is.deselected();
                }
            }

            if (is_object(el) && typeof el.selected === 'function') {
                el.selected();
            }
        });

        html.divider = () => {

            var divider = HTML(`
            <li role="separator" class="mdc-list-divider">
            `);
            
            divider.insertTo(html);

            return divider;
        };

        html.item = (text) => {

            var item = HTML(`
            <li class="mdc-list-item">
            `);
            
            item.insertTo(html);
                        
            item.set('selected', () => {

                item.addClass('mdc-list-item--selected');
                item.setOptions('aria-selected', true);
            });

            item.set('deselected', () => {

                item.removeClass('mdc-list-item--selected');
                item.removeOptions('aria-selected');
            });
                        
            item.set('enable', () => {

                item.removeClass('mdc-list-item--disabled');
                item.removeOptions('aria-disabled');
            });

            item.set('disable', () => {

                item.addClass('mdc-list-item--disabled');
                item.setOptions('aria-disabled', true);
            });
            
            
            item.link('graphic', HTML(`
            <span class="mdc-list-item__graphic">
            `));

            item.graphic.attach = ()=>{
                item.graphic.insertToFirst(item);
            };
            
            item.link('text', HTML(`
            <span class="mdc-list-item__text">
            `));

            item.text.attach = ()=>{
                item.text.insertTo(item);
            };

            if(isset(text)){
                item.text.attach();
                item.text.insert(text);
            }

            html.dispatch(item, 'item');
            

            if(empty(html.is)){
                html.is = item;
            }
            
            return item;
        };
            
        html.add('init', () => {

            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.list.MDCList.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.menu = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-menu');
        html.options.add('class', 'mdc-menu-surface');

        // html.setOptions('role', 'menu');

        html.insert(html.var('list', window.app.tools.mdc.list(html.options.get('list'))));

        html.add('update', (options) => {

            html.list.update(options.get('list'));
        });

        html.add('init', () => {
            
            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.menu.MDCMenu.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.select = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-select');
        // html.options.add('class', 'mdc-select--required');
        // html.options.add('class', 'mdc-select--no-label');

        
        html.insert(html.var('anchor', HTML(`
        <div class="mdc-select__anchor">
        `)));
        
        html.anchor.insert(html.var('icon', `
        <i class="mdc-select__dropdown-icon">
        `));
        
        html.anchor.insert(html.var('text', HTML(`
        <div class="mdc-select__selected-text">
        `)));
        
        html.options.get('label').add('class', 'mdc-floating-label');

		html.var('label', window.app.tools.label(html.options.get('label')));
        html.anchor.insert(html.label.set(null, '<span>'));
        
        html.anchor.insert(html.var('ripple', `
        <div class="mdc-line-ripple">
        `));

        
        
        html.options.get('menu').add('class', 'mdc-select__menu');

		html.insert(html.var('menu', window.app.tools.menu(html.options.get('menu'))));

        html.menu.list.add('item', (item)=>{

            Object.defineProperty(item, "value", { 
                get: function () {
                     return item.getOptions('data-value');
                },
                set: function (val) {
                    // if(isset(val)){
                        item.setOptions('data-value', val);
                    // }
                    // else{
                    //     item.removeOptions('data-value', val);
                    // }
                }
            });
            
            item.add('selected', ()=>{
                html.anchor.text.first().innerHTML = item.first().innerHTML;
            });
            item.add('deselected', ()=>{
                html.anchor.text.first().innerHTML = '';
            });
        });
        

        
        html.add('update', (options) => {

            html.label.update(options.get('label'));
            html.menu.update(options.get('menu'));
        });
            
        html.add('init', () => {
            
            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.select.MDCSelect.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.slider = (options, label, discrete=false)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-slider');
        html.setOptions('role', 'slider');

        html.setOptions('aria-valuemin', 0);
        html.setOptions('aria-valuemax', 100);
        html.setOptions('aria-valuenow', 0);
        html.setOptions('aria-label', label);

        if(!empty(discrete)){
            html.options.add('class', 'mdc-slider--discrete');
        }

        // html.setOptions('data-step', 2);

        html.var('track_container', insertInToElement(html, `
        <div class="mdc-slider__track-container">
        `));

        html.track_container.var('track', insertInToElement(html.track_container, `
        <div class="mdc-slider__track">
        `));

        html.var('thumb_container', insertInToElement(html, `
        <div class="mdc-slider__thumb-container">
        `));

        if(!empty(discrete)){

            // html.track_container.var('display', insertInToElement(html.track_container, `
            // <div class="mdc-slider__track-marker-container">
            // `));

            html.thumb_container.var('pin', insertInToElement(html.thumb_container, `
            <div class="mdc-slider__pin">
                <span class="mdc-slider__pin-value-marker">
            `));
        }

        html.thumb_container.var('thumb', insertInToElement(html.thumb_container, `
        <svg class="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875">
        `));

        html.thumb_container.var('ring', insertInToElement(html.thumb_container, `
        <div class="mdc-slider__focus-ring">
        `));
            
        html.add('init', () => {
            
            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.slider.MDCSlider.attachTo(html.first());
        });
        
        return html;
    };

    window.app.tools.mdc.progress = (options)=>{
        
        var html = HTML(`
        <div>
        `, options);

        html.options.add('class', 'mdc-linear-progress');
        html.setOptions('role', 'progressbar');

        html.var('dots', insertInToElement(html, `
        <div class="mdc-linear-progress__buffering-dots">
        `));

        html.var('buffer', insertInToElement(html, `
        <div class="mdc-linear-progress__buffer">
        `));

        html.var('primary', insertInToElement(html, `
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        `));

        html.primary.var('inner', insertInToElement(html.primary, `
        <span class="mdc-linear-progress__bar-inner">
        `));

        html.var('secondary', insertInToElement(html, `
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        `));

        html.secondary.var('inner', insertInToElement(html.secondary, `
        <span class="mdc-linear-progress__bar-inner">
        `));

        html.add('init', () => {
            
            if(isset(html.mdc)){
                
                if (typeof html.mdc.destroy === 'function') {
    
                    html.mdc.destroy();
                }
            }
            
            html.mdc = mdc.linearProgress.MDCLinearProgress.attachTo(html.first());
        });
        
        return html;
    };
}