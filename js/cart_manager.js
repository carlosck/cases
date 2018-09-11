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
		this.$cart_items_empty = $('.cart_items_empty',this.$container);	
		this.$cart_items_template = $('#cart-item-template');
		
		this.$btn_crear = $('.cart_empty_button',this.$container);
		this.$resume_create_button = $('.cart_resume_create_button',this.$container);
		this.$input_total = $('#cart_input_total',this.$container);

	},
	bind(){
		this.$btn_crear.on('click',function(event){
			event.preventDefault();			
			this.main.gotoCrear();
		}.bind(this))

		this.$resume_create_button.on('click',function(event){
			event.preventDefault();			
			this.main.gotoCrear();
		}.bind(this))

		this.$cart_items_container.on('change','.c-cart_item_quantity input',function(event){			
			this.recalc();
		}.bind(this));

		this.$cart_items_container.on('click','.c-cart_item_remove_button',function(event){			
			event.preventDefault();
			var uid= $(event.currentTarget).parent().parent().parent().data('uid');			
			this.removeItem(uid);
		}.bind(this));	

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
	removeItem(uid){

		$.ajax({
			method: "GET",
			url: "service/drop_cart_item.php",
			dataType: "json",
			data: { uid: uid }			
		})
		.done(function( obj_json ) {
			console.log( "Data loaded: " , obj_json );			
			$('#car_item_'+uid,this.$cart_items_container).remove();
			this.recalc();
		}.bind(this));

		
	},
	recalc(){
		var total = 0;
		console.log($('.c-cart_item',this.$cart_items_container));
		if($('.c-cart_item',this.$cart_items_container).length==0){

		}		
		$('.c-cart_item',this.$cart_items_container).each(function(index,element){
			var price= $(element).data('price');
			var quantity = 	$(element).find('.c-cart_item_quantity input').val();
			
			total+=	price* quantity;		

		}.bind(this));
		this.$input_total.val(total);

	},
	showItems(items)
	{
				
		var source   = this.$cart_items_template[0].innerHTML;
		console.log(source);
		var template = Handlebars.compile(source);

		this.$cart_items_container.html("");
		console.log(items);
		var total = 0;
		if(items.length>0)
		{
			for(var i = 0; i<items.length;i++){				
				var item = items[i];
				var html    = template(item);				
				this.$cart_items_container.append(html);
				total+=item.price;
			}
			this.$input_total.val(total);
			this.$loading.removeClass(this.classSelected);	
			this.$cart_items_empty.removeClass(this.classSelected);	
			this.$cart_items_stage.addClass(this.classSelected);	
		}
		else{
			this.$loading.removeClass(this.classSelected);	
			this.$cart_items_stage.removeClass(this.classSelected);
			this.$cart_items_empty.addClass(this.classSelected);	
		}

		
		
	}

}