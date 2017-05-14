"use strict"; var $ = jQuery;
module.exports = function($context, script){
	var isPoorBrowser = $('html').hasClass('poor-browser');
	$context.find('.skillbar').each(function(){
		var $this = $(this)
		var $bar = $this.find('.skillbar-bar');
		var perc =  parseInt($this.attr('data-percent').replace('%',''));
		if(isPoorBrowser){
			$bar.css({width: perc+'%'});
		}else{
			var w = {width: 0}
			var tw = new TWEEN.Tween(w)
				.to({width: perc}, 1000)
				.onUpdate(function(){
					$bar.css({width: this.width+'%'});
				})
				.easing(TWEEN.Easing.Quartic.Out);
			var pause = function(){
				tw.stop();
			};
			var resume = function(){
				w.width = 0;
				tw.start();
			};
			var start = resume;
			script.players.addPlayer($this, start, pause, resume);
		}
	});
};