"use strict"; var $ = jQuery;
module.exports = function($context) {
	var loading = require('./loading.js');
	var $gateLoader = $('.gate .loader');
	$context.find('.ajax-form').each(function() {
		var $frm = $(this);
		$frm.submit(function(e) {
			if($frm.find('.help-block ul').length < 1){
				$gateLoader.addClass('show');
				loading.gate(function() {
					var message = function(msg) {
						$('<div class="ajax-form-alert alert heading fade in text-center">	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button> ' + msg + '</div>')
								.addClass($frm.data('message-class')).appendTo('body');
						loading.ungate();
						$gateLoader.removeClass('show');
					};
					$.ajax({
						type: $frm.attr('method'),
						url: $frm.attr('action'),
						data: $frm.serialize(),
						success: function(data) {
							$frm[0].reset();
							message(data);
						},
						error: function(xhr, str) {
							message('Error: ' + xhr.responseCode);
						}
					});
				});
				e.preventDefault();
			}
		});
	});
};

