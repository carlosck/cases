document.canvas_manager={
		
	constructor(_main){
		this.main= _main;
		console.log('this.main',this.main);
		this.cacheElements();
		this.binding();
		this.init();
		this.count=0;

		document.form_create_manager.constructor();
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
				var con = that.count;
				$( '.img_resizer.item_'+that.count+' img' ).resizable({
					containment: ".crear_main_canvas_container",
					aspectRatio: true,
					stop: function( event, ui ) {					
						$(ui.element.parent()).width(ui.size.width);
						$(ui.element.parent()).height(ui.size.height);
						//$( '.img_resizer.item_'+that.count ).width= 
					}
				});
				$( '.img_resizer.item_'+that.count ).rotatable({wheelRotate:false});
				$( ".img_resizer.item_"+that.count ).draggable({ containment: ".crear_main_canvas_container", scroll: false });
				that.count++;
			}
		});
	},
	saveCanvas(){
		var elements=[];
		var width = 
		$('.img_resizer',this.$canvas).each(function(index,element){
			var img = $('img',element );
			
			var position= $(element).position();
			var width= img.width();
			var height= img.height();
			var angle = $(element).data('uiRotatable').elementStopAngle;
			var src= img.attr('src');
			var obj = {
				position,
				angle,
				width,
				height,
				src,
			};
			elements.push(obj);			

		});

		var img_base = {
			width: this.$canvas.width(),
			height: this.$canvas.height()
		};
		var form_data = document.form_create_manager.getData();
		console.log("form_data",form_data);
		
		$.ajax({
			method: "GET",
			url: "service/create_img.php",
			dataType: "json",
			data: { images: elements, base: img_base,form_data: form_data }
		})
		.done(function( obj_json ) {			
			this.main.gotoCart();
		}.bind(this));
		
	},
	restartCanvas(){
		this.$canvas.empty();
		this.count=0;	
	}
};