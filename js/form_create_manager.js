document.form_create_manager={
		
	constructor(_canvas_manager){
		this.canvas_manger= _canvas_manager;
		this.cacheElements();
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
};