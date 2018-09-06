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
		this.$section_cart = $('#section_cart');
		this.$section_profile = $('#section_profile');
		
		this.$btg_goto_crear = $('.header_slide_button',this.$section_home);
		this.$main_info_btn = $('.main_info_btn',this.$section_home);

		return this;
	},
	bind(){
		
		var that= this;
		this.$btg_goto_crear.on('click',function(event){
			event.preventDefault();			
			this.gotoCrear();
		}.bind(this))

		this.$main_info_btn.on('click',function(event){
			event.preventDefault();			
			this.gotoCrear();
		}.bind(this));	
	},
	
	init(){
		
	document.headerSlide.constructor(this);
	document.crear.constructor(this);
	document.menu_manager.constructor(this);	
	document.cart_manager.constructor(this);	
	},
	hideAllSection(){
		$('.section').removeClass(this.classSectionActive);
	},
	gotoHome(){
		this.hideAllSection();
		this.$section_home.addClass(this.classSectionActive);	
	},
	gotoCrear(){
		this.hideAllSection();
		this.$section_crear.addClass(this.classSectionActive);		
	},
	gotoCart(){
		this.hideAllSection();
		this.$section_cart.addClass(this.classSectionActive);
		document.cart_manager.initData();
	},
	gotoProfile(){
		this.hideAllSection();
		this.$section_profile.addClass(this.classSectionActive);
	},
	gotoSection(section){
		switch(section)
		{
			case 'home':
				this.gotoHome();
			break;
			case 'crear':
				this.gotoCrear();
			break;
			case 'cart':
				this.gotoCart();
			break;			
			case 'profile':
				this.gotoProfile();
			break;
		}
	}
	
}

var $;
jQuery(document).ready(function(_$) {
    $=_$;
    rw.constructor($);
});

