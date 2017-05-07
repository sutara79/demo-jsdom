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

// Problem: Can't get height except for window.innerHeight
console.log(
  $('#foo').text() +
  '\nwin: ' + window.innerHeight +
  '\ndoc: ' + document.documentElement.clientHeight +
  '\njq : ' + $(window).height()
);