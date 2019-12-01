if (isset(window.app) && isset(window.app.ui)){
    
    window.app.ui.var('dialog', insertBeforeElement(window.app.first(), `
    <div class="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
    `));

    window.app.ui.dialog.options.import({
        actions:{ close: 'Fermer' }
    });
    
    window.app.ui.dialog.var('container', insertInToElement(window.app.ui.dialog.first(), `
    <div class="mdc-dialog__container">
    `));
    
    window.app.ui.dialog.var('scrim', insertInToElement(window.app.ui.dialog.first(), `
    <div class="mdc-dialog__scrim">
    `));
    
    window.app.ui.dialog.container.var('surface', insertInToElement(window.app.ui.dialog.container.first(), `
    <div class="mdc-dialog__surface">
    `));
    
    window.app.ui.dialog.container.surface.var('title', insertInToElement(window.app.ui.dialog.container.surface.first(), `
    <div class="mdc-dialog__title" id="my-dialog-title">
    `));
    
    window.app.ui.dialog.container.surface.var('content', insertInToElement(window.app.ui.dialog.container.surface.first(), `
    <div class="mdc-dialog__content" id="my-dialog-content">
    `));
    
    window.app.ui.dialog.container.surface.var('actions', insertInToElement(window.app.ui.dialog.container.surface.first(), `
    <footer class="mdc-dialog__actions">
    `));

    window.app.ui.dialog.make = (obj, options, onClose, onOpen) => {
        
        if(empty(obj instanceof HTML_Container)){
            var obj = new HTML_Container(obj);
        }

        if(isset(options)){
            obj.import(options, 'options');
            // obj.set('options', options);
        }
        
        if(typeof onClose === 'function'){
            obj.set('onClose', onClose);
        }
        
        if(typeof onOpen === 'function'){
            obj.set('onOpen', onOpen);
        }

        return obj;
    };

    window.app.ui.dialog.render = (obj, options, onClose, onOpen) => {

        if (isset(window.app.ui.dialog.mdc)){
            
            var obj = window.app.ui.dialog.make(obj, options, onClose, onOpen);

            // console.log(!empty(obj.get()));
            if(!empty(obj.get())){
                
                if (!empty(window.app.ui.dialog.mdc.isOpen)){
                    window.app.ui.dialog.mdc.close();
                }

                if(empty(obj.options.get('actions'))){
                    obj.options.import(window.app.ui.dialog.options.get('actions'), 'actions');
                }
                
                clearElement(window.app.ui.dialog.container.surface.title.last());
                clearElement(window.app.ui.dialog.container.surface.content.last());
                clearElement(window.app.ui.dialog.container.surface.actions.last());
                
                insertInToElement(window.app.ui.dialog.container.surface.title.last(), obj.string('title'));
                insertInToElement(window.app.ui.dialog.container.surface.content.last(), obj.get());

                obj.options.parse('actions', (d, k) => {
                    
                    if(is_element(d.last())){
                        
                        if(!hasClass(d.last(), 'mdc-dialog__button')){
                            addClass(d.last(), 'mdc-dialog__button');
                        }
                        setOptions(d.last(), 'type', 'button');
                        setOptions(d.last(), 'data-mdc-dialog-action', k);
                        insertInToElement(window.app.ui.dialog.container.surface.actions.last(), d.last());
                    }
                    else{
                        insertInToElement(window.app.ui.dialog.container.surface.actions.last(), `
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="${k}">
                        ${d.last()}
                        `);
                    }
                });

                obj.options.add('opened', (new Date()).getTime());
                window.app.ui.dialog.mdc.open();
                return obj;
            }
        }

        return null;
    };

    window.app.ui.dialog.insert = (obj, options, onClose, onOpen) => {

        var obj = window.app.ui.dialog.make(obj, options, onClose, onOpen);

        if(!empty(obj.get()) && !window.app.ui.dialog.get('items').has(obj)){
            window.app.ui.dialog.get('items').add(null, obj);
        }

        return obj;
    };

    window.app.ui.dialog.open = (obj, options, onClose, onOpen) => {

        var obj = window.app.ui.dialog.insert(obj, options, onClose, onOpen);
        
        if (!empty(window.app.ui.dialog.mdc.isOpen)){
            window.app.ui.dialog.mdc.close();
        }
        
        if(!isset(window.app.ui.dialog.is)){
            
            window.app.ui.dialog.is = window.app.ui.dialog.render(window.app.ui.dialog.get('items').extract_subkey(0));
        }

        return obj;
    };

    window.app.ui.dialog.search = (obj) => {
        
        var ret = null;

        if(window.app.ui.dialog.get('items').has(obj)){
            return obj;
        }
        
        if(typeof obj === 'string'){

            window.app.ui.dialog.foreach('items', (item, i, end)=>{

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

    window.app.ui.dialog.remove = (obj) => {

        var remove = window.app.ui.dialog.get('items').remove_values(window.app.ui.dialog.search(obj));
        while(remove){
            remove = window.app.ui.dialog.get('items').remove_values(window.app.ui.dialog.search(obj));
        }
        
        if(isset(window.app.ui.dialog.is)){
            
            if(window.app.ui.dialog.is.has(obj) || window.app.ui.dialog.is.string() === obj){

                window.app.ui.dialog.close();
                remove = true;
            }
        }

        return remove;
    };

    window.app.ui.dialog.clear = (query) => {

        window.app.ui.dialog.foreach('items', (d, k) => {
            
            if(d.last('query') == query){
                window.app.ui.dialog.remove_subkey(k, 'items');
            }
        });
    };

    window.app.ui.dialog.close = (query) => {
        
        if(isset(window.app.ui.dialog.mdc) && !empty(window.app.ui.dialog.mdc.isOpen) && window.app.ui.dialog.is.last('query') == query){
            
            window.app.ui.dialog.mdc.close();
            return true;
        }

        return false;
    };

    window.app.ui.dialog.add('event', (query) => {
        
        window.app.ui.dialog.clear(query);
        window.app.ui.dialog.close(query);
    });

    window.app.ui.add('event', (query) => {
        
        window.app.ui.dialog.event(query);
    });
    
    window.app.ui.dialog.add('init', () => {

        if(isset(window.app.ui.dialog.mdc) && typeof window.app.ui.dialog.mdc.destroy === 'function'){
            window.app.ui.dialog.mdc.destroy();
        }

        // clearElement(window.app.ui.dialog.last());

        
        window.app.ui.dialog.mdc = mdc.dialog.MDCDialog.attachTo(window.app.ui.dialog.last());

        window.app.ui.dialog.mdc.listen('MDCDialog:closed', (e) => {
            
            if(isset(window.app.ui.dialog.is)){

                window.app.ui.dialog.is.dispatch(e, 'onClose');
                window.app.ui.dialog.is = null;

                if(isset(window.app.ui.dialog.first('items'))){
                    window.app.ui.dialog.open();
                }
            }
        });

        window.app.ui.dialog.mdc.listen('MDCDialog:opened', (e) => {

            if(isset(window.app.ui.dialog.is)){
                window.app.ui.dialog.is.dispatch(e, 'onOpen');
            }

            window.app.tools.scrollTop({
                el: window.app.ui.dialog.container.surface.content.last(),
                duration: 350
            });
        });
    });
    
    window.app.ui.add('init', () => {
        window.app.ui.dialog.init();
    });
    

    if (isset(window.app.socket)){

        window.app.socket.add('receive', (datas) => {
            // console.log(datas);
            if (!empty(datas.get('error'))){

                document.body.classList.add("error");

                window.app.ui.dialog.open({
                    '': datas.string('error'),
                    'title': 'Une erreur critique est survenue !'
                }, {
                    actions: { 
                        continue: 'Recharger la page' 
                    }
                },(e)=>{
                    // console.log(e);
                    // console.log(window.app.ui.dialog.is);
                    // console.log(window.app.ui.dialog.current);
                    if(e.detail.action === 'continue'){

                        document.body.classList.remove("error");
                        document.body.classList.remove("active");
                        window.location.reload(true);
                    }
                    else{
                        // window.app.ui.dialog.render(window.app.ui.dialog.is);
                        // window.app.ui.dialog.open(window.app.ui.dialog.is);
                        window.app.ui.dialog.get('items').add(null, window.app.ui.dialog.is, true);
                    }
                });
                
            }
            else
            if(!empty(datas.get('dialogs'))){
                // console.log(datas.json());
                window.app.ui.dialog.render(datas.get('dialogs'));
            }
        });
    }
}