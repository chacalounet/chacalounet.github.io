// "use strict";

function storageAvailable(type) {
	var storage;
	try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
	}
	catch(e) {
			return e instanceof DOMException && (
					// everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
					// acknowledge QuotaExceededError only if there's something already stored
					(storage && storage.length !== 0);
	}
}

function dbAvailable() {
	return isset(window) && isset(window.indexedDB);
}

const mimes = {
"html": "text/html",
"htm": "text/html",
// "php": "text/x-php",
"shtml": "text/html",
"css": "text/css",
"xml": "text/xml",
"gif": "image/gif",
"jpeg": "image/jpeg",
"jpg": "image/jpeg",
"js": "application/x-javascript",
"atom": "application/atom+xml",
"rss": "application/rss+xml",
"mml": "text/mathml",
"txt": "text/plain",
"jad": "text/vnd.sun.j2me.app-descriptor",
"wml": "text/vnd.wap.wml",
"htc": "text/x-component",
"png": "image/png",
"tif": "image/tiff",
"tiff": "image/tiff",
"wbmp": "image/vnd.wap.wbmp",
"ico": "image/x-icon",
"jng": "image/x-jng",
"bmp": "image/x-ms-bmp",
"svg": "image/svg+xml",
"webp": "image/webp",
"jar": "application/java-archive",
"war": "application/java-archive",
"ear": "application/java-archive",
"hqx": "application/mac-binhex40",
"doc": "application/msword",
"pdf": "application/pdf",
"ps": "application/postscript",
"eps": "application/postscript",
"ai": "application/postscript",
"rtf": "application/rtf",
"xls": "application/vnd.ms-excel",
"ppt": "application/vnd.ms-powerpoint",
"wmlc": "application/vnd.wap.wmlc",
"kml": "application/vnd.google-earth.kml+xml",
"kmz": "application/vnd.google-earth.kmz",
"7z": "application/x-7z-compressed",
"cco": "application/x-cocoa",
"jardiff": "application/x-java-archive-diff",
"jnlp": "application/x-java-jnlp-file",
"run": "application/x-makeself",
"pl": "application/x-perl",
"pm": "application/x-perl",
"prc": "application/x-pilot",
"pdb": "application/x-pilot",
"rar": "application/x-rar-compressed",
"rpm": "application/x-redhat-package-manager",
"sea": "application/x-sea",
"swf": "application/x-shockwave-flash",
"sit": "application/x-stuffit",
"tcl": "application/x-tcl",
"tk": "application/x-tcl",
"der": "application/x-x509-ca-cert",
"pem": "application/x-x509-ca-cert",
"crt": "application/x-x509-ca-cert",
"xpi": "application/x-xpinstall",
"xhtml": "application/xhtml+xml",
"zip": "application/zip",
"msi": "application/octet-stream",
"msp": "application/octet-stream",
"msm": "application/octet-stream",
"mid": "audio/midi",
"midi": "audio/midi",
"kar": "audio/midi",
"mp3": "audio/mpeg",
"ogg": "audio/ogg",
"ogv": "video/ogg",
"ogx": "application/ogg",
"ra": "audio/x-realaudio",
"3gpp": "video/3gpp",
"3gp": "video/3gpp",
"mpeg": "video/mpeg",
"mpg": "video/mpeg",
"mov": "video/quicktime",
"flv": "video/x-flv",
"mng": "video/x-mng",
"asx": "video/x-ms-asf",
"asf": "video/x-ms-asf",
"wmv": "video/x-ms-wmv",
"avi": "video/x-msvideo",
"m4v": "video/mp4",
"mp4": "video/mp4",
"wav": "audio/x-wav",
"weba": "audio/webm",
"webm": "video/webm"
};

// remove_specialChars = (str) => {
	
// 	if(typeof str === 'string'){

// 		return str.replace(/[^a-zA-Z0-9\- ]/g, "");
// 	}
// 	return null;
// };

const regQuery = /[\?#]/g;

var file_extension = (filename, check_mime=true) => {
	
	if(typeof filename === 'string'){

		var a = filename.split('.');

		if(a.length > 1){

			var ext = a.last().split(regQuery).first();

			if(empty(check_mime)){

				return ext;
			}

			if(isset(mimes[ext])){
	
				return ext;
			}
		}
	}
	return null;
};

function parseProtocol(url) { 
	var parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
	if (!parsedURL) {
		return false;
	}

	var [, protocol, fullhost, fullpath] = parsedURL;
	return protocol;
}

var url_format = (url) => {

	if(typeof url === 'string'){

		var ret = {};

		var a = url.split('?');

		if(a.length > 1){

			ret.query = a.pop();
			// ret.query = '?'+a.pop();
		}

		var a = a.join('').split('#');

		if(a.length > 1){

			ret.anchor = a.pop();
			// ret.anchor = '#'+a.pop();
		}

		ret.url = a.join('');

		var a = a.join('').split('://');

		if(a.length > 1){

			ret.protocol = a.shift();
			// ret.protocol = a.shift()+'://';
		}

		var a = a.join('').split('/');

		var ext = file_extension(a.last(), false);

		if(isset(ext)){

			ret.file = a.pop();
			ret.ext = ext;
		}

		// ret.root = a.join('/');
		// console.log(a);
		
		if(a.length > 0){

			var host = a.shift().split('@');

			if(host.length > 1){
	
				var account = host.shift().split(':');

				if(account.length > 1){
		
					ret.user = account.shift();
					ret.password = account.join('');
				}
			}

			var host = host.join('').split(':');

			if(host.length > 1){
	
				ret.port = host.pop();
			}

			ret.host = host.join('');
		}

		// console.log(a);
		ret.path = a.join('/');
    
		ret.root = '';
		if(!empty(ret.protocol)){
			ret.root += ret.protocol+'://';
		}
		ret.root += ret.host;
		if(!empty(ret.path)){
			ret.root += '/'+ret.path;
		}
		
		return ret;
	}
	
	return '';
};

var url_root = (url) => {
	
	if(typeof url === 'string'){

		if(isset(file_extension(url))){

			return url.substr(0, url.lastIndexOf('/'));
		}
		
		return url.split(regQuery).first();
	}
	
	return '';
};

var url_file = (url) => {
	
	if(typeof url === 'string'){

		var a = url.split('/');

		if(a.length > 1){

			var file = a.last().split(regQuery).first();

			if(isset(file_extension(file))){
	
				return file;
			}
		}
	}
	return '';
};

if (!Array.prototype.last) {
	Array.prototype.last = function () {
		if (!empty(this.length)){
			return this[this.length - 1];
		}
		return undefined;
	};
};
if (!Array.prototype.first) {
	Array.prototype.first = function () {
		if (!empty(this.length)) {
			return this[0];
		}
		return undefined;
	};
};

Function.prototype.clone = function () {
	var that = this;
	var temp = function temporary() { return that.apply(this, arguments); };
	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			temp[key] = this[key];
		}
	}
	return temp;
};

function count(obj) {
	if(is_object(obj)){
		if(is_object(obj._datas)){
			var obj = obj._datas;
		}
		return Object.keys(obj).length;
	}
	return undefined;
}

function is_element(el) {
	
	return is_object(el) && (isset(el.outerHTML) || isset(el.wholeText) || isset(el.tagName));
}

function empty_element(el)
{
	return (
		el.nodeType === 8 
		|| 
		(el.nodeType === 3 && !/\S/.test(el.nodeValue))
	);
}

function clean_element(node, deep=false)
{

	foreach(node, (el, n, node)=>{

		ret[i] = el;
		if(typeof f === 'function'){
			f(el);
		}
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if(empty_element(child))
    {
      node.removeChild(child);
      n --;
    }
    else if(deep === true && child.nodeType === 1)
    {
		clean_element(child);
	}
  }
	});
}

function convertElement(datas, f, type="text/html", autoclear=true) {

	if (!empty_key(datas)) {
		
		if(type === 'text/html'){
			
			var ret = [];
			var parsed = (new DOMParser()).parseFromString(datas, type);
			
			if(!empty(count(parsed.head.childNodes))){

				foreach(parsed.head.childNodes, (el, i, ar_nodes)=>{
	
					if(autoclear === false || !empty_element(el)){
						
						ret.push(el);
						if(typeof f === 'function'){
							f(el);
						}
					}
				});
			}
			
			// if(!empty(parsed.body.childElementCount)){
			if(!empty(count(parsed.body.childNodes))){

				foreach(parsed.body.childNodes, (el, i, ar_nodes)=>{
	
					if(autoclear === false || !empty_element(el)){
	
						// ret[i] = el;
						ret.push(el);
						if(typeof f === 'function'){
							f(el);
						}
					}
				});

			}

			// console.log(ret);
			return ret;
		}
		else{
			return (new DOMParser()).parseFromString(datas, type).documentElement;
		}
	}

	if(is_element(datas)){
		return datas;
	}

	return null;
}

function serializeElement(el) {
	return (new XMLSerializer()).serializeToString(el);
}

function check_element(el, f) {

	if(isset(el)){

		if(!empty(el instanceof Object_Container)){
			var el = el.last();
		}
		
			
		if(is_array(el)){
			var ret = [];
			foreach(el, (d, k)=>{
				
				ret[k] = check_element(d, f);
			});
			return ret;
		}
		else 
		if(!is_element(el)){

			return check_element(convertElement(el), f);
		}
		else if(is_element(el)){

			if(typeof f === 'function'){
				return f(el);
			}

			return el;
		}
	}
		
	return null;
	// return undefined;
}

function detachElement(el) {
	
	return check_element(el, (element)=>{
		
		if (is_element(element.parentNode)) {
			element.parentNode.removeChild(element);
		}

		return element;
	});
}

function clearElement(el) {
	
	return check_element(el, (element)=>{

		while (is_element(element.firstChild)) {
			element.removeChild(element.firstChild);
		}

		return element;
	});
}

function insertBeforeElement(cont, el) {
	
	return check_element(cont, (container)=>{
		return check_element(el, (element)=>{
			
			if (is_element(container.parentNode)) {
				container.parentNode.insertBefore(element, container);
			}
			return element;
		});
	});
}

function insertAfterElement(cont, el) {
	
	return check_element(cont, (container)=>{
		return check_element(el, (element)=>{
		
			if (is_element(container.parentNode)) {
				
				if (is_element(container.nextSibling)) {
					container.parentNode.insertBefore(element, container.nextSibling);
				}
				else{
					container.parentNode.appendChild(element);
				}
			}
			return element;
		});
	});
}

function insertInToElementFirst(cont, el) {
	
	return check_element(cont, (container)=>{
		return check_element(el, (element)=>{
			container.insertBefore(element, container.firstChild);
			return element;
		});
	});
}

function insertInToElement(cont, el) {
	
	return check_element(cont, (container)=>{
		return check_element(el, (element)=>{
			container.appendChild(element);
			return element;
		});
	});
}

function replaceElement(cont, el) {
	
	return check_element(cont, (container)=>{
		return check_element(el, (element)=>{

			insertAfterElement(container, element);
			detachElement(container);

			return element;
		});
	});
}

function is_object(datas) {
	return typeof datas === 'object' && isset(datas);
}

function is_jsonValid(datas) {

	if (typeof datas === 'string') {
		try {
			return is_jsonValid(JSON.parse(datas));
		} catch (e) {
			return false;
		}
	}
	else if (is_object(datas) && !is_element(datas)) {
		return true;
	}

	return false;
}

function is_json(datas) {

	if (typeof datas === 'string') {
		try {
			var datas = JSON.parse(datas);
		} catch (e) {
			return false;
		}
		return is_json(datas);
	}
	else if (is_object(datas) && JSON.__proto__ === datas.__proto__) {
		try {
			JSON.stringify(datas);
		} catch (e) {
			return false;
		}
		return true;
	}

	return false;
}

function _to_json(datas, glue) {
	var ret = null;
	
	if (is_jsonValid(datas) && !isset(datas._locked) && !ignore_types(datas)) {

		while (typeof datas === 'string') {
			var datas = JSON.parse(datas);
		}

		if (typeof datas.json === 'function') {
			return datas.json();
		}

		if (isset(datas.outerHTML)) {
			// return null;
			var datas = clone(datas);
			clearElement(datas);
			return datas.outerHTML;
		}

		if (isset(datas.wholeText)) {
			return datas.wholeText;
		}
		
		if(is_array(datas)){
			var ret = [];
		}
		else{
			var ret = {};
		}

		var _count = 0;

		foreach(datas, (data, key) => {

			var d = to_json(data);
			
			if(!empty(d) || is_numeric(d) || typeof d === 'boolean')
			{
				// console.log(key, d, data);
				if(is_array(ret)){
					ret.push(d);
				}
				else{
					ret[key] = d;
				}
				_count++;
			}
		});
		
		delete datas._locked;
		
		if(!is_array(ret) && _count === 1 && isset(ret[''])){
			var ret = ret[''];
		}
		
		if(is_array(ret)){

			if (isset(glue)) {
				var ret = ret.join(glue);
			}
			else
			if(ret.length === 1){
				var ret = ret[0];
			}
		}
	}
	else if(typeof datas === 'string'){
		return datas;
	}

	return ret;
}

function to_json(datas) {
	var ret = datas;
	if (is_jsonValid(datas)) {
		while (typeof datas === 'string') {
			var datas = JSON.parse(datas);
		}
		
		if (is_object(datas._datas)) {
			var datas = datas._datas;
			// return to_json(datas._datas);
		}
		// var datas = clone(datas);
		if(is_array(datas)){
			var ret = [];
		}
		else{
			var ret = {};
		}
		
		foreach(datas, (data, key) => {
			var d = to_json(data);
			
			// if(!empty(d))
			{
				if(is_array(ret)){
					ret.push(d);
				}
				else{
					ret[key] = d;
				}
			}
		});
	}

	return ret;
}

function is_array(datas) {
	if(is_object(datas)){
		return Array.isArray(datas) || (typeof datas === 'object' && is_numeric(datas.length) && !is_json(datas) && !is_element(datas));
	}
	return false;
}

function foreach(datas, f, reverse = false) {
	if (typeof f === 'function' && isset(datas)) {
		if (is_array(datas)) {
			if (!empty(reverse) && typeof datas.slice === 'function') {
				datas = datas.slice().reverse();
			}
			let end = false;
			
			for (let i = 0; i < datas.length; i++) {
				f(datas[i], i, ()=>{
					end = true;
				});
				if(end === true){
					break;
				}
			}
		}
		else if (is_object(datas)) {

			if (!empty(reverse) && typeof datas.slice === 'function') {
				datas = datas.slice().reverse();
			}

			let end = false;
			
			for (let prop in datas) {
				f(datas[prop], prop, ()=>{
					end = true;
				});
				if(end === true){
					break;
				}
			}
		}
		else {
			f(datas, null, null);
		}
	}
}

function empty(datas, strict=false) {
	var type = typeof datas;
	if(strict)
	{
		return datas === null || datas === undefined;
	}
	if (datas !== null && datas !== undefined) {
		if (type === 'function') {
			return false;
		}
		if (type === 'object') {
			
			if (is_element(datas)) {
				return false;
			}
			else{

				for (var key in datas) {
					
					if (isset(datas.length)) {
						if (is_numeric(key) && (!empty(datas[key]) || is_numeric(datas[key]))) {
							return false;
						}
					}
					else
					if (!empty(datas[key]) || is_numeric(datas[key])) {
						
						return false;
					}
				}
			}
		}
		if (type === 'string' && datas != '0' && datas != '') {
			return false;
		}
		if (datas > 0 || datas < 0) {
			return false;
		}
		if (datas === true) {
			return false;
		}
	}

	return true;
}

function isset(datas) {
	return !empty(datas, true);
}

function is_numeric(datas) {
	return typeof datas === 'number' || (empty(Number.isNaN(Number(datas))) && datas !== '' && typeof datas !== 'object' && typeof datas !== 'boolean');
}

function empty_key(key) {
	// var key = array_check_key(key);
	if((typeof key === 'string' && !empty(key)) || is_numeric(key)){
		return false;
	}

	return true;
}

function format_key(key) {

	if (!empty_key(key)) {

		var decoded_key = decodeURI(key);

		while(key !== decoded_key){
			var key = decoded_key;
			var decoded_key = decodeURI(key);
		}
		
		return encodeURI(key);
	}
	else {
		return '';
	}
}

function array_check_key(key) {
	
	if (isset(key)) {

		if(typeof key === 'string'){
			var key = key.trim();
		}

		return format_key(key);
	}
	
	return key;
}

function array_key_empty(key, array, strict = false) {
	if (is_object(array) && key != -1) {
		var key = array_check_key(key);

		return empty(array[key], strict);
	}

	return false;
}

function array_key_exist(key, array, empty = true) {
	if(!isset(key)){
		var key = '';
	}
	return !array_key_empty(key, array, empty);
}


function array_key_extract(key, array) {
	// if(typeof array === 'object' && !empty(array))
	{
		var key = array_check_key(key);
		if (array_key_exist(key, array)) {
			if (is_array(array)) {
				return array.splice(key, 1).last();
			}
			else {
				var val = array[key];
				delete array[key];
				return val;
			}
		}
	}

	return null;
}

function array_key_remove(key, array) {

	var key = array_check_key(key);
	if (array_key_exist(key, array)) {
		if (is_array(array)) {
			array.splice(key, 1);
		}
		else {
			delete array[key];
		}
		return true;
	}

	return false;
}

function array_search(data, array, reverse=true) {

	var ret = -1;
	if (is_object(array)) {
		if (typeof array.indexOf === 'function' && typeof array.lastIndexOf === 'function') {
			
			if (!empty(reverse)) {
				return array.lastIndexOf(data);
			}
			else{
				return array.indexOf(data);
			}
		}
		else{
			foreach(array, (d, k, end) => {
				if (d === data){
					ret = k;
					end();
				}
			}, reverse)
		}
	}

	return ret;
}

function array_value_exist(data, array, reverse=false) {
	return array_search(data, array, reverse) != -1;
}

function array_has(data, array, reverse = false) {
	return array_search(data, array, reverse) !== -1;
}

function array_value_extract(data, array, reverse = false) {
	return array_key_extract(array_search(data, array, reverse), array);
}

function array_value_remove(data, array, reverse = false) {
	return array_key_remove(array_search(data, array, reverse), array);
}

function array_replace(data, array) {
	return Object.assign(array, data);
	// return Object.assign({}, datas); //clone
}

function clone(datas, reverse = false) {

	if (is_object(datas)) {
		
		if (is_array(datas)) {
			var ret = [];
			foreach(datas, (d) => {
				ret.push(clone(d));
			});

			if (!empty(reverse)) {
				return ret.reverse();
			}
			else{
				return ret;
			}
		}
		else if(typeof datas.clone === 'function'){
			return datas.clone();
		}
		// else
		// if(typeof datas.cloneNode === 'function'){
		// 	return datas.cloneNode();
		// }
		else
		if(is_element(datas)){
			return convertElement(datas.outerHTML);
		}
		else
		if(is_json(datas))
		{
			return JSON.parse(JSON.stringify(datas));
		}
			
	}

	return datas;
}

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const _ignore_keys = ['_datas', '_locked'];
function ignore_keys(key) {

	if(array_has(key, _ignore_keys)){
		return true;
	}
	return false;
}

const _ignores_types = ['function'];
function ignore_types(type) {

	if(array_has(typeof type, _ignores_types)){
		return true;
	}
	return false;
}

const ignore_export = ignore_types;
// const ignore_import = ignore_types;
// const ignore_add = ignore_types;

class Object_Container {

	constructor(datas = null) {
		this.construct();
		this.import(datas);
		
		// this.dispatch(this._datas, 'constructor');
		return this;
	}

	construct(){
		this._datas = {};
	}

	count(key){
		
		if(isset(key)){

			var key = array_check_key(key);
			
			// if(this.key_exist(key)){

				if(!empty_key(key)){
					return this._get(key).count();
				}
				else{
					return count(this.get(key));
				}
			// }
		}
		else {
			return count(this._datas);
		}

		// return undefined;
	}

	_empty(key) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key)._empty();
		}
		else{
			return empty(this._get(key));
		}
	}

	empty(key) {
		return this._empty(key);
	}

	_bind(fn, obj){
		
		var fn = array_check_key(fn);

		if(!empty_key(fn)){

				if (obj instanceof Object_Container) {
					this._datas[fn] = obj;
				}
				else{

					if(isset(obj)){
						this._datas[fn] = new Object_Container(obj);
					}
				}
			
			return this._datas[fn];
		}

		return undefined;
	}

	_make(fn, obj){
		
		var fn = array_check_key(fn);

		if(!empty_key(fn)){

			if(isset(obj)){
				this[fn] = obj;
			}

			return this[fn];
		}

		return undefined;
	}

	_check_key(key){

		var key = array_check_key(key);

		if(!empty_key(key)){
			
			if (!isset(this._datas[key]) || empty(this._datas[key] instanceof Object_Container)) {
				this._datas[key] = new Object_Container(this._datas[key]);
			}

			if (!isset(this[key])) {
				this._make(key, this._datas[key]);
			}
		}
	}

	_link(fn, obj){

		var fn = array_check_key(fn);

		if(!empty_key(fn)){

			return this._make(fn, this._bind(fn, obj));
		}

		return this;
	}

	link(fn, obj){
		return this._link(fn, obj);
	}

	var(key, f) {

		var key = array_check_key(key);
		
		if(!empty_key(key)){

			if(f instanceof Object_Container){
				return this.link(key, f);
			}
			
			if (!isset(f)){
				this[key] = this.get(key);
			}
			else{
				this[key] = this.set(key, f);
			}

			return this[key];
		}

		return this;
	}

	export(key) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).export();
		}
		else{
			return this._datas;
		}
	}

	export_keys(key) {
		
		return Object.keys(this.export(key));
	}

	export_subkey(subkey, key) {
		
		return this.export(key)[subkey];
	}

	export_subkey_key(subkey, key) {
		
		return this.export_keys(key)[subkey];
	}

	export_keys_subkey(subkey, key) {
		
		return this.export_subkey(this.export_subkey_key(subkey, key));
	}
	
	export_key(subkey, key) {
		
		return this.export_subkey_key(subkey, key);
	}
	
	export_first(key) {
		
		return this.export_keys_subkey(0, key);
	}
	
	export_first_key(key) {
		
		return this.export_subkey_key(0, key);
	}

	export_last(key) {

		return this.export_keys_subkey(this.export_keys(key).length-1, key);
	}
	
	export_last_key(key) {
		
		return this.export_subkey_key(this.export_keys(key).length-1, key);
	}

	import(datas = null, key = null, reverse = false) {

		if(typeof ignore_import === 'function' && ignore_import(datas)){
			var datas = null;
		}

		if (isset(datas)) {

			while (typeof datas === 'string' && is_jsonValid(datas)) {
				var datas = JSON.parse(datas);
			}

			var key = array_check_key(key);

			if(!empty_key(key)){
				this._get(key).import(datas);
			}
			else if (is_array(datas)) {
				foreach(datas, (d) => {
					this.import(d, key, reverse);
				});
			}
			else{
				
				if (is_object(datas) && !is_element(datas) && !isset(datas._locked)) {
					
					if(isset(datas._datas)){
						var datas = datas._datas;
					}
					datas._locked = true;
					foreach(datas, (d, k) => {
						
						if(!ignore_keys(k)){
							if(!empty_key(k)){
								this.import(d, k, reverse);
							}
							else{
								this._add(k, d, reverse);
							}
						}
					});
					delete datas._locked;
				}
				else{
					this._add(key, datas, reverse);
				}
			}
		}
		
		return this;
	}

	_add(key = null, datas = null, reverse = false) {

		if(typeof ignore_add === 'function' && ignore_add(datas)){
			var datas = null;
		}

		if (isset(datas)) {

			while (typeof datas === 'string' && is_jsonValid(datas)) {
				var datas = JSON.parse(datas);
			}

			var key = array_check_key(key);

			if(!empty_key(key)){
				return this._get(key)._add(null, datas, reverse);
			}
			else if (is_array(datas)) {
				foreach(datas, (d) => {
					this._add(key, d, reverse);
				});
			}
			else{
					if (!isset(this._datas[''])) {
						this._datas[''] = [];
					}
	
					if (!empty(reverse)) {
						this._datas[''].unshift(datas);
					}
					else {
						this._datas[''].push(datas);
					}
			}
		}
		return this;
	}

	add(key = null, datas = null, reverse = false) {
		return this._add(key, datas, reverse);
	}

	_on(key = null, datas = null, reverse = true) {
		return this._add(key, datas, reverse);
	}

	on(key = null, datas = null, reverse = true) {
		return this._on(key, datas, reverse);
	}

	_set(key = null, datas = null, reverse = false) {
		this._remove(key);
		return this._add(key, datas, reverse);
	}

	set(key = null, datas = null, reverse = false) {
		return this._set(key, datas, reverse);
	}
		
	_get(key = null, reverse = false) {
		
		if (is_array(key)) {
			var ret = [];
			foreach(key, (k) => {
				ret.push(this._get(k, reverse));
			});

			if (!empty(reverse)) {
				return ret.reverse();
			}
			else{
				return ret;
			}
		}
		else {
			var key = array_check_key(key);

			if(!empty_key(key)){
				this._check_key(key);
				return this._datas[key];
			}
			else{
				if (!isset(this._datas[''])) {
					this._datas[''] = [];
				}

				if (!empty(reverse)) {
					return this._datas[''].reverse();
				}
				else{
					return this._datas[''];
				}
			}
		}
	}

	_clone(key = null, reverse = false) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key)._clone(null, reverse);
		}
		else
		{
			return clone(this._get(key, reverse));
		}
	}

	clone(key = null,  reverse = false) {
		return this._clone(key, reverse);
	}

	get(key = null, reverse = false) {
		return this._get(key, reverse);
	}

	values(key = null, reverse = false) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).values();
		}
		else{
			return this._get(key, reverse);
		}
	}

	get_subkey(subkey = 0, key = null, reverse = false) {

		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).get_subkey(subkey, null, reverse);
		}
		else if(is_numeric(subkey)){
			return this._get(key, reverse)[subkey];
		}

		return undefined;
	}

	subkey(key) {
		return this.subkeys(key)-1;
	}

	subkeys(key) {
		
	var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).subkeys();
		}
		else{
			return this._get(key).length;
		}
	}

	first(key = null) {
		return this.get_subkey(0, key);
	}

	last(key = null) {
		return this.get_subkey(this.subkey(key), key);
	}

	key_exist(key) {
		return !empty(this.values(key).length);
	}

	_has(data, key = null) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key)._has(data);
		}
		else{
			return array_has(data, this._get(key));
		}
	}

	has(data, key = null) {
		return this._has(data, key);
	}

	_search(data, key = null) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key)._search(data);
		}
		else{
			return array_search(data, this._get(key));
		}
	}

	search(data, key = null) {
		return this._search(data, key);
	}

	extract(key) {
		var retour = this._get(key);
		this._remove(key);
		return retour;
	}
	
	extract_subkey(subkey = 0, key = null, reverse = false) {

		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).extract_subkey(subkey, null, reverse);
		}
		else if(is_numeric(subkey)){
			return array_key_extract(subkey, this._get(key, reverse));
		}

		return undefined;
	}

	pop(key = null) {
		return this.extract_subkey(this.subkey(key), key);
	}

	shift(key = null) {
		return this.extract_subkey(0, key);
	}

	_remove(key = null) {
		
	var key = array_check_key(key);
		if(!empty_key(key)){
			this._get(key)._remove();
		}
		else{
			delete this._datas[''];
		}

		return this;
	}

	remove(key = null) {
		return this._remove(key);
	}
	
	remove_subkey(subkey = 0, key = null, reverse = false) {

		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).remove_subkey(subkey, null, reverse);
		}
		else if(is_numeric(subkey)){
			return isset(array_key_extract(subkey, this._get(key, reverse)));
		}

		return false;
	}

	remove_values(datas, key, reverse) {

		var key = array_check_key(key);
		if(!empty_key(key)){
			var ret = this._get(key).remove_values(datas, null, reverse);
		}
		else{
			var ret = array_value_extract(datas, this._get(key), reverse);
		}

		return isset(ret);
	}
	
	_destroy(key) {

		var key = array_check_key(key);

		if(!empty_key(key)){
			this._get(key).destroy();
		}
		else{
            for (var prop in this) {
                delete this[prop];
			}
			
			this.construct();
		}
		
		return this;
    }

	destroy(key) {
		return this._destroy(key);
	}

	foreach(key = null, f, reverse = false) {
		var key = array_check_key(key);
		if(!empty_key(key)){
			foreach(this._get(key)._get(null, reverse), f);
		}
		else{
			foreach(this._get(key, reverse), f);
		}
	}

	fetch(key = null, f, reverse = false) {
		foreach(this._extract(key, reverse), f);
	}

	dispatch(params=null, key = null, reverse = false) {
		var key = array_check_key(key);
			this.foreach(key, (d,i,end) => {
				if (typeof params === 'function') {
					params(d, i,end);
				}
				else 
				if (typeof d === 'function') {
					d(params, i,end);
				}
			}, reverse);
	}

	parse(key = null, f, reverse = false) {

		var key = array_check_key(key);
		if(!empty_key(key)){
			this._get(key).parse(null, f, reverse);
		}
		else if(typeof f === 'function'){
			foreach(this.export(), (d, k,end) => {
				if(!empty(k) || is_numeric(k))
				{
					f(d, k,end);
				}
			}, reverse);
		}
	}

	string(key, glue=', ') {
		var key = array_check_key(key);
		if(!empty_key(key)){
			return this._get(key).string(null, glue);
		}
		else{
			return this.to_string(this._get(key), glue);
		}
	}

	to_string(datas, glue=' ') {
		if(typeof datas === 'string'){
			return datas;
		}
		if(is_array(datas)){
			var str = '';
			foreach(datas, (d, k,end) => {
				var ds = this.to_string(d, glue);
				if(!empty(ds) || is_numeric(ds)){
					// console.log(ds, '-', d);
					if(!empty(str) || is_numeric(str) && typeof glue === 'string'){
						str = str+glue;
					}
					str = str+ds;
				}
			});
			return str;
		}
		else
		if (is_object(datas)){

			if (is_element(datas)) {
				// // return null;
				// // return datas.textContent;
				// return datas.textContent.trim();
				// // return outerHTML;
				if (isset(datas.wholeText)) {
					return datas.wholeText;
				}
				return datas.textContent;
			}

			if (typeof datas.string === 'function') {
				return datas.string();
			}
		}

		return '';
	}

	json(key) {
		var ret = {};
		if(!isset(this._jsonLocker)){
			this._jsonLocker = true;
			var key = array_check_key(key);
			if(!empty_key(key)){
				var ret = this._get(key).json();
			}
			else
			if(isset(key)){
				var ret = this.to_json(this._get(key));
			}
			else{
				var ret = this.to_json(this._datas);
			}
			delete this._jsonLocker;
		}
		if((!empty(this.json_array) && !is_object(ret)) || !empty(this.force_array)){
			return [ret];
		}
		return ret;
	}

	
	to_json(datas) {
		if(typeof ignore_export === 'function' && ignore_export(datas)){
			return null;
		}

		if (is_element(datas)) {
			// return datas.textContent.trim();
			// return outerHTML;
			if (isset(datas.wholeText)) {
				return datas.wholeText;
			}
			return null;
		}
		
		var ret = datas;
		if (is_jsonValid(datas)) {

			while (typeof datas === 'string') {
				var datas = JSON.parse(datas);
			}

			// if (isset(datas.outerHTML)) {
			// 	return null;
			// 	var datas = clone(datas);
			// 	clearElement(datas);
			// 	return datas.outerHTML;
			// }

			// if (isset(datas.wholeText)) {
			// 	return datas.wholeText;
			// }
			// if (!empty(datas.toString, true)) {
			// 	return datas.toString();
			// }
			if (typeof datas.json === 'function') {
				// var datas = datas._datas;
				return datas.json();
			}
			if (isset(datas._datas)) {
				// var datas = datas._datas;
				return this.to_json(datas._datas);
			}
			
			// var datas = clone(datas);
			if(is_array(datas)){
				var ret = [];
			}
			else{
				var ret = {};
			}

			var count = 0;
	
			foreach(datas, (data, key,end) => {
				
				if(data instanceof Object_Container){
					var d = data.json();
				}
				else{
					var d = this.to_json(data);
				}
				
				// console.log([key, d]);

				// if(!empty(d))
				// if(!empty(d) || is_numeric(d))
				// if(!empty(d) || is_numeric(d) || typeof d === 'boolean')
				if(typeof d === 'string' || !empty(d) || is_numeric(d) || typeof d === 'boolean')
				{
					// console.log(key, d, data);
					if(is_array(ret)){
						ret.push(d);
					}
					else{
						ret[key] = d;
					}
					count++;
				}
			});
			
			if(!is_array(ret) && count === 1 && isset(ret[''])){
				var ret = ret[''];
			}
			
			if(is_array(ret)){

				if (isset(this.glue)) {
					var ret = ret.join(this.glue);
				}
				else
				if(ret.length === 1){
					var ret = ret[0];
				}
			}
		}
	
		return ret;
	}

	timeout(f, period = 1000, autoclear = true) {
		if (!empty(autoclear) && isset(this._timeout)) {
			clearTimeout(this._timeout);
			delete this._timeout;
		}

		if (isset(this._interval)) {
			this.interval();
		}

		if (!is_numeric(period)) {
			var period = 0;
		}

		if (typeof f === 'function' && !isset(this._timeout) && is_numeric(period)) {
			this._timeout = setTimeout(()=>{
				delete this._timeout;
				f();
			}, period);
			return isset(this._timeout);
		}
		return false;
	}

	interval(f, period = 10, autoclear = true) {
		if (!empty(autoclear) && isset(this._interval)) {
			clearInterval(this._interval);
			delete this._interval;
		}

		if (isset(this._timeout)) {
			this.timeout();
		}

		if (!is_numeric(period)) {
			var period = 0;
		}

		if (typeof f === 'function' && !isset(this._interval) && is_numeric(period)) {
			this._interval = setInterval(f, period);
			return isset(this._interval);
		}
		return false;
	}
}

class Options_Container extends Object_Container {

	constructor(el, options) {
		super(el);
		
		if(!empty(options instanceof Options_Container)){
			var options = options.options;
		}
		this.options.import(options);
		// this.add('options', options);
	}

	construct(){
		super.construct();
		this.link('options', new Object_Container());
	}

	_check_key(key){
		
		var key = array_check_key(key);

		if(!empty_key(key)){

			if (!isset(this._datas[key])) {
				this._bind(key, new Options_Container());
			}

			if (!isset(this[key])) {

				if(this._datas[key] instanceof Options_Container){
					this[key] = (k, reverse) => {
						this.dispatch(k, key, reverse);
					};
				}
				else{
					super._make(key, this._datas[key]);
				}
			}
		}
	}
    
    get is() { 
			return this.get('_is').last();
    }

    set is(value) {
			if(typeof value !== 'function'){

				this.dispatch(value, 'is');

				this.get('_is').set(null, value);

				this.dispatch(this.is, 'isset');
			}
    }
    
    get current() { 
			return this.get('_current').last();
    }

    set current(value) {
			if(typeof value !== 'function'){
				
						this.get('_current').add(null, value);
					this.dispatch(value, 'current');
			}
    }
}

class HTML_Container extends Options_Container {

	// constructor(el, query, options) {
	// }
	
	el(el){

		if(typeof el === 'string'){
			var el = convertElement(el);
		}

		return el;
	}

	_add(key = null, datas = null, reverse = false) {
		
		if (typeof datas === 'string') {
           var datas = this.el(datas);
		}
		return super._add(key, datas, reverse);
    }
}

const onArray = (datas, f)=>{
        
	if(typeof f === 'function'){

		if(is_array(datas)){

			foreach(datas, (d)=>{
				
				if(is_array(d)){
	
					onArray(d, f);
				}
				else{
					
					f(d);
				}
			});
		}
		else{
			f(datas);
		}
	}
};

const onObject = (datas, f, key)=>{
	
	if(typeof f === 'function'){

		if(!empty(datas instanceof Object_Container)){
			
			var datas = datas.get(key);
		}

		onArray(datas, (d)=>{

			if(!empty(d instanceof Object_Container)){

				onObject(d, f, key);
			}
			else{

				f(d);
			}
		});
	}
};

const onString = (datas, f, strict=true)=>{
	
	if(typeof f === 'function'){

		onObject(datas, (d)=>{

			if(is_element(d)){

				// if(isset(d.wholeText)){
				//     var d = d.wholeText;
				// }

				if(isset(d.textContent)){
					var d = d.textContent;
				}

				// if(isset(d.outerHTML)){
				//     var d = d.outerHTML;
				// }
			}

			if(typeof d === 'string' || is_numeric(d)){

				f(d);
			}
			else if(empty(strict) && !is_object(d)){

				f(d);
			}
		});
	}
};

const onSplits = (datas, glue=',', f)=>{
	
	if(typeof f === 'function'){

		onString(datas, (d)=>{
			
			foreach(String(d).split(glue), f);
		});
	}
};

const onJoins = (datas, glues=',', cont=false)=>{

	var string = '';
	if(is_array(glues) && isset(glues.first())){
		var glue = glues.shift();
	}
	else if(typeof glues === 'string'){
		var glue = glues;
	}
	else{
		var glue = '';
	}
	

	if(!empty(datas instanceof Object_Container)){
			
		var datas = datas.get();
	}

	if(is_array(datas)){

		foreach(datas, (d)=>{

			if(isset(d)){

				if(typeof d !== 'string'){
					if(is_array(glues) && isset(glues.first())){
						var d = onJoins(d, clone(glues), cont);
					}
					else if(!empty(cont)){
						if(typeof cont === 'string'){
							var d = onJoins(d, cont, cont);
						}
						else{
							var d = onJoins(d, glue, cont);
						}
					}
					else{
						var d = onJoins(d, '', cont);
					}
				}
					
				if(!empty(d) || is_numeric(d)){
					// console.log(d);
					if(!empty(string) || is_numeric(string)){
						if(typeof glue === 'string'){
							string += glue;
						}
					}
					string += String(d);
				}
			}
		});
	}
	else if(typeof datas === 'string'){
		var string = datas;
	}

	return string;
};

const getOptions = (el, options)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){
			
			return el.getAttribute(options);
		}
		else if(!isset(options)){

			return el.attributes;
		}
	}

	return null;
};
const addOptions = (el, options, values, glue=' ')=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){
			
			if(!empty(values) || is_numeric(values)){
				
				var datas = '';
				onSplits([el.getAttribute(options), values], glue, (v)=>{
					if(!empty(v) || is_numeric(v)){
						
						// console.log(v);
						if(!empty(datas) || is_numeric(datas)){
							if(typeof glue === 'string'){
								datas += glue;
							}
						}
						datas += String(v);
					}
				});

				el.setAttribute(options, datas);
				return true;

				// onObject(el, (e)=>{

				// 	// console.log(e);
				// 	if(is_element(e)){
				// 	}
				// });
			}
		}
	}
	return false;
};
const removeOptions = (el, options)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){
					
			el.removeAttribute(options);
			return true;
		}
	}
	return false;
};
const setOptions = (el, options, values, glue=' ', autoDelete=false)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){

			var datas = '';
			onSplits(values, glue, (v)=>{
				if(!empty(v) || is_numeric(v)){
					// console.log(v);
					if(!empty(datas) || is_numeric(datas)){
						if(typeof glue === 'string'){
							datas += glue;
						}
					}
					datas += String(v);
				}
			});
			
			// console.log(options, datas);
			if(!empty(datas) || is_numeric(datas) || empty(autoDelete)){

				el.setAttribute(options, datas);
			}
			else{
				el.removeAttribute(options);
			}

			return true;
		}
	}
	return false;
};
const removeOptionsValues = (el, options, values, glue=' ', autoDelete=true)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(!is_array(values)){
					
		var val = [];
		if(isset(values)){

			onSplits(values, glue, (v)=>{
				if(!empty(v) || is_numeric(v)){
					val.push(v);
				}
			});
		}

		var values = val;
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){
			
			if(!empty(val.length)){
				var datas = '';
				onSplits(el.getAttribute(options), glue, (v)=>{
					if(!empty(v) || is_numeric(v)){
						if(!array_has(v, val)){
							// console.log(v);
							if(!empty(datas) || is_numeric(datas)){
								if(typeof glue === 'string'){
									datas += glue;
								}
							}
							datas += String(v);
						}
					}
				});
			}
			else{
				var datas = el.getAttribute(options);
			}
			
			// console.log(options, datas);
			if(!empty(datas) || is_numeric(datas) || empty(autoDelete)){

				el.setAttribute(options, datas);
			}
			else{
				el.removeAttribute(options);
			}

			return true;
		}
	}

	return false;
};
const hasOptions = (el, options)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		if(typeof options === 'string' && !is_numeric(options) && !empty(options)){
				
			return el.hasAttribute(options);
		}
	}

	return false;
};


const getClass = (el)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){
		
		return el.className;
	}

	return null;
};
const addClass = (el, values)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		onSplits(values, ' ', (v)=>{
			
			if(!empty(v) || is_numeric(v)){

				el.classList.add(v);
			}
		});
	
		return true;
	}

	return false;
};
const removeClass = (el, values)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(is_element(el)){

		onSplits(values, ' ', (v)=>{
			
			if(!empty(v) || is_numeric(v)){

				el.classList.remove(v);
			}
		});

		return true;
	}

	return false;
};
const setClass = (el, values)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(empty(typeof values === 'string')){

		var val = '';
		var glue = ' ';
		onSplits(values, glue, (v)=>{
			
			if(!empty(v) || is_numeric(v)){

				// console.log(v);
				if(!empty(val) || is_numeric(val)){
					if(typeof glue === 'string'){
						val += glue;
					}
				}
				val += String(v);
			}
		});
		var values = val;
	}

	if(is_element(el)){

		el.className = values;

		return true;
	}

	return false;
};
const hasClass = (el, value)=>{

	if(!empty(el instanceof Object_Container)){
		
		var el = el.last();
	}

	if(empty(typeof values === 'string')){

		var val = '';
		var glue = ' ';
		onSplits(values, glue, (v)=>{
			
			if(!empty(v) || is_numeric(v)){

				// console.log(v);
				if(!empty(val) || is_numeric(val)){
					if(typeof glue === 'string'){
						val += glue;
					}
				}
				val += String(v);
			}
		});
		var values = val;
	}

	if(is_element(el)){
		
		return el.classList.contains(value);
	}

	return false;
};

const HTML = (el, options)=>{

	if(!empty(el instanceof HTML_Container)){
		var el = el.last();
	}

	if(typeof el === 'string'){
		var el = convertElement(el);
	}

	if(is_array(el)){
		var el = el.last();
	}
	
	if(is_element(el) && isset(el.wholeText)){
		// var el = null;
		var container = convertElement('<span>');
		insertInToElement(container, el);
		var el = container;
	}
	
	if(!isset(el)){
		var el = '<div>';
	}

	var obj = new HTML_Container(el);
	obj.link('options', options);

	

	obj.getOptions = (o) => {
		
		return getOptions(obj, o);
	};

	obj.addOptions = (o, v, glue=' ') => {

		return addOptions(obj, o, v, glue);
	};

	obj.removeOptions = (o) => {

		return removeOptions(obj, o);
	};

	obj.removeOptionsValues = (o, v, glue=' ', autoDelete=true) => {

		return removeOptionsValues(obj, o, v, glue, autoDelete);
	};

	obj.setOptions = (o, v, glue=' ', autoDelete=false) => {

		return setOptions(obj, o, v, glue, autoDelete);
	};

	obj.hasOptions = (o) => {
		
		return hasOptions(obj, o);
	};

	obj.getClass = () => {
		
		return getClass(obj);
	};

	obj.addClass = (c) => {
		
		return addClass(obj, c);
	};

	obj.removeClass = (c) => {
		
		return removeClass(obj, c);
	};

	obj.setClass = (c) => {
		
		return setClass(obj, c);
	};

	obj.hasClass = (c) => {
		
		return hasClass(obj, c);
	};
		
	obj.replaceTo = (el) => {

		replaceElement(el, obj);
	};
		
	obj.replace = (el) => {

		replaceElement(obj, el);
	};
		
	obj.insertBefore = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}

		insertBeforeElement(obj, el);

		return el;
	};
		
	obj.insertAfter = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}

		insertAfterElement(obj, el);

		return el;
	};
		
	obj.insert = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}
		
		insertInToElement(obj, el);

		return el;
	};
		
	obj.insertFirst = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}
		
		insertInToElementFirst(obj, el);

		return el;
	};
		
	obj.insertTo = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}
		
		insertInToElement(el, obj);

		return el;
	};
		
	obj.insertToFirst = (el) => {

		if(empty(el instanceof Object_Container)){
			var el = HTML(el);
		}

		insertInToElementFirst(el, obj);

		return el;
	};
		
	obj.detach = () => {
		
		detachElement(obj);
	};
		
	obj.clearAll = () => {
		
		clearElement(obj);
	};
		
	obj.add('active', () => {

		// obj.removeClass('d-none');

		onObject(obj, (el)=>{

			// console.log(e);
			if(is_element(el)){
				el.style.display = null;
			}
		});
	});

	obj.add('desactive', () => {

		// obj.addClass('d-none');

		onObject(obj, (el)=>{

			// console.log(e);
			if(is_element(el)){
				// el.style.display = 'none';
				el.style.setProperty('display', 'none', 'important');
			}
		});
	});	

	// obj.var('class');
	// obj.options.var('class');

	obj.first().addEventListener('click', (e) => {

		obj.dispatch(e, 'click');
	});

	obj.focus = () => {

		if(isset(window.app.ui.drawer) && isset(window.app.ui.drawer.mdc) && !empty(window.app.ui.drawer.mdc.open)){
			
			window.app.ui.drawer.set('focus', ()=>{

				obj.first().focus();
				obj.dispatch(null, 'focus');
			});
		}
		else{

			obj.first().focus();
			obj.dispatch(null, 'focus');
		}
	};
	
			
	obj.update = (options) => {
		
		if(!isset(options)){
			var options = obj.options;
		}

		if(!empty(options instanceof Options_Container)){
			var options = options.options;
		}
		
		if(empty(options instanceof Object_Container)){
			var options = new Object_Container(options);
		}

		// obj.setClass([obj.options.get('class'),options.get('class')]);

		obj.dispatch(options, 'setter');
		obj.dispatch(options, 'update');
	};
		
	obj.add('setter', (options)=>{

		if(!empty(options instanceof Object_Container)){

			obj.addClass(options.get('class'));
		}
	});
			
	obj.init = () => {
		
		obj.update(obj.options);
		obj.dispatch(obj.options, 'init');
				
		if(typeof obj.inited === 'function'){

			obj.inited(obj.options);
		}
	};

	return obj;
};

var module = module || undefined;
if (typeof module !== 'undefined'){

	module.exports = {
		count,
		storageAvailable,
		is_element,
		empty_element,
		clean_element,
		convertElement,
		serializeElement,
		check_element,
		detachElement,
		clearElement,
		insertBeforeElement,
		insertAfterElement,
		insertInToElementFirst,
		insertInToElement,
		replaceElement,
		is_object,
		is_jsonValid,
		is_json,
		to_json,
		is_array,
		foreach,
		empty,
		isset,
		is_numeric,
		empty_key,
		format_key,
		array_check_key,
		array_key_empty,
		array_key_exist,
		array_key_extract,
		array_key_remove,
		array_search,
		array_value_extract,
		array_value_remove,
		array_value_exist,
		array_has,
		array_replace,
		clone,
		rand,
		ignore_keys,
		ignore_types,
		Timer_Container,
		HTML_Container,
		Options_Container,
		Object_Container
	};
}

var window = window || undefined;
if (typeof window !== 'undefined') {
	
	// window.app = new HTML_Container();
	window.app = new HTML_Container(document.getElementById('main'));
	if(window.app.empty()){
		window.app.add(null, document.body);
	}
}

function throttle(type, name, obj) {
	obj = obj || window;
	var e = new CustomEvent(name);
	var running = false;
	var func = function() {
	  if (running) { return; }
	  running = true;
	  requestAnimationFrame(function() {
		obj.dispatchEvent(e);
		running = false;
	  });
	};
	obj.addEventListener(type, func);
	return e;
};