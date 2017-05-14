"use strict"; var $ = jQuery;
module.exports = function(scrolling, script){
	var $views = $('.view');
	var appShare = require('./app-share.js');
	var isPoorBrowser = $('html').hasClass('poor-browser');
	this.scroll = function(){
		if(isPoorBrowser) return;
		$views.each(function(i){
			var $view = $(this);
			var viewPos = scrolling.calcPosition($view);
			if(viewPos.visible){
				var viewOffset = viewPos.top - scrolling.windowTopPos;
				$view.children('.bg:not(.static)').each(function(){
					var cfg = $(this).data();
					cfg.parallaxY = appShare.parallaxMargin(script, i, viewOffset);
				});
			}
		});
	};
};