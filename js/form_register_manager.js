document.form_register_manager={
		
	constructor(_parent){
		this.main= _parent;

		this.cacheElements();
		this.bind();		
	},
	cacheElements(){
		this.$container = $("#profile_register_form");
		this.$register_mail = $("#profile_register_mail",this.$container);
		this.$register_pass = $("#profile_register_pass",this.$container);
		this.$register_repass = $("#profile_register_repass",this.$container);
		this.$profile_register_names = $("#profile_register_names",this.$container);
		
		this.$register_apellidos = $("#profile_register_apellidos",this.$container);
		this.$register_mobilephone = $("#profile_register_mobilephone",this.$container);
		this.$register_calle = $("#profile_register_calle",this.$container);
		this.$register_numerocasa = $("#profile_register_numerocasa",this.$container);
		this.$register_colonia = $("#profile_register_colonia",this.$container);
		this.$register_cp = $("#profile_register_cp",this.$container);
		this.$register_ciudad = $("#profile_register_ciudad",this.$container);
		this.$register_estado = $("#profile_register_estado",this.$container);				
		this.$register_send_button= $(".profile_register_button",this.$container);
	},
	bind(){
		this.$register_send_button.on('click',function(event){
			event.preventDefault();			
			this.getErrors();			
		}.bind(this));
	},
	getErrors(){
		let errors = document.form_validator.getErrors(this.$container);
		if(errors){
			this.$container.removeClass('error');
			this.$register_send_button.addClass('retry');
			this.$container.addClass('error');
		}
		else{
			this.$register_send_button.addClass('loading');

			this.sendForm();		
		}
		
	},
	sendForm(){
		var form_data = this.getData();		
		
		$.ajax({
			method: "GET",
			url: "service/register.php",
			dataType: "json",
			data: form_data
		})
		.done(function( obj_json ) {			
			this.main.gotoProfile();
		}.bind(this));
	},
	getData(){
		return {			
			mail: this.$register_mail.val(),
			pass: this.$register_pass.val(),
			repass: this.$register_repass.val(),
			names: this.$profile_register_names.val(),
			apellidos: this.$register_apellidos.val(),
			mobilephone: this.$register_mobilephone.val(),
			calle: this.$register_calle.val(),
			numerocasa: this.$register_numerocasa.val(),
			colonia: this.$register_colonia.val(),
			cp: this.$register_cp.val(),
			ciudad: this.$register_ciudad.val(),
			estado: this.$register_estado.val(),
			
		};
	},
};