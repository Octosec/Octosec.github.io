"use strict"; var $ = jQuery;
module.exports = function($context, script){
	var isPoorBrowser = $('html').hasClass('poor-browser');
	if(isPoorBrowser) return;
	$context.find('.counter .count').each(function(){
		var $this = $(this);
		var count = parseInt($this.text());
		var cnt = {n: 0}
		var tw = new TWEEN.Tween(cnt)
			.to({n: count}, 1000)
			.onUpdate(function(){
				$this.text(Math.round(this.n));
			})
			.easing(TWEEN.Easing.Quartic.InOut);
		var pause = function(){
			tw.stop();
		}
		var resume = function(){
			cnt.n = 0;
			tw.start();
		}
		var start = resume;
		script.players.addPlayer($this, start, pause, resume);
	});
};