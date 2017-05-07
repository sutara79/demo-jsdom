const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<!DOCTYPE html>');
const $ = require('jquery')(window);

$('<div id="foo">FOO</div>').appendTo('body');
console.log($('#foo').text());