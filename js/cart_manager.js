document.cart_manager={
		
	constructor(_main){		
		this.main= _main;
		this.classBase="cart_section";
		this.classSelected = this.classBase+"--active";		
		this.cacheElements();		
		this.bind();
		this.init();
	},
	cacheElements(){
		this.$container = $('#section_cart');
		this.$loading = $('.cart_loading',this.$container);	
		this.$cart_items_stage = $('.cart_items_stage',this.$container);	
		this.$cart_items_container = $('.cart_items_container',this.$container);	
		this.$cart_items_template = $('#cart-item-template');

	},
	bind(){
		

	},
	init(){
		
		
	},
	initData(){
		$(this.$loading).addClass(this.classSelected);	
		$(this.$cart_items_stage).removeClass(this.classSelected);
		this.loadData();
	},
	loadData(){
		$.ajax({
			method: "GET",
			url: "service/load_cart.php",
			dataType: "json"			
		})
		.done(function( obj_json ) {
			console.log( "Data loaded: " , obj_json );			
			this.showItems(obj_json.items);
		}.bind(this));
	},
	showItems(items)
	{
				
		var source   = this.$cart_items_template[0].innerHTML;
		console.log(source);
		var template = Handlebars.compile(source);

		this.$cart_items_container.html("");
		console.log(items);
		if(items.length>0)
		{
			for(var i = 0; i<items.length;i++){
				console.log(items[i]);
				var html    = template(items[i]);				
				this.$cart_items_container.append(html);
			}	
		}

		this.$loading.removeClass(this.classSelected);	
		this.$cart_items_stage.addClass(this.classSelected);
		
	}

}