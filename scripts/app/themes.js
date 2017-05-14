"use strict";
module.exports = new (function(){
	var me = this;
	this.options = {
		'angie': {style: 'theme-angie', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'lynda': {style: 'theme-lynda', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'alice': {style: 'theme-alice', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'lucy': {style: 'theme-lucy', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'mary': {style: 'theme-alice', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'suzi': {style: 'theme-suzi', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'viki': {style: 'theme-viki', bgSync: ['**/*.txt', '**/*'], videoSync: []},
		'luiza': {style: 'theme-luiza', bgSync: ['**/*.txt', '**/*'], videoSync: []}
	};
	this.names = {
	};
	this.colors = 8;
	this.colorClasses = (function(){
		var res = '';
		for(var i=0; i<me.colors; i++){
			var sep = i === 0 ? '' : ' ';
			res += sep + 'colors-'+String.fromCharCode(65+i).toLowerCase();
		}
		return res;
	})();
})();