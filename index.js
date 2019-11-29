(function() {

if (isset(window.app)) {
    
    if (typeof window.app.load === 'function') {
        window.app.load();
    }

    if (typeof window.app.init === 'function') {
        window.app.init();
    }
    
    window.addEventListener("optimizedResize", function() {
        if (typeof window.app.resize === 'function') {
            window.app.resize();
        }
    });

	window.dispatchEvent(throttle("resize", "optimizedResize", window));
    
    window.addEventListener("optimizedScroll", function() {
        if (typeof window.app.scroll === 'function') {
            window.app.scroll();
        }
    });

    window.dispatchEvent(throttle("scroll", "optimizedScroll", window));
    
    if (typeof window.app.inited === 'function') {
        window.app.inited();
    }
    
    if (typeof window.app.loaded === 'function') {
        window.app.loaded();
    }

    // console.log({
    //     'app': app, 
    //     'json': app.json()
    // });
}

})();