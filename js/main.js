var rw={
		
	constructor(){		
		
		this.cacheElements();		
		this.bind();
		this.init();
	},

	cacheElements(){

		return this;
	},
	bind(){
		
		var that= this;
	},
	
	init(){
		
	document.headerSlide.constructor($,this);
		
	}
	
}

var $;
jQuery(document).ready(function(_$) {
    $=_$;
    rw.constructor($);
});

