"use strict"; var $ = jQuery;
module.exports = function(){
	var appShare = require('../app/app-share.js');
	var isPoorBrowser = $('html').hasClass('poor-browser');
	var fadeTime = 4000;
	var moveTime = 12000;
	var st0 = {scale: 1};
	var st1 = {scale: 1.1};
	var rules = [
		[st0, st1],
		[st1, st0]
	];
	var origins = [
		{or: 'left top', xr: 0, yr: 0},
		{or: 'left center', xr: 0, yr: 1},
		{or: 'right top', xr: 2, yr: 0},
		{or: 'right center', xr: 2, yr: 1}
	]
	var lastRule = rules.length -1;
	var lastOrigin = origins.length -1;
	var fadeEase = TWEEN.Easing.Quartic.InOut;//Power4.easeInOut;
	var moveEase = TWEEN.Easing.Linear.None;//Linear.easeNone;
	this.run = function($slides) {
		if(isPoorBrowser) return;
		var lastI = $slides.length - 1;
		show(lastI, true);
		function show(i, isFirstRun) {
			var slide = $slides.get(i);
			var $slide = $(slide);
			var cfg = $slide.data();
			var ri = Math.round(Math.random() * lastRule);
			var ori = Math.round(Math.random() * lastOrigin);
			var rule = rules[ri];
			cfg.ssScale = rule[0]['scale'];
			cfg.ssOrig = origins[ori];
			cfg.ssOpacity = (i === lastI && !isFirstRun) ? 0 : 1;
			if (i === lastI && !isFirstRun) {
				new TWEEN.Tween(cfg)
					.to({ssOpacity: 1}, fadeTime)
					.easing(fadeEase)
					.onComplete(function(){
						$slides.each(function(){
							$(this).data().ssOpacity = 1;
						});
					})
					.start();
			}
			new TWEEN.Tween(cfg)
				.to({ssScale: rule[1]['scale']}, moveTime)
				.easing(moveEase)
				.start();
			if (i > 0) {
				new TWEEN.Tween({ssOpacity: 1})
					.to({ssOpacity: 0}, fadeTime)
					.onUpdate(function(){
						cfg.ssOpacity = this.ssOpacity;
					})
					.easing(fadeEase)
					.delay(moveTime - fadeTime)
					.onStart(function(){
						show(i - 1);
					})
					.start();
			}else{
				new TWEEN.Tween(cfg)
					.to({}, 0)
					.easing(fadeEase)
					.delay(moveTime - fadeTime)
					.onStart(function(){
						show(lastI);
					})
					.start();
			}
		}
	};
};