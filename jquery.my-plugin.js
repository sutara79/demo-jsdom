(function (factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window, document);
  } else {
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {
  $.fn.myPlugin = function() {
    return this.each(function() {
      $(this).text(
        '\nwin: ' + window.innerHeight +
        '\ndoc: ' + document.documentElement.clientHeight +
        '\njq : ' + $(window).height()
      );
    });
  };
}));