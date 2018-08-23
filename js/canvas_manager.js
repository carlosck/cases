document.canvas_manager={
		
	constructor(_main){
		this.main= _main;
		this.cacheElements();
		this.binding();
		this.init();
		this.count=0;
	},
	cacheElements(){
		this.$container = $(".crear_main_canvas_container",this.$container);
		this.$canvas = $("#crear_main_canvas");	
		this.$restart = $("#crear_main_tools_restart");
		this.$save = $("#crear_main_menufooter_buy");
		console.log(this.$restart);
	},
	binding(){
		var that = this;
		this.$restart.on('click',function(event){
			event.preventDefault();
			that.restartCanvas();
		});
		this.$save.on('click',function(event){
			event.preventDefault();
			that.saveCanvas();
		});
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
				var src= ui.draggable[0].src;
								
				that.$canvas.append('<div class="img_resizer item_'+that.count+'"><img src="'+src+'" /></div>')
				$( '.img_resizer.item_'+that.count+' img' ).resizable({
					containment: ".crear_main_canvas_container",
					aspectRatio: true,
					autoHide: false
				});
				$( '.img_resizer.item_'+that.count ).rotatable();
				$( ".img_resizer.item_"+that.count ).draggable({ containment: ".crear_main_canvas_container", scroll: false });
				that.count++;
			}
		});
	},
	saveCanvas(){
		var elements=[];
		$('.img_resizer',this.$canvas).each(function(index,element){
			elements.push(element);
		});
		console.log(elements);
	},
	restartCanvas(){
		this.$canvas.empty();
		this.count=0;	
	}
};