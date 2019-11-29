if (isset(window.app) && isset(window.app.ui)){

    // document.body.classList.add('mdc-drawer-app-content');
    window.app.first().classList.add('mdc-drawer-app-content');
    
    window.app.ui.var('drawer', insertBeforeElement(window.app.first(), `
    <aside class="mdc-drawer">
    `));

    window.app.ui.drawer.options.import({
        "title": 'Menu',
        "subtitle": 'Principal',
        "icon": 'menu_open',
    });

    // window.app.ui.drawer.first().classList.add("mdc-top-app-bar--fixed-adjust");

    window.app.ui.drawer.first().classList.add("mdc-drawer--modal");
    
    // window.app.ui.drawer.first().classList.add("mdc-drawer--dismissible");
    
    window.app.ui.drawer.var('scrim', insertAfterElement(window.app.ui.drawer.first(), `
    <div class="mdc-drawer-scrim">
    `));
    
    window.app.ui.drawer.var('header', insertInToElement(window.app.ui.drawer.first(), `
    <div class="mdc-drawer__header">
    `));
    
    window.app.ui.drawer.header.var('title', insertInToElement(window.app.ui.drawer.header.first(), `
    <h3 class="mdc-drawer__title">
    `));

    window.app.ui.drawer.header.title.update = (title, f) => {
        
        if(empty(title)){
            var title = window.app.ui.drawer.options.last('title');
        }

        if (is_object(title)) {

            if(typeof title.string === 'function'){

                var title = title.string();
            }
            else if(is_element(title)){
                
                var title = title.textContent;
            }
        }

        if (is_object(title)) {

            var title = '';
        }
            
        if(window.app.ui.drawer.header.title.first().textContent != title){

            window.app.ui.drawer.header.title.first().textContent = title;
            window.app.ui.drawer.header.title.dispatch(f, 'update');
            return true;
        }

        return false;
    };
    
    window.app.ui.drawer.header.var('subtitle', insertInToElement(window.app.ui.drawer.header.first(), `
    <h6 class="mdc-drawer__subtitle">
    `));
    
    window.app.ui.drawer.header.subtitle.update = (subtitle, f) => {
        
        if(empty(subtitle)){
            var subtitle = window.app.ui.drawer.options.last('subtitle');
        }

        if (is_object(subtitle)) {

            if(typeof subtitle.string === 'function'){

                var subtitle = subtitle.string();
            }
            else if(is_element(subtitle)){
                
                var subtitle = subtitle.textContent;
            }
        }

        if (is_object(subtitle)) {

            var subtitle = '';
        }
            
        if(window.app.ui.drawer.header.subtitle.first().textContent != subtitle){

            window.app.ui.drawer.header.subtitle.first().textContent = subtitle;
            window.app.ui.drawer.header.subtitle.dispatch(f, 'update');
            return true;
        }

        return false;
    };
    
    // window.app.ui.drawer.header.var('list', insertInToElement(window.app.ui.drawer.header.first(), `
    // <nav class="mdc-list">
    // `));

        
    window.app.ui.drawer.var('content', insertInToElement(window.app.ui.drawer.first(), `
    <div class="mdc-drawer__content">
    `));

    window.app.ui.drawer.content.var('list', insertInToElement(window.app.ui.drawer.content.first(), `
    <nav class="mdc-list">
    `));

    window.app.ui.drawer.content.var('copyright', insertInToElement(window.app.ui.drawer.first(), `
    <small class="text-muted px-3 pb-3 pt-1">
    `));

    window.app.ui.drawer.add('update', () => {

        window.app.ui.drawer.header.title.update();
        window.app.ui.drawer.header.subtitle.update();
    });

    window.app.ui.add('update', (ui) => {

        window.app.ui.drawer.update();

        window.app.ui.drawer.content.copyright.first().textContent = '© '+(new Date()).getFullYear()+' '+window.app.options.last('name');
    });

    window.app.ui.drawer.add('init', () => {
    
        window.app.ui.drawer.mdc = mdc.drawer.MDCDrawer.attachTo(window.app.ui.drawer.first());
    
        if (isset(window.app.ui.navbar)){

            document.body.addEventListener('MDCDrawer:opened', () => {
                
                window.app.ui.navbar.button.update(window.app.ui.drawer.options.last('icon'));
            });
        
            document.body.addEventListener('MDCDrawer:closed', () => {
                
                window.app.ui.navbar.button.update();

                if (typeof window.app.ui.drawer.focus === 'function') {
                    window.app.ui.drawer.focus();
                    window.app.ui.drawer.destroy('focus');
                }
            });
            
            window.app.ui.navbar.button.set('click', (e) => {
                window.app.ui.drawer.mdc.open = !window.app.ui.drawer.mdc.open;
            });

            window.app.ui.navbar.first().style.zIndex = 7;
            
            window.app.ui.navbar.first().addEventListener('click', (e) => {
                window.app.ui.drawer.mdc.open = false;
            });
            
            window.app.ui.navbar.add('resize', () => {

                // window.app.ui.drawer.first().style.paddingTop = window.app.ui.navbar.options.last('height')+'px';
                window.app.ui.drawer.first().style.top = window.app.ui.navbar.options.last('height')+'px';
                window.app.ui.drawer.first().style.bottom = '0px';
                window.app.ui.drawer.first().style.height = 'auto';
            });
        }

        window.app.ui.add('event', () => {
            
            window.app.ui.drawer.mdc.open = false;
        });
    });

    window.app.ui.drawer.content.list.var('divider', insertInToElement(window.app.ui.drawer.content.list.first(), `
    <hr class="mdc-list-divider">
    `));

    // window.app.ui.drawer.content.list.var('general', insertInToElement(window.app.ui.drawer.content.list.first(), `
    // <h6 class="mdc-list-group__subheader">
    // Général
    // `));

    // window.app.ui.drawer.content.list.general.var('divider', insertInToElement(window.app.ui.drawer.content.list.first(), `
    // <hr class="mdc-list-divider">
    // `));
        
    // window.app.ui.drawer.content.list.var('autres', insertInToElement(window.app.ui.drawer.content.list.first(), `
    // <h6 class="mdc-list-group__subheader">
    // Autres
    // `));

    // window.app.ui.drawer.content.list.autres.var('divider', insertInToElement(window.app.ui.drawer.content.list.first(), `
    // <hr class="mdc-list-divider">
    // `));

    window.app.ui.add('init', () => {

        window.app.ui.drawer.init();
    });
    
    // insertBeforeElement(window.app.ui.drawer.content.list.general.divider, `
    // <a class="mdc-list-item" href="#">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
    //   <span class="mdc-list-item__text">Messages</span>
    // </a>
    // `);
    
    // // insertBeforeElement(window.app.ui.drawer.content.list.autres.divider.first(), `
    // // <a class="mdc-list-item" href="#">
    // //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">security</i>
    // //   <span class="mdc-list-item__text">Sécurité</span>
    // // </a>
    // // `);
    
    // insertBeforeElement(window.app.ui.drawer.content.list.autres.divider, `
    // <a class="mdc-list-item" href="#">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
    //   <span class="mdc-list-item__text">Parametres</span>
    // </a>
    // `);
    
    // insertInToElement(window.app.ui.drawer.content.list , `
    // <a class="mdc-list-item" href="#">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">contact_support</i>
    //   <span class="mdc-list-item__text">Contacter</span>
    // </a>
    // `);
    
    // insertInToElement(window.app.ui.drawer.content.list , `
    // <a class="mdc-list-item" href="#">
    //   <i class="material-icons mdc-list-item__graphic" aria-hidden="true">info</i>
    //   <span class="mdc-list-item__text">Informations</span>
    // </a>
    // `);

    
    window.app.ui.drawer.bind = (el, options) => {
        
        if(empty(el instanceof Options_Container)){
            
            var el = new Options_Container(el, options);
        }
        
        if(empty(options instanceof Object_Container)){

            var options = new Object_Container(options);
        }

        if(empty(options)){

            var options = el.options;
            // console.log(options);
        }

        // el.var('button', insertBeforeElement(window.app.ui.drawer.content.list.divider.first(), `
        el.var('button', convertElement(`
        <a class="mdc-list-item" href="#">
        `));

        el.button.first().addEventListener('click', (e) => {

            el.button.dispatch(e, 'click');
        });

        el.button.var('icon', insertInToElement(el.button.first(), `
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">
        `));

        el.button.icon.update = (icon, f) => {
            
            if(empty(icon)){
                var icon = options.last('icon');
            }
        
            if (is_object(icon)) {
        
                if(typeof icon.string === 'function'){
        
                var icon = icon.string();
                }
                else if(is_element(icon)){
                    
                var icon = icon.textContent;
                }
            }
        
            if (is_object(icon)) {
        
                var icon = '';
            }
                
            if(el.button.icon.first().textContent != icon){
            
                el.button.icon.first().textContent = icon;
                el.button.icon.dispatch(f, 'update');
                return true;
            }
        
            return false;
        };

        el.button.var('text', insertInToElement(el.button.first(), `
        <span class="mdc-list-item__text">
        `));

        el.button.text.update = (text, f) => {
            
            if(empty(text)){
                var text = options.last('title');
            }
        
            if (is_object(text)) {
        
                if(typeof text.string === 'function'){
        
                var text = text.string();
                }
                else if(is_element(text)){
                    
                var text = text.textContent;
                }
            }
        
            if (is_object(text)) {
        
                var text = '';
            }
                
            if(el.button.text.first().textContent != text){
            
                el.button.text.first().textContent = text;
                el.button.text.dispatch(f, 'update');
                return true;
            }
        
            return false;
        };
        
        // el.button.add('init', () => {
            
            el.button.icon.update();
            el.button.text.update();
        // });

        el.button.add('active', ()=>{
            el.button.first().setAttribute('tabindex', '0');
            el.button.first().setAttribute('aria-current', 'page');
            el.button.first().classList.add("mdc-list-item--activated");
        });

        el.button.add('desactive', ()=>{
            el.button.first().setAttribute('tabindex', '-1');
            el.button.first().removeAttribute('aria-current');
            el.button.first().classList.remove("mdc-list-item--activated");
        });
        
        el.add('active', ()=>{
            el.button.active();
        });

        el.add('desactive', ()=>{
            el.button.desactive();
        });
    };
}