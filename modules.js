// "use strict";

if (isset(window.app))
{
	window.app.var('tools');
	
    window.app.tools.set('active', (el) => {
        if (is_element(el)) {
            el.classList.add("active");
        }
    });

    window.app.tools.set('desactive', (el) => {
        if (is_element(el)) {
            el.classList.remove("active");
        }
    });

    window.app.tools.set('toggle', (el) => {
        if (is_element(el)) {
            if(el.classList.contains("active")){
                window.app.tools.desactive(el);
            }
            else{
                window.app.tools.active(el);
            }
        }
    });
	
	window.app.tools.on('show', (params) => {
		
		if(!is_json(params) && !empty(params) && is_element(params))
		{
			var params = {el: params};
		}
	
		if(is_json(params) && !empty(params.el) && is_element(params.el))
		{
			params.easing = params.easing || 'easeInOutCirc';
			params.duration = parseInt(params.duration) || 250;
	
			anime.remove(params.el);
			anime({
				targets: params.el,
				scale: 1,
				duration: params.duration,
				easing: params.easing,
				begin: function(anim) {
					params.el.style.display='block';
					if(typeof params.begin === 'function')
					{
						params.begin();
					}
				},
				complete: function(anim) {
					if(typeof params.complete === 'function')
					{
						params.complete();
					}
				}
			});
		}
	});
	window.app.tools.on('hide', (params) => {
		
		if(!is_json(params) && !empty(params) && is_element(params))
		{
			var params = {el: params};
		}
	
		if(is_json(params) && !empty(params.el) && is_element(params.el))
		{
			params.easing = params.easing || 'easeInOutCirc';
			params.duration = parseInt(params.duration) || 250;
	
			anime.remove(params.el);
			anime({
				targets: params.el,
				scale: 0,
				duration: params.duration,
				easing: params.easing,
				begin: function(anim) {
					if(typeof params.begin === 'function')
					{
						params.begin();
					}
				},
				complete: function(anim) {
					params.el.style.display='none';
					if(typeof params.complete === 'function')
					{
						params.complete();
					}
				}
			});
		}
	});
	window.app.tools.on('scrollTop', (params) => {
		
		if(!is_json(params) && !empty(params))
		{
			var params = {duration: params};
		}
	
		if(is_json(params) && !empty(params.duration))
		{
			params.el = params.el || document.querySelectorAll('html, body')[0];
			params.from = parseInt(params.from) || params.el.scrollTop;
			if(!empty(params.to) && !is_numeric(params.to) && !empty(params.to.offsetTop)){
				params.to = params.to.offsetTop;
			}
			params.to = parseInt(params.to) || 0;
			params.duration = parseInt(params.duration) || 1000;
			params.easing = params.easing || 'easeInOutQuad';
	
			anime.remove(params.el);
			anime({
				targets: params.el,
				scrollTop: [params.from, params.to],
				easing: params.easing,
				duration: params.duration,
				begin: function(datas) {
					if(typeof params.begin === 'function')
					{
						params.begin(datas);
					}
				},
				complete: function(datas) {
					if(typeof params.complete === 'function')
					{
						params.complete(datas);
					}
				}
			});
		}
	});

	window.app.tools.var('mime');
	window.app.tools.var('ext');

	foreach(mimes, (mime, ext)=>{
		window.app.tools.get('mime').add(mime, ext);
		window.app.tools.get('ext').add(ext, mime);
	});

	

	var file_mime = (filename) => {

		return window.app.tools.ext.last(file_extension(filename));
	};
	

	var mime_extension = (mime) => {

		return window.app.tools.mime.last(mime);
	};


	window.app.tools.icon = (options)=>{
		
		var html = HTML(`
		<i>
		`, options);


		// if(empty(html.options.get('class'))){
			html.options.add('class', 'material-icons');
		// }
		
		html.add('update', (options)=>{
			
			if(!empty(options instanceof Object_Container)){
				var options = options.last();
			}
            
            if(!isset(options)){
                var options = '';
            }

			if(!empty(html.getClass())){
				html.active();
			}
			else{
				html.desactive();
			}
			
			if(!empty(html.hasClass('material-icons'))){

				if(!empty_key(options)){

					html.active();
					html.first().textContent = options;
				}
				else{
					html.desactive();
				}
			}
		});
		
		return html;
	};

	window.app.tools.input = (options)=>{
		
		var html = HTML(`
		<input>
		`, options);


		// if(empty(html.options.get('class'))){
		// 	html.options.set('class', '');
		// }

		// html.setOptions('type', 'text');
		// html.setOptions('autocomplete', 'off');
		// html.setOptions('required');
						
		html.add('enable', () => {

			html.removeOptions('disabled');
		});

		html.add('disable', () => {

			html.setOptions('disabled');
		});

		html.first().addEventListener('input', (e) => {

			html.dispatch(e, 'input');
		});

		html.first().addEventListener('change', (e) => {
			
			html.dispatch(e, 'change');
		});

		html.first().addEventListener('submit', (event) => {

			event.preventDefault();
			html.dispatch(event, 'submit');
		});

		html.first().addEventListener("keydown", function(event) {

		// event.preventDefault();
		html.dispatch(event, 'keydown');
		// console.log(event.keyCode);

		if (event.keyCode === 13) {
				event.preventDefault();
				html.dispatch(event, 'submit');
			}
		else 
		if (event.keyCode === 27) {
			event.preventDefault();
			html.dispatch(event, 'escape');
		}
		});
		
        Object.defineProperty(html, "value", { 
            get: function () {

                var type = html.getOptions('type');
                
                if(type == 'checkbox' || type == 'radio'){
                    return html.first().checked;
                }

                return html.first().value;
            },
            set: function (val) {
				html.update(val);
				// html.dispatch(null, 'change');
            }
        });
		
		html.add('update', (options)=>{

			if(!empty(options instanceof Object_Container)){
				var options = options.last();
			}
            
            if(!isset(options)){
                var options = '';
            }

			var type = html.getOptions('type');
			
			if(!empty(type)){

				if(type == 'checkbox' || type == 'radio'){

					html.first().checked = !empty(options);
				}
				else{

					html.first().value = options;
				}

				// html.dispatch(null, 'change');
			}
		});
		
		return html;
	};

	window.app.tools.label = (options)=>{
		
		var html = HTML(`
		<label>
		`, options);
		
		html.add('update', (options)=>{

			if(!empty(options instanceof Object_Container)){
				var options = options.last();
			}
            
            if(!isset(options)){
                var options = '';
            }

			if(!empty_key(options)){

				html.active();
			}
			else{
				html.desactive();
			}

			html.first().textContent = options;
		});
		
		return html;
	};
	
    window.app.tools.button = (options)=>{
        
        var html = HTML(`
        <button>
        `, options);
                        
        html.add('enable', () => {

            html.removeOptions('disabled');
        });

        html.add('disable', () => {

            html.setOptions('disabled');
		});
		
		html.insert(html.var('icon', window.app.tools.icon(html.options.get('icon'))));

		html.var('label', window.app.tools.label(html.options.get('label')));
		html.insert(html.label.set(null, '<span>'));
		
		html.add('update', (options)=>{

			html.icon.update(options.get('icon'));
			html.label.update(options.get('label'));
		});
        
        return html;
    };

	var MODULE = (query, tag, options)=>{

		if(typeof query === 'string' && isset(tag)){

			var element = window.app.ui.var(query, HTML(tag, options));

			element.options.set('query', query);

			if (isset(window.app.cache)){

				// window.app.cache.destroy(query);
				window.app.cache.load(query,  element);
			}
			
			element.add('is', (el) => {
				
				window.app.ui.event();
				// console.log(el);
				if(!empty(element.is)){

					if (typeof element.is.desactive === 'function') {
						element.is.desactive();
					}
				}

				if (is_object(el) && typeof el.active === 'function') {
					el.active();
				}
			});

			element.set('active', ()=>{
				
				insertInToElement(window.app.ui, element);
				window.app.ui.first().scrollTop = 0;
			});

			element.set('desactive', ()=>{
				
				detachElement(element);
			});

			window.app.ui.drawer.bind(element);
			// insertBeforeElement(window.app.ui.drawer.content.list.divider, element.button);

			element.button.set('click', (e) => {

				if(window.app.ui.is !== element){

					window.app.ui.is = element;
				}
				else{

					window.app.ui.event();
				}
			});

			
			element.var('sender');
			element.var('receiver');

			element.send = (datas)=>{
				
				if(!empty(datas)){

					element.sender.destroy();
					element.sender.import(datas);
				}
				
				if(!empty(element.sender)){

					element.dispatch(element.sender, 'send');

					if (isset(window.app.socket) && !empty(window.app.socket.is)){
						var send = {};
						send[query] = element.sender.json();
						window.app.socket.send(send);
					}
					// else {
									
					// 	element.receive(element.sender);
					// }
					
					element.dispatch(element.sender, 'sended');
					console.log('send', element.sender.json());
				}
			};

			element.receive = (datas)=>{
				
				element.receiver.destroy();

				if(!empty(datas)){

					element.receiver.import(datas);
				}

				if(!empty(element.receiver)){

					element.dispatch(element.receiver, 'receive');
					element.dispatch(element.receiver, 'received');
					console.log('receive', element.receiver.json());
				}
			};

			if (isset(window.app.socket)){

				window.app.socket.add('connected', () => {

					if(typeof element.connected === 'function'){

						element.connected();
					}
				});

				window.app.socket.add('disconnected', () => {
					
					if(typeof element.disconnected === 'function'){

						element.disconnected();
					}
				});

				window.app.socket.add('receive', (datas) => {
					if (!empty(datas.get(query))){

						if (typeof element.receive === 'function') {
							
							element.receive(datas.get(query));
						}
					}
				});
			}

			window.app.ui.add('init', () => {

				if (typeof element.init === 'function') {

					element.init();
				}
			});

			window.app.add('inited', () => {
				
				if(typeof element.disconnected === 'function'){

					element.disconnected();
				}

				// if (typeof element.inited === 'function') {

				// 	element.inited();
				// }
			});

			return element;
		}
		return null;
	};
}