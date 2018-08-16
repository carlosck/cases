document.canvas_manager={
		
	constructor(_main){
		this.main= _main;
		this.cacheElements();
		this.init();
	},
	cacheElements(){
		this.$container = $(".crear_main_canvas_container",this.$container);
		this.$canvas = $(".crear_main_canvas",this.$container);	
	},
	init(){
		this.$canvas.droppable(
		{
			accept: ".crear_item_image",
			classes: {
			"ui-droppable-active": "ui-state-active",
			"ui-droppable-hover": "ui-state-hover"
			},
			drop: function( event, ui ) {
				console.log(ui);
			}
		});
	}
};