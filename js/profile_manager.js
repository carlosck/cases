document.profile_manager={
		
	constructor(_main){
		this.main= _main;
		
		this.cacheElements();
		this.binding();
		this.init();		

		document.form_create_manager.constructor();
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
		
		this.$ingresar_btn = $(".login_ingresar_button",this.$container);
		this.$recuperar_btn = $(".login_recuperar_button",this.$container);
		this.$register_btn = $(".login_register_button",this.$container);
		this.$login_btn = $(".go_login_button",this.$container);
		
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
			if(obj_json.user=='none')
			{
				this.$login_section.addClass('section_profile--selected');

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
		console.log('showLogin');
		$('.section_profile',this.container).removeClass('section_profile--selected');
		this.$login_section.addClass('section_profile--selected');
		console.log('this.$login_section',this.$login_section);
	},	
};