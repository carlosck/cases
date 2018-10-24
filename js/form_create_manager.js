document.form_create_manager={
		
	constructor(_canvas_manager){
		this.canvas_manger= _canvas_manager;
		this.cacheElements();
		this.loadBrands();
	},
	cacheElements(){
		this.$container = $(".crear_form_container");
		this.$brand_select = $("#crear_brand",this.$container);
		this.$model_select = $("#crear_model",this.$container);
		this.$type_select = $("#crear_type",this.$container);
		
	},
	getData(){
		return {
			brand:this.$brand_select.val(),
			model:this.$model_select.val(),
			type:this.$type_select.val()
		};
	},
	loadBrands(){
		$.ajax({
			method: "GET",
			url: "service/load_brands.php",
			dataType: "json"			
		})
		.done(function( obj_json ) {			
			if(obj_json.action=='done'){
				this.showBrands(obj_json.items);
				this.$container.data('items',obj_json.items);
			}
									
		}.bind(this));
	},
	showBrands(_items){
		
		this.$brand_select.find('option')
			.remove()
			.end()
			.append('<option value="-1">Marca</option>')
			.val('-1')
		for(let  itemKey in _items){
			var item = _items[itemKey];
			var option = new Option(item.name, itemKey); 
			$(option).data('items',item.items)
			this.$brand_select.append($(option));
		}
	}
};