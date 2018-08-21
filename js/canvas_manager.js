document.canvas_manager={
		
	constructor(_main){
		this.main= _main;
		this.cacheElements();
		this.init();
	},
	cacheElements(){
		this.$container = $(".crear_main_canvas_container",this.$container);
		this.$canvas = $("#crear_main_canvas");	
	},
	init(){
		var that = this;

		this.$canvas.droppable(
		{
			accept: ".crear_item_image",
			classes: {
			"ui-droppable-active": "ui-state-active",
			"ui-droppable-hover": "ui-state-hover"
			},
			drop: function( event, ui ) {
				console.log(ui);
				var src= ui.draggable[0].src;
				
				//that.$canvas.empty();
				that.$canvas.append('<div class="img_resizer"><img src="'+src+'" /></div>')
				$( ".img_resizer img" ).resizable({
					containment: ".crear_main_canvas_container",
					aspectRatio: true,
					autoHide: false
				});
				$( ".img_resizer" ).draggable({ containment: ".crear_main_canvas_container", scroll: false });
			}
		});
	}
};