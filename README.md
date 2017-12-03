# Cellar.js

Cellar is a library which automatically keeps variables synced to storage in the browser. You don't need to call any functions, global variables which you choose to sync are instantly saved to storage — without you having to do a thing.

```JavaScript
counter = 0; // Initial value
vault.sync("counter"); // Syncs to storage
counter++; // Variable is automatically saved
alert(counter + " visits"); // Displays counter
```

In this example, each time you reload the page, the counter will increment.

## Features

 - Automatically saves variable
 - Easily specify a default value
 - Requires little additional code
 - Detect if the user is visiting for the first time
 - Sync variables within the page or the whole site

## Documentation
### sync()

```JavaScript
cellar.sync(var1[, var2[, ...[, global]]])
```

 - `var1, var2, ...`

   Strings naming the variables to sync. These variables must be **global variables**, so they should be accessible from the `window` object. You can define these variables as normal, just leave off the `var` at the beginning. These variables will be automatically synced with `localStorage`, so you can simply modify these variables and they will be saved.
 - `global`

   If `true`, the variables will be synced globally — across all pages on the site. Otherwise, these variables will only be stored within this page, and other pages can have their own variables of the same name which won't affect these ones. The default is `false`.

### wipe()

```JavaScript
cellar.wipe()
```

Wipes cellar's data in `localStorage`, resetting everything across the entire site.

**NOTE** This currently only works globally; the ability to wipe the local page will be added soon.

### newDomain

```JavaScript
cellar.newDomain
```

A `boolean` specifying whether or not the user is new to this site. If the user visits another page within the site, this property will remain `false`.

### newSite

```JavaScript
cellar.newSite
```

A `boolean` specifying whether or not the user is new to this page. This property is set to `true` for every page the user visits.

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
