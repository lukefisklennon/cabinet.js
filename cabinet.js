/*
 * Cabinet.js
 * Automatically keeps variables synced to storage in the browser or Node.js
 *
 * v0.0.5
 * 4 December, 2017
 *
 * By iO Ninja
 * MIT license
 * See README.md for more information
 */

/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

Object.defineProperty (Object.prototype, "watch", {
	enumerable: false,
	configurable: true,
	writable: false,
	value: function (prop, handler) {
		var oldval = this[prop],
		newval = oldval,
		getter = function () {
			return newval;
		},
		setter = function (val) {
			oldval = newval;
			return newval = handler.call (this, prop, oldval, val);
		};
		if (delete this[prop]) {
			Object.defineProperty (this, prop, {
				  get: getter,
				  set: setter,
				  enumerable: true,
				  configurable: true
			});
		}
	}
});

Object.defineProperty (Object.prototype, "unwatch", {
	enumerable: false,
	configurable: true,
	writable: false,
	value: function (prop) {
		var val = this[prop];
		delete this[prop];
		this[prop] = val;
	}
});

var _node = (typeof module !== "undefined" && module.exports);

if (_node) {
	var path = require ("path");
	var LocalStorage = require ("node-localstorage").LocalStorage;
	localStorage = new LocalStorage (path.join (path.dirname (module.parent.filename), "localStorage-" + module.parent.filename));
}

cabinet = {
	_load: function () {
		if (_node) {
			this.node = {new: true}
		} else {
			this.site = {new: true};
			this.page = {new: true};
		}
		var storage = localStorage.getItem ("cabinet");
		if (storage != null) {
			var o = JSON.parse (storage);
			this._pages = o.pages;
			this._globals = o.globals;
			if (_node) {
				this.new = false;
			} else {
				this.site.new = false;
			}
		} else {
			this._save ();
		}
		if (!_node) {
			this._path = window.location.pathname;
			if (!(this._path in this._pages)) {
				this._pages[this._path] = {};
			} else {
				this.page.new = false;
			}
		}
	},
	_save: function () {
		localStorage.setItem ("cabinet", JSON.stringify ({pages: this._pages, globals: this._globals}));
	},
	_pages: {},
	_globals: {},
	_path: "/",
	site: null,
	page: null,
	node: null,
	sync: function () {
		var o = null;
		if (_node || arguments[arguments.length - 1] == true) {
			o = this._globals;
		} else {
			o = this._pages[this._path];
		}
		for (var i = 0; i < arguments.length; i++) {
			var n = arguments[i];
			if (n) {
				var g;
				if (_node) {
					g = global;
				} else {
					g = window;
				}
				if (o[n] != undefined) {
					g[n] = o[n];
				} else {
					o[n] = g[n];
				};
			};
			this._save();
			g.watch (n, function (o, n, v1, v2) {
				if (n in o) {
					o[n] = v2;
					this._save();
				};
				return v2;
			}.bind (this, o));
		}
	},
	wipe: function (g) {
		if (_node || g == true) {
			this._pages = {};
			this._globals = {};
			this.site.new = true;
			this.page.new = true;
			localStorage.removeItem ("cabinet");
		} else {
			delete this._pages[this._path];
			this._save ();
		}
	}
};

cabinet._load();
if (_node) {
	module.exports = cabinet;
}
