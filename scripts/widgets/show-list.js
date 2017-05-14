"use strict"; var $ = jQuery;
module.exports = function($context, script){
	$context.find('.show-list').each(function(){
		$(this).wrapInner('<div class="wrapper"></div>').textillate({
			loop:true,
			in:{effect:'fadeInRight', reverse:true},
			out:{effect:'fadeOutLeft', sequence:true},
			selector:'.wrapper'
		});
	});
};