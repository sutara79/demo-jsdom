# demo-jsdom
My practice for using **[jsdom](https://github.com/tmpvar/jsdom)**


## How to use jQuery in jsdom
see https://github.com/tmpvar/jsdom/blob/master/README.md

###### demo1.js
```js
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html>');
const $ = require('jquery')(window);

$('<div id="foo">FOO</div>').appendTo('body');
console.log($('#foo').text());
```

```sh
$ node demo1.js
FOO
```

## How to use jQuery-plugin in jsdom
see https://github.com/tmpvar/jsdom/wiki/Don%27t-stuff-jsdom-globals-onto-the-Node-global

###### demo2.js
```js
const { JSDOM } = require('jsdom');
const fs = require('fs');

// Files to load in jsdom
let files = [
  fs.readFileSync('./node_modules/jquery/dist/jquery.min.js', { encoding: 'utf-8' }),
  fs.readFileSync('./jquery.my-plugin.js', { encoding: 'utf-8' })
];

// Create DOM
let window, document, $;
let createDom = function() {
  let dom = new JSDOM('<!DOCTYPE html>', { runScripts: 'dangerously' });
  window = dom.window;
  for (let i = 0; i < files.length; i++) {
    let scriptEl = window.document.createElement('script');
    scriptEl.textContent = files[i];
    window.document.body.appendChild(scriptEl);
  }
  document = window.document;
  $ = window.$;
};
createDom();

// Apply jQuery-plugin
$('<div id="foo">').appendTo('body');
$('#foo').myPlugin();
```

### Problem: Can't get height
###### demo2.js
```
console.log(
  '\nwin: ' + window.innerHeight +
  '\ndoc: ' + document.documentElement.clientHeight +
  '\njq : ' + $(window).height()
);
```

It is impossible to get height of the page execpt for `window.innerHeight`.

```
$ node demo2.js
win: 768
doc: 0
jq : 0
```

## Author
Yuusaku Miyazaki <toumin.m7@gmail.com>