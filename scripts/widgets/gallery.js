"use strict"; var $ = jQuery;
module.exports = function(onBodyHeightResize, widgets, unwidgets){
	var tools = require('../tools/tools.js');
	var OverlayWindow = require('./overlay-window.js');
	var $topNav = $('#top-nav');
	$('.gallery').each(function(i){
		var $gallery = $(this);
		var $overlay = $($gallery.data('overlay'));
		var overlayWindow = new OverlayWindow($overlay, widgets, unwidgets);
		var $overlayNext = $overlay.find('.next');
		var $overlayPrevios = $overlay.find('.previos');
		var $overlayClose = $overlay.find('.cross');
		var isFilter = false;
		var defaultGroup = $gallery.data('default-group') ? $gallery.data('default-group') : 'all';
		var isNonFirstLayout = false;
		if(!defaultGroup) defaultGroup = 'all';
		var $grid = $gallery.find('.grid')
			.shuffle({
				group: defaultGroup,
				speed: 500
			})
			.on('filter.shuffle', function() {
				isFilter = true;
			})
			.on('layout.shuffle', function() {
				if(isNonFirstLayout){
					onBodyHeightResize(true);
				}else{
					onBodyHeightResize();
					isNonFirstLayout = true;
				}
			})
			.on('filtered.shuffle', function() {
				if(isFilter){
					isFilter = false;
				}
			});
		var $btns = $gallery.find('.filter a');
		var $itemView = $gallery.find('.item-view');
		var $all = $gallery.find('.filter a[data-group=all]');
		var $items = $grid.find('.item');
		var currentGroup = defaultGroup;
		var $currentItem;
		$gallery.find('.filter a[data-group='+defaultGroup+']').addClass('active');
		$items.addClass('on');
		$overlayClose.click(function(e){
			$currentItem = false;
		});
		$btns.click(function(e){
			e.preventDefault();
			if(isFilter) return;
			var $this = $(this);
			var isActive = $this.hasClass( 'active' );
			var	group = isActive ? 'all' : $this.data('group');
			if(currentGroup !== group){
				currentGroup = group;
				$btns.removeClass('active');
				if(!isActive){
					$this.addClass('active');
				}else{
					$all.addClass('active');
				}
				$grid.shuffle( 'shuffle', group );
				$items.each(function(){
					var $i = $(this);
					var filter = eval($i.data('groups'));
					if( group == 'all' || $.inArray(group, filter)!=-1 ){
						$i.addClass('on');
					}else{
						$i.removeClass('on');
					}
				});
			}
		});
		$items.click(function(e){
			e.preventDefault();
			openItem($(this));
		});
		function openItem($item){
			$currentItem = $item;
			var url = $item.children('a')[0].hash.replace('#!','');
			overlayWindow.show(url +' .item-content');
		}
		$overlayNext.click(function(e){
			if(!$currentItem){
				return;
			}
			e.preventDefault();
			var $i = $currentItem.nextAll('.on').first();
			if($i.length<1){
				$i = $items.filter('.on').first();
			}
			openItem($i);
		});
		$overlayPrevios.click(function(e){
			if(!$currentItem){
				return;
			}
			e.preventDefault();
			var $i = $currentItem.prevAll('.on').first();
			if($i.length<1){
				$i = $items.filter('.on').last();
			}
			openItem($i);
		});
	});
};