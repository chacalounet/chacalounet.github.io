if (isset(window.app) && isset(window.app.ui)){
    
    window.app.ui.var('snackbar', insertBeforeElement(window.app.first(), `
    <div class="mdc-snackbar">
    `));

    window.app.ui.snackbar.options.import({
        actions:{ ok: 'Ok' },
        timeout:5000
    });
    
    window.app.ui.snackbar.var('surface', insertInToElement(window.app.ui.snackbar.first(), `
    <div class="mdc-snackbar__surface">
    `));
    
    window.app.ui.snackbar.surface.var('label', insertInToElement(window.app.ui.snackbar.surface.first(), `
    <div class="mdc-snackbar__label" role="status" aria-live="polite">
    `));
    
    window.app.ui.snackbar.surface.var('actions', insertInToElement(window.app.ui.snackbar.surface.first(), `
    <div class="mdc-snackbar__actions">
    `));

    window.app.ui.snackbar.make = (obj, options, onClose, onOpen) => {
        
        if(empty(obj instanceof HTML_Container)){
            var obj = new HTML_Container(obj);
        }

        if(isset(options)){
            obj.import(options, 'options');
        }
        
        if(typeof onClose === 'function'){
            obj.set('onClose', onClose);
        }
        
        if(typeof onOpen === 'function'){
            obj.set('onOpen', onOpen);
        }

        if(empty(obj.options.last('timeout')) || !is_numeric(obj.options.last('timeout'))){
            obj.options.set('timeout', parseInt(window.app.ui.snackbar.options.last('timeout')));
        }
        
        if(obj.options.last('timeout') < 4000){
            obj.options.set('timeout', 4000);
        }
        else if(obj.options.last('timeout') > 10000){
            obj.options.set('timeout', 10000);
        }

        return obj;
    };

    window.app.ui.snackbar.render = (obj, options, onClose, onOpen) => {

        if (isset(window.app.ui.snackbar.mdc)){

            var obj = window.app.ui.snackbar.make(obj, options, onClose, onOpen);
            
            if(!empty(obj.get())){
                
                if (!empty(window.app.ui.snackbar.mdc.isOpen)){
                    window.app.ui.snackbar.mdc.close();
                }
                
                clearElement(window.app.ui.snackbar.surface.label.last());
                clearElement(window.app.ui.snackbar.surface.actions.last());
                
                insertInToElement(window.app.ui.snackbar.surface.label.last(), obj.string());

                obj.options.parse('actions', (d, k) => {
                    
                    if(is_element(d.last())){
                        
                        if(!hasClass(d.last(), 'mdc-snackbar__action')){
                            addClass(d.last(), 'mdc-snackbar__action');
                        }
                        setOptions(d.last(), 'type', 'button');
                        setOptions(d.last(), 'data-mdc-snackbar-action', k);
                        insertInToElement(window.app.ui.snackbar.surface.actions.last(), d.last());
                    }
                    else{
                    
                        insertInToElement(window.app.ui.snackbar.surface.actions.last(), `
                        <button type="button" class="mdc-button mdc-snackbar__action" data-mdc-snackbar-action="${k}">
                        ${d.last()}
                        `);
                    }
                });

                obj.options.add('opened', (new Date()).getTime());
                
                window.app.ui.snackbar.mdc.timeoutMs = obj.options.last('timeout');
                window.app.ui.snackbar.mdc.open();
                return obj;
            }
        }

        return null;
    };

    window.app.ui.snackbar.insert = (obj, options, onClose, onOpen) => {

        var obj = window.app.ui.snackbar.make(obj, options, onClose, onOpen);

        if(!empty(obj.get()) && !window.app.ui.snackbar.get('items').has(obj)){
            window.app.ui.snackbar.get('items').add(null, obj);
        }

        return obj;
    };

    window.app.ui.snackbar.open = (obj, options, onClose, onOpen) => {

        var obj = window.app.ui.snackbar.insert(obj, options, onClose, onOpen);
        
        if(!isset(window.app.ui.snackbar.is)){
            
            window.app.ui.snackbar.is = window.app.ui.snackbar.render(window.app.ui.snackbar.get('items').extract_subkey(0));
        }

        return obj;
    };

    window.app.ui.snackbar.search = (obj) => {
        
        var ret = null;

        if(window.app.ui.snackbar.get('items').has(obj)){
            return obj;
        }
        
        if(typeof obj === 'string'){

            window.app.ui.snackbar.foreach('items', (item, i, end)=>{

                if(item instanceof Object_Container){
                    
                    if(item.has(obj) || obj === item.string()){

                        ret = item;
                        end();
                    }
                }
            });
        }
        return ret;
    };

    window.app.ui.snackbar.remove = (obj) => {

        var remove = window.app.ui.snackbar.get('items').remove_values(window.app.ui.snackbar.search(obj));
        while(remove){
            remove = window.app.ui.snackbar.get('items').remove_values(window.app.ui.snackbar.search(obj));
        }
        
        if(isset(window.app.ui.snackbar.is)){
            
            if(window.app.ui.snackbar.is.has(obj) || window.app.ui.snackbar.is.string() === obj){

                window.app.ui.snackbar.close();
                remove = true;
            }
        }

        return remove;
    };

    window.app.ui.snackbar.clear = (query) => {

        window.app.ui.snackbar.foreach('items', (d, k) => {
            
            if(d.last('query') == query){
                window.app.ui.snackbar.remove_subkey(k, 'items');
            }
        });
    };

    window.app.ui.snackbar.close = (query) => {
        
        if(isset(window.app.ui.snackbar.mdc) && !empty(window.app.ui.snackbar.mdc.isOpen) && window.app.ui.snackbar.is.last('query') == query){
            
            window.app.ui.snackbar.mdc.close();
            return true;
        }

        return false;
    };

    window.app.ui.snackbar.add('event', (query) => {
        
        window.app.ui.snackbar.clear(query);
        window.app.ui.snackbar.close(query);
    });

    window.app.ui.add('event', (query) => {
        
        window.app.ui.snackbar.event(query);
    });
    
    window.app.ui.snackbar.add('init', () => {

        if(isset(window.app.ui.snackbar.mdc) && typeof window.app.ui.snackbar.mdc.destroy === 'function'){
            window.app.ui.snackbar.mdc.destroy();
        }

        window.app.ui.snackbar.mdc = mdc.snackbar.MDCSnackbar.attachTo(window.app.ui.snackbar.last());

        window.app.ui.snackbar.mdc.listen('MDCSnackbar:closed', (e) => {
            
            if(isset(window.app.ui.snackbar.is)){

                window.app.ui.snackbar.is.dispatch(e, 'onClose');
                window.app.ui.snackbar.is = null;

                if(isset(window.app.ui.snackbar.first('items'))){
                    window.app.ui.snackbar.open();
                }
            }
        });

        window.app.ui.snackbar.mdc.listen('MDCSnackbar:opened', (e) => {

            if(isset(window.app.ui.snackbar.is)){
                window.app.ui.snackbar.is.dispatch(e, 'onOpen');
            }
        });
    });
    
    window.app.ui.add('init', () => {
        window.app.ui.snackbar.init();
    });
    

    if (isset(window.app.socket)){

        window.app.socket.add('receive', (datas) => {
            if(!empty(datas.get('notifications'))){
                window.app.ui.snackbar.open(datas.get('notifications'));
            }
        });

        
        window.app.socket.add('connected', () => {
            window.app.ui.snackbar.open('Vous etes en ligne');
        });

        window.app.socket.add('disconnected', () => {
            window.app.ui.snackbar.open('Vous etes hors ligne');
        });
    }
}