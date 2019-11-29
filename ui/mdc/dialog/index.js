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

    window.app.ui.dialog.make = (obj, options, f) => {
        
        if(empty(obj instanceof HTML_Container)){
            var obj = new HTML_Container(obj);
        }

        if(isset(options)){
            obj.import(options, 'options');
            // obj.set('options', options);
        }
        
        if(isset(f)){
            obj.set('callback', f);
        }

        return obj;
    };

    window.app.ui.dialog.render = (obj, options, f) => {

        if (isset(window.app.ui.dialog.mdc)){

            var obj = window.app.ui.dialog.make(obj, options, f);

            // console.log(!empty(obj.get()));
            if(!empty(obj.get())){
        
                // // console.log(!empty(window.app.ui.dialog.mdc.isOpen));
                // if (!empty(window.app.ui.dialog.mdc.isOpen)){
                //     window.app.ui.dialog.mdc.close();
                // }
        
                clearElement(window.app.ui.dialog.container.surface.title.last());
                clearElement(window.app.ui.dialog.container.surface.content.last());
                clearElement(window.app.ui.dialog.container.surface.actions.last());
                
                insertInToElement(window.app.ui.dialog.container.surface.title.last(), obj.string('title'));
                insertInToElement(window.app.ui.dialog.container.surface.content.last(), obj.get());

                obj.options.parse('actions', (d, k) => {
                    
                    insertInToElement(window.app.ui.dialog.container.surface.actions.last(), `
                    <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="${k}">
                    ${d.last()}
                    `);
                });

                obj.options.add('opened', (new Date()).getTime());
                window.app.ui.dialog.current = obj;
                window.app.ui.dialog.mdc.open();
                return obj;
            }
        }

        return null;
    };

    window.app.ui.dialog.insert = (obj, options, f) => {

        var obj = window.app.ui.dialog.make(obj, options, f);

        if(!empty(obj.get()) && !window.app.ui.dialog.get('items').has(obj)){
            window.app.ui.dialog.get('items').add(null, obj);
        }

        return obj;
    };

    window.app.ui.dialog.open = (obj, options, f) => {

        var obj = window.app.ui.dialog.insert(obj, options, f);
        
        if (!empty(window.app.ui.dialog.mdc.isOpen)){
            window.app.ui.dialog.mdc.close();
        }
        
        if(!isset(window.app.ui.dialog.is)){
            
            window.app.ui.dialog.render(window.app.ui.dialog.get('items').extract_subkey(0));
        }

        return obj;
    };

    window.app.ui.dialog.close = () => {
        
        if(isset(window.app.ui.dialog.mdc) && !empty(window.app.ui.dialog.mdc.isOpen)){

            window.app.ui.dialog.mdc.close();
            return true;
        }

        return false;
    };

    window.app.ui.dialog.add('event', () => {
        
        window.app.ui.dialog.close();
    });

    window.app.ui.add('event', () => {
        
        window.app.ui.dialog.event();
    });
    
    window.app.ui.dialog.add('init', () => {

        if(isset(window.app.ui.dialog.mdc) && typeof window.app.ui.dialog.mdc.destroy === 'function'){
            window.app.ui.dialog.mdc.destroy();
        }

        // clearElement(window.app.ui.dialog.last());

        
        window.app.ui.dialog.mdc = mdc.dialog.MDCDialog.attachTo(window.app.ui.dialog.last());

        window.app.ui.dialog.mdc.listen('MDCDialog:closed', (e) => {
            
            // console.log('MDCDialog:closed', window.app.ui.dialog.is);
            if(isset(window.app.ui.dialog.is)){
                
                // console.log(e.detail.action);
                window.app.ui.dialog.is.dispatch(e, 'callback');
                // window.app.ui.dialog.is = null;

                // console.log(isset(window.app.ui.dialog.first('items')));
                if(isset(window.app.ui.dialog.first('items'))){
                // if(!window.app.ui.dialog.get('items').empty()){
                    // window.app.ui.dialog.open();
                    window.app.ui.dialog.render(window.app.ui.dialog.get('items').extract_subkey(0));
                }
                else{
                    window.app.ui.dialog.is = null;
                }
            }
        });

        window.app.ui.dialog.mdc.listen('MDCDialog:opened', (e) => {

            // console.log('MDCDialog:opened', window.app.ui.dialog.is);
            window.app.ui.dialog.is = window.app.ui.dialog.current;

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

                window.app.ui.dialog.render({
                    '': datas.string('error'),
                    'title': 'Une erreur critique est survenue !'
                }, {
                    actions: { 
                        continue: 'Recharger la page' 
                    }
                },(e)=>{
                    console.log(e);
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