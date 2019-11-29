if (isset(window.app) && isset(window.app.ui)){

    window.app.ui.var('navbar', insertBeforeElement(window.app.first(), `
    <header class="mdc-top-app-bar">
    `));

    window.app.ui.navbar.options.import({
        "icon": 'menu',
        // "title": window.app.options.get('name'),
    });
    
    // window.app.first().classList.add('absolute');
    // window.app.first().classList.add('bg');
    // // window.app.first().classList.add('mdc-top-app-bar--fixed-adjust');
    // // window.app.ui.navbar.first().classList.add("absolute");
    
    window.app.ui.navbar.var('row', insertInToElement(window.app.ui.navbar.first(), `
    <div class="mdc-top-app-bar__row">
    `));
    
    window.app.ui.navbar.row.var('sections');
    
    window.app.ui.navbar.row.add('sections', insertInToElement(window.app.ui.navbar.row.first(), `
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
    `));

    window.app.ui.navbar.var('button', insertInToElement(window.app.ui.navbar.row.sections.last(), `
    <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
    `));

    window.app.ui.navbar.button.first().addEventListener('click', (e) => {

        window.app.ui.navbar.button.dispatch(e, 'click');
    });

    window.app.ui.navbar.button.update = (icon, f) => {

        // if(empty(icon)){
        //     var icon = window.app.ui.options.last('icon');
        // }

        if(empty(icon)){
            var icon = window.app.ui.navbar.options.last('icon');
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
            
        if(window.app.ui.navbar.button.first().textContent !== icon){
        
            window.app.ui.navbar.button.first().textContent = icon;
            window.app.ui.navbar.button.dispatch(f, 'update');
            return true;
        }

        return false;
    };

    window.app.ui.navbar.var('title', insertInToElement(window.app.ui.navbar.row.sections.last(), `
    <span class="mdc-top-app-bar__title">
    `));

    window.app.ui.navbar.title.update = (title, f) => {

        if(empty(title)){
            var title = window.app.ui.navbar.options.last('title');
        }

        if(empty(title)){
            var title = window.app.ui.options.last('name');
        }

        if(empty(title)){
            var title = window.app.options.last('name');
        }

        if(empty(title)){
            var title = window.app.options.last('title');
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
            
        if(window.app.ui.navbar.title.first().textContent !== title){

            window.app.ui.navbar.title.first().textContent = title;
            window.app.ui.navbar.title.dispatch(f, 'update');
            return true;
        }

        return false;
    };
    
    window.app.ui.navbar.row.add('sections', insertInToElement(window.app.ui.navbar.row.first(), `
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
    `));

    // window.app.ui.navbar.var('buttons');

    // window.app.ui.navbar.buttons.update = (datas, f) => {
        
    //     window.app.ui.navbar.buttons.dispatch(f, 'update');
    // };
    
    // window.app.ui.navbar.add('buttons', insertInToElementFirst(window.app.ui.navbar.row.sections.last(), `
    // <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Download">file_download</button>
    // `));
    // window.app.ui.navbar.add('buttons', insertInToElementFirst(window.app.ui.navbar.row.sections.last(), `
    // <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Print this page">print</button>
    // `));
    // window.app.ui.navbar.add('buttons', insertInToElementFirst(window.app.ui.navbar.row.sections.last(), `
    // <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Bookmark this page">bookmark</button>
    // `));
    

    window.app.ui.navbar.add('update', () => {

        window.app.ui.navbar.title.update();
        window.app.ui.navbar.button.update();
        // window.app.ui.navbar.buttons.update();
    });

    window.app.ui.add('update', (ui) => {

        window.app.ui.navbar.update();
    });

    window.app.ui.navbar.add('init', () => {

        window.app.ui.navbar.mdc = mdc.topAppBar.MDCTopAppBar.attachTo(window.app.ui.navbar.last());
    });

    window.app.ui.add('init', () => {

        window.app.ui.navbar.init();
    });
        
    window.app.ui.navbar.add('resize', () => {

        window.app.ui.navbar.options.set('height', parseInt(window.app.ui.navbar.last().offsetHeight));

        // window.app.options.set('height', parseInt(window.innerHeight));
        window.app.options.set('height', parseInt(window.app.first().offsetHeight));
        // window.app.options.set('height', (parseInt(window.innerHeight)-parseInt(window.app.ui.navbar.options.last('height'))));
        
        window.app.ui.options.set('height', (parseInt(window.innerHeight)-parseInt(window.app.ui.navbar.options.last('height'))));
        
        window.app.first().style.top = window.app.ui.navbar.options.last('height')+'px';
        // window.app.first().style.height = window.app.ui.options.last('height')+'px';
        window.app.first().style.minHeight = window.app.ui.options.last('height')+'px';
        window.app.first().style.maxHeight = window.app.ui.options.last('height')+'px';
    });

    window.app.ui.add('resize', () => {

        window.app.ui.navbar.resize();
    });
}