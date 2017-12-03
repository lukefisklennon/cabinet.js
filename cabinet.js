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
	localStorage = new LocalStorage (path.join (path.dirname (module.parent.filename), "cabinet"));
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
			this._variables = o.variables;
			this._globals = o.globals;
			this._pages = o.pages;
			if (_node) {
				this.node.new = false;
			} else {
				this.site.new = false;
			}
		} else {
			this._save ();
		}
		if (_node) {
			this._path = "/";
		} else {
			this._path = window.location.pathname;
		}
		if (this._pages.indexOf (this._path) < 0) {
			this._pages.push (this._path);
			this._variables[this._path] = {};
		} else {
			if (!_node) {
				this.page.new = false;
			}
		}
	},
	_save: function () {
		localStorage.setItem ("cabinet", JSON.stringify ({pages: this._pages, variables: this._variables, globals: this._globals}));
	},
	_variables: {},
	_globals: {},
	_pages: [],
	_path: "/",
	site: null,
	page: null,
	node: null,
	sync: function () {
		var o = null;
		if (arguments[arguments.length - 1] == true) {
			o = this._globals;
		} else {
			o = this._variables[this._path];
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
	wipe: function () {
		this._variables = {};
		this._globals = {};
		this.site.new = true;
		this.page.new = true;
		localStorage.removeItem ("cabinet");
	}
};

cabinet._load();
if (_node) {
	module.exports = cabinet;
}
