// "use strict";

if (isset(window.app)){

	window.app.var('cache');
	
	window.app.cache.load = (key, obj, varName='cache')=>{
		var ret = null;
		if (storageAvailable('localStorage')) {

			var key = format_key(key);
			var datas = localStorage.getItem(key);
			
			if(empty(key)){
				window.app.cache.options.remove(key);
			}else{
				window.app.cache.options.destroy(key);
			}

			if(isset(datas)){

				if(empty(key)){
					window.app.cache.options.add(key, datas);
				}else{
					window.app.cache.options.import(datas, key);
				}
			}
			// else{
				var ret = window.app.cache.options.get(key);
			// }

			if(isset(obj) && obj instanceof Object_Container){
				obj.link(varName, ret);
				
				window.app.cache.add('destroy', (k) => {

					if(empty(key) || k === key){
		
						obj.link(varName, window.app.cache.options.get(key));
					}
				});
			}

			if(typeof ret.event !== 'function'){

				ret.event = (eventName, f) => {

					if(typeof f === 'function'){

						window.app.cache.add(eventName, (k)=>{

							if(k === key){
								f();
							}
						});
					}
				};
			}

			if(typeof ret.save !== 'function'){
				ret.save = () => {
					window.app.cache.save(key);
				};
			}

			if(typeof ret.reload !== 'function'){
				ret.reload = () => {
					window.app.cache.load(key);
				};
			}

			if(!empty(ret)){
				
				window.app.cache.dispatch(key, 'load');
				// window.app.cache.dispatch(key, 'loaded');
				window.app.cache.dispatch(key, 'change');
				window.app.cache.dispatch(key, 'change_once');
                window.app.cache.remove('change_once');
			}
		}
		return ret;
	};

	window.app.cache.save = (key)=>{
		var ret = false;
		if (storageAvailable('localStorage')) {
			
			var key = format_key(key);
			
			window.app.cache.dispatch(key, 'save');
			window.app.cache.dispatch(key, 'change');
			window.app.cache.dispatch(key, 'change_once');
			window.app.cache.remove('change_once');
			
			var datas = window.app.cache.options.json(key);

			if(!empty(datas)){
				var ret = localStorage.setItem(key, JSON.stringify(datas));
			}
		}
		return ret;
	};

	window.app.cache.temp = (time)=>{
		
		if(empty_key(time)){
			var time = (new Date()).getTime();
		}
		return window.app.cache.load(time);
	};

	window.app.cache.destroy = (key)=>{
		var ret = false;
		if (storageAvailable('localStorage')) {
			
			var key = format_key(key);

			window.app.cache.dispatch(key, 'destroy');
			
			// if(empty(key)){
			// 	window.app.cache.options.remove(key);
			// }else{
				window.app.cache.options.destroy(key);
			// }

			if(empty(key)){
				var ret = localStorage.clear();
			}else{
				var ret = localStorage.removeItem(key);
			}
		}
		return ret;
	};
	
	window.app.cache.load();
	
    window.app.add('loaded', () => {
    
		if (typeof window.app.cache.save === 'function') {
			window.app.cache.save();
		}
	});
}