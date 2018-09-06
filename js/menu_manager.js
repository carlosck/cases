document.menu_manager={
		
	constructor(_main){		
		this.main= _main;
		console.log(_main);
		this.cacheElements();		
		this.bind();
		this.init();
	},
	cacheElements(){
		this.$container = $('.main_menu');
		this.$btn_home = $('.main_logo',this.$container);	
	},
	bind(){		
		var that = this;
		this.$btn_home.on('click',function(event){
			event.preventDefault();
			this.gotoSection('home'); 
		}.bind(this));

		this.$container.on('click','.main_menu_btn',function(event){
			event.preventDefault();
			let section = $(event.currentTarget).data('section');
			this.gotoSection(section);
		}.bind(this));

	},
	init(){
		
		
	},
	gotoSection(section){		
		this.main.gotoSection(section);
	}
}