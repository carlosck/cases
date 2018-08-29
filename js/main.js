var rw={
		
	constructor(){		
		
		this.classSectionActive = "section_active";
		this.cacheElements();		
		this.bind();
		this.init();		
	},

	cacheElements(){
		this.$section_home = $('#main_slide');
		this.$section_crear = $('#section_crear');
		this.$section_car = $('#section_car');
		
		this.$btg_goto_crear = $('.header_slide_button',this.$section_home);


		return this;
	},
	bind(){
		
		var that= this;
		this.$btg_goto_crear.on('click',function(event){
			event.preventDefault();
			console.log('click');
			that.gotoCrear();
		}.bind(this))
	},
	
	init(){
		
	document.headerSlide.constructor($,this);
	document.crear.constructor($,this);
		
	},
	gotoCrear(){
		this.$section_home.removeClass(this.classSectionActive);
		this.$section_crear.addClass(this.classSectionActive);
	},
	gotoCart(){

	}
	
}

var $;
jQuery(document).ready(function(_$) {
    $=_$;
    rw.constructor($);
});

