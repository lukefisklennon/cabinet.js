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
			return newval = handler.call(this, prop, oldval, val);
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

var vault = {
	_load: function () {
		if (localStorage.vault) {
			var o = JSON.parse (localStorage.vault);
			this._variables = o.variables;
			this._globals = o.globals;
			this._pages = o.pages;
			this.newDomain = false;
		} else {
			localStorage.vault = JSON.stringify ({pages: [], variables: {}});
		}
		this._path = window.location.pathname;
		if (this._pages.indexOf (this._path) < 0) {
			this._pages.push (this._path);
			this._variables[this._path] = {};
		} else {
			this.newPage = false;
		}
	},
	_save: function () {
		localStorage.vault = JSON.stringify ({pages: this._pages, variables: this._variables, globals: this._globals});
	},
	_variables: {},
	_globals: {},
	_pages: [],
	_path: "/",
	newDomain: true,
	newPage: true,
	sync: function () {
		var o = null;
		if (arguments[arguments.length - 1] == true) {
			o = this._globals;
		} else {
			o = this._variables[this._path];
		}
		for (var i = 0; i < arguments.length; i++) {
			n = arguments[i];
			if (n) {
				if (o[n] != undefined) {
					window[n] = o[n];
				} else {
					o[n] = window[n];
				};
			};
			this._save();
			window.watch (n, function (o, n, v1, v2) {
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
		this.newDomain = true;
		this.newPage = true;
		delete localStorage.vault;
	}
};

vault._load();
