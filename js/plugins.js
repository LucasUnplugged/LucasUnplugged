// Avoid 'console' errors in browsers that lack a console
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// jQUERY WRAPPER: Place any jQuery/helper plugins in here
(function($){
	// Ensure that text that needs to be resized as part of the responsive design is resized
//	$("article h1").fitText(1.9);
//	$("article header blockquote").fitText(2.6);
	$(document).ready(function(){
		// Resize videos
		$(".content").fitVids();
	})
})(jQuery);