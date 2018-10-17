document.profile_manager={
		
	constructor(_main){
		this.main= _main;
		
		this.cacheElements();
		this.binding();
		this.init();		
		
		document.form_register_manager.constructor(this);
	},
	cacheElements(){
		//*/
		this.$container = $("#section_profile");
		this.$loader = $(".section_profile_loader",this.$container);
		this.$login_section = $(".section_profile_login",this.$container);
		this.$recuperar = $(".section_profile_recuperar",this.$container);
		this.$register = $(".section_profile_register",this.$container);
		this.$update = $(".section_profile_update",this.$container);
		this.$pedidos = $(".section_profile_pedidos",this.$container);
		this.$home = $(".section_profile_home",this.$container);
		
		this.$ingresar_btn = $(".login_ingresar_button",this.$container);
		this.$recuperar_btn = $(".login_recuperar_button",this.$container);
		this.$register_btn = $(".login_register_button",this.$container);
		this.$login_btn = $(".go_login_button",this.$container);
		this.$register_send_btn = $(".profile_register_button",this.$container);
		
		//*/
	},
	binding(){
		//*/
		var that = this;		

		this.$register_btn.on('click',function(event){
			event.preventDefault();
			that.showRegister();
		});

		this.$recuperar_btn.on('click',function(event){
			event.preventDefault();
			that.showRecuperar();
		});

		this.$update.on('click',function(event){
			event.preventDefault();
			that.showRecuperar();
		});

		this.$login_btn.on('click',function(event){
			event.preventDefault();
			that.showLogin();
		});		
		
		//*/
	},
	init(){
		var that = this;
		this.loadProfile();
		
	},
	loadProfile(){
		
		$.ajax({
			method: "GET",
			url: "service/load_profile.php",
			dataType: "json"			
		})
		.done(function( obj_json ) {			
			console.log('obj_json',obj_json);
			this.$loader.removeClass('section_profile--selected');
			if(obj_json.user=='nologed')
			{
				this.$login_section.addClass('section_profile--selected');
			}
			else{
				if(obj_json.action=='loged'){
					this.main.profileLoaded(obj_json);	
					this.$home.addClass('section_profile--selected');
				}
				else{
					this.$login_section.addClass('section_profile--selected');
				}
			}
		}.bind(this));
		
		
	},
	showRegister(){
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$register.addClass('section_profile--selected');
	},
	showRecuperar(){
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$recuperar.addClass('section_profile--selected');
	},
	showUpdate(){
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$update.addClass('section_profile--selected');
	},
	showLogin(){
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$login_section.addClass('section_profile--selected');		
	},
	showPedidos(){
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$pedidos.addClass('section_profile--selected');	
	},
	setPedidos(_pedidos){
		console.log('document.profile_holder.isLoged',document.profile_holder.isLoged())
		if(document.profile_holder.isLoged()){
			
		}
		else{
			document.profile_holder.setWaitingForLogin(true);
			this.showPedidosItemsTemporal(_pedidos);			
		}
	},
	showPedidosItemsNoLoged(items)
	{
				
		var source   = this.$cart_items_template[0].innerHTML;		
		var template = Handlebars.compile(source);

		this.$cart_items_container.html("");		
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

		
		
	},	
};