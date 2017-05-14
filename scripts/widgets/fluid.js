"use strict"; var $ = jQuery;
module.exports = new (function(){
	this.setup = function($context){
		$context.find('.fluid *').each(function() {
			var $el = $(this);
			var $wrap = $el.parent('.fluid');
			var newWidth = $wrap.width();
			var ar = $el.attr('data-aspect-ratio');
			if(!ar){
				ar = this.height / this.width;
				$el
					// jQuery .data does not work on object/embed elements
					.attr('data-aspect-ratio', ar)
					.removeAttr('height')
					.removeAttr('width');
			}
			var newHeight = Math.round(newWidth * ar);
			$el.width(Math.round(newWidth)).height(newHeight);
			$wrap.height(newHeight);
		});
	};
})();