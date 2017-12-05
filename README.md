# Cabinet.js

Cabinet is a library which automatically keeps variables synced to storage in the browser or Node.js. You don't need to call any functions; global variables which you choose to sync are instantly saved to storage — without you having to do a thing.

```JavaScript
counter = 0; // Initial value
cabinet.sync("counter"); // Syncs to storage
counter++; // Variable is automatically saved
alert(counter + " visits"); // Displays counter
```

In this example, each time you reload the page, the counter will increment.

**NOTE** Cabinet is in beta, so many features may be unstable. But, you can help by contributing! Feel free to open an issue or pull request.

## Features

 - Automatically saves variables
 - Easily specify a default value
 - Requires little additional code
 - Available for the browser and Node.js

Additional features for the browser:
 - Detect if the user is visiting for the first time
 - Sync variables within the page or the whole site

## Installing

### Browser

Download `cabinet.min.js` via GitHub, and place it in your project directory. In your HTML file, add a link to the script in the `<head>` section:

```HTML
<script src="cabinet.min.js"></script>
```

The `cabinet` variable is global, so you can use it in any script. There is no set-up required within your own code.

**NOTE** You must link the script before any of your own code; otherwise, `cabinet` will be `undefined` for those scripts.

You can also link to the script hosted on GitHub:

```HTML
<script src="https://rawgit.com/iONinja/cabinet.js/master/cabinet.min.js"></script>
```

**NOTE** GitHub and RawGit cannot guarantee reliability and speed for a project in production. It is generally better to download and host the file yourself.

### Node.js

Run this command in a terminal:

```
npm install cabinet.js
```

In your code, import as follows:

```JavaScript
var cabinet = require("cabinet.js");

// Your code here
```

## Documentation

### sync()

```JavaScript
cabinet.sync(var1[, var2[, ...[, global]]])
```

 - `var1, var2, ...`

   Strings naming the variables to sync. These variables must be **global variables**, so they should be accessible from the `window` object (in the browser) or the `global` object (in Node.js). You can define these variables as you normally do; just leave off the `var` at the beginning. These variables will be automatically synced with `localStorage` (or written to the disk in Node.js), so you can simply modify these variables and they will be saved.
 - `global`

   This option is only available for the browser. If `true`, the variables will be synced globally — across all pages on the site. Otherwise, these variables will only be stored within this page, and other pages can have their own variables of the same name which won't affect these ones. The default is `false`.

### wipe()

```JavaScript
cabinet.wipe(global)
```

In Node.js, this method deletes all of cabinet's storage for this script.

 - `global`

   This option is only available for the browser. If `true`, all of cabinet's data in `localStorage` is deleted for the entire site. Otherwise, only data for this page is wiped. The default is `false`.

### site.new

```JavaScript
cabinet.site.new
```

A `boolean` specifying whether or not the user is new to this site. If the user visits another page within the site, this property will remain `false`. Only available in the browser.

### page.new

```JavaScript
cabinet.page.new
```

A `boolean` specifying whether or not the user is new to this page. This property is set to `true` for every page the user visits. Only available in the browser.

### new

```JavaScript
cabinet.new
```

A `boolean` specifying whether or not the Node.js server is running for the first time. Only available in Node.js.

# License

MIT License

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Acknowledgements

```
object.watch polyfill

2012-04-03

By Eli Grey, http://eligrey.com
Public Domain.
NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
```
