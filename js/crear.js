document.crear={
		
	constructor(_main){		
		this.main= _main;
		
		this.elements= {};
		this.classMenuBase="crear_gallery_menu_item";
		this.classMenuSelected = this.classMenuBase+"--active";
		this.classSectionBase  = "crear_gallery_section";
		this.classSectionSelected = this.classSectionBase+"--active";
		this.busy= false;

		
		this.cacheElements();		
		this.bind();
		this.init();
	},
	cacheElements(){
		this.$container = $('#section_crear');
		this.$menu_container = $('.crear_gallery_menu_container',this.$container);
		this.$section_container = $('.crear_gallery_section_container',this.$container);
	},
	bind(){
		var that = this;
		this.$menu_container.on('click','.crear_gallery_menu_item',function(event){
			event.preventDefault();			
			if($(event.currentTarget).hasClass(this.classMenuSelected)) return false;
			var section = $(event.currentTarget).data('section');			
			that.showSection(section,that); 
		})
	},
	init(){

	},
	showSection(_section,that){
		
		$("."+this.classMenuSelected,this.$menu_container).removeClass(this.classMenuSelected);
		$("."+this.classMenuBase+"__"+_section,this.$menu_container).addClass(this.classMenuSelected);

		$("."+this.classSectionSelected,this.$section_container).removeClass(this.classSectionSelected);
		$("."+this.classSectionBase+"__"+_section,this.$section_container).addClass(this.classSectionSelected);

	}
}