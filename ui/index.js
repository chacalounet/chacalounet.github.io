if (isset(window.app))
{
    window.app.options.import({
        "name": 'App',
        "title": 'Application',
        // "logo": './images/logo.png',
        "bg": './images/bg.jpeg',
        "icon": './icon.png',
        "overlay": true,
        "opened": (new Date()).getTime(),
    });

    window.app.options.import({
        "server": url_format(String(document.URL)),
    });

    window.app.var('title', insertInToElementFirst(document.head, `
    <title>
    `));

    window.app.title.update = (title, f) => {

        if(empty(title)){
            var title = window.app.options.last('title');
        }

        if(empty(title)){
            var title = window.app.options.last('name');
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
            
        if(window.app.title.first().textContent !== title){
        
            window.app.title.first().textContent = title;
            window.app.title.dispatch(f, 'update');
            return true;
        }

        return false;
    };

    window.app.var('icon', insertInToElement(document.head, `
    <link rel="icon" />
    `));

    window.app.icon.update = (icon, f) => {
        
        if(empty(icon)){
            var icon = window.app.options.last('icon');
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
            
        if(window.app.icon.first().href !== icon){
            
            window.app.icon.first().href = icon;
            window.app.icon.first().setAttribute('type', file_mime(icon));
            window.app.icon.dispatch(f, 'update');
            return true;
        }

        return false;
    };

    window.app.var('bg', insertInToElement(window.app.first(), `
    <div class="absolute bg">
    `));
    
    window.app.bg.update = (image, f, format=true) => {

        if(!isset(image)){
            var image = window.app.options.last('bg');
        }

        if (is_object(image)) {

            if(typeof image.string === 'function'){

                var image = image.string();
            }
            else if(is_element(image)){
                
                var image = image.style.backgroundImage;
                var format = false;
            }
        }

        if (is_object(image)) {

            var image = '';
        }
        else if(typeof image === 'string' && format === true){

            var image = `url("${image}")`;
        }
            
        if(window.app.bg.first().style.backgroundImage !== image){

            window.app.bg.first().style.backgroundImage = image;
            window.app.bg.dispatch(f, 'update');
            return true;
        }

        return false;
    };

    window.app.var('overlay', insertInToElement(window.app.first(), `
    <div class="absolute bg bg-overlay gradient" style="
    background-image: radial-gradient(
        circle at 50% 50%, 
        rgba(var(--rgb-background), .75) 0%, 
        rgba(var(--rgb-background), .9) 100%
    );
    background-size: 10000% 100%;
    ">
    `));
    
    window.app.overlay.update = (value, f) => {

        if(!isset(value)){
            var value = window.app.options.last('overlay');
        }

        while(is_object(value) && typeof value.last === 'function'){
            
            var value = value.last();
        }
        
        if (!empty(value)) {

            var value = 1;
        }
        else{
            var value = 0;
        }
            
        if(window.app.overlay.first().style.opacity !== value){

            window.app.overlay.first().style.opacity = value;
            window.app.overlay.dispatch(f, 'update');
            return true;
        }

        return false;
    };

    window.app.var('ui', insertInToElement(window.app.first(), `
    <div class="absolute bg bg-container">
    `));
    
    addClass(window.app, 'absolute bg overflow');
    addClass(window.app.ui, 'overflow-auto d-inline-flex flex-column');

    window.app.ui.add('update', (ui) => {

        window.app.title.update(window.app.ui.options.last('title'));
        window.app.icon.update(window.app.ui.options.last('logo'));
        window.app.bg.update(window.app.ui.options.last('bg'));
        window.app.overlay.update(window.app.ui.options.last('overlay'));
    });

    window.app.add('update', () => {
        
        window.app.ui.update();
    });

    if (isset(window.app.cache)){

        window.app.cache.load('ui',  window.app.ui);

        window.app.add('loaded', () => {
        
            if (typeof window.app.cache.save === 'function') {
                
                window.app.ui.cache.save();
            }
        });
    }
    
    window.app.loader = document.querySelector('.spinner-loader');

    window.app.var('manifest', insertInToElement(document.head, `
    <link rel="manifest">
    `));

    if (isset(window.app.cache)){
        
        window.app.cache.load('manifest',  window.app.manifest);

        window.app.add('loaded', () => {
        
            if (typeof window.app.cache.save === 'function') {
                
                window.app.manifest.cache.save();
            }
        });
    }

    window.app.manifest.update = () => {

        window.app.manifest.options.set('short_name', window.app.options.get('name'));
        window.app.manifest.options.set('name', window.app.options.get('title'));
        if(isset(window.app.options.last('icon'))){

            window.app.manifest.options.var('icons', {
                // "src": window.app.options.last('icon'),
                // "src": (new URL(window.app.options.last('icon'), window.app.options.server.last('root')+'/')).href,
                "src": (new URL(window.app.options.last('icon'), window.app.options.server.last('url'))).href,
                "type": file_mime(window.app.options.last('icon')),
                "sizes": "495x495"
            });
        }

        // window.app.manifest.options.set('start_url', '/');
        if(isset(window.app.options.server.last('url'))){

            window.app.manifest.options.set('start_url', window.app.options.server.last('url'));
        }
        else{
            
            window.app.manifest.options.set('start_url', window.location.href);
        }
        window.app.manifest.options.set('theme_color', String(getComputedStyle(document.body).getPropertyValue('--mdc-theme-primary')).trim());
        window.app.manifest.options.set('background_color', String(getComputedStyle(document.body).getPropertyValue('--mdc-theme-background')).trim());
        window.app.manifest.options.set('display', 'standalone');

        window.app.manifest.options.icons.force_array = true;

        window.app.manifest.dispatch(window.app.manifest.options, 'update');
        
        window.app.manifest.first().setAttribute(
            'href', URL.createObjectURL(
                (new Blob([JSON.stringify(window.app.manifest.options.json())], {type: 'application/json'}))
                )
        );
    };

    window.app.add('update', () => {
        
        window.app.manifest.update();
    });
    
    if (isset(window.app.socket)){

        window.app.socket.add('connect', () => {

            document.body.classList.add("connecting");
        });

        window.app.socket.add('connected', () => {

            document.body.classList.remove("connecting");
            document.body.classList.add("connected");
        });

        window.app.socket.add('disconnected', () => {

            document.body.classList.remove("connecting");
            document.body.classList.remove("connected");
        });
        
        window.app.socket.add('receive', (datas) => {
            
            if(!empty(datas.get('ui'))){
                window.app.ui.update(datas.get('ui'));
            }
        });
    }

    window.app.add('init', () => {

        if (typeof window.app.ui.init === 'function') {
            window.app.ui.init();
        }
    });

    window.app.loaded = () => {
        
        if (typeof window.app.update === 'function') {

            window.app.update();
        }

        window.app.dispatch(null, 'loaded');
        
        document.body.classList.add("active");
    };

    window.app.add('resize', () => {

        if (typeof window.app.ui.resize === 'function') {
            window.app.ui.resize();
        }
    });
    
    window.app.add('scroll', () => {

        if (typeof window.app.ui.scroll === 'function') {
            window.app.ui.scroll();
        }
    });
}
