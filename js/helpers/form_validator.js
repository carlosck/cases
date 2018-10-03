document.form_validator={
		
	constructor(){				
	},
	getErrors(_form_container){
		let areErrors = false;
		console.log('_form_container',_form_container[0]);
		$('.validator_text',_form_container[0]).each(function(index,item){
			let min_length = $(item).data('validator-len');
			if($(item).val().length<min_length)
			{
				$(item).parent().addClass('validator-error');
				areErrors = true;
				console.log('error en ',$(item));
			}
			else{
				$(item).parent().removeClass('validator-error');
			}
		}.bind(this));

		$('.validator_mail',_form_container[0]).each(function(index,item){
			if( /(.+)@(.+){2,}\.(.+){2,}/.test($(item).val()) ){
			  // valid email
			  $(item).parent().removeClass('validator-error');
			} else {
				// invalid email
			 	$(item).parent().addClass('validator-error');
				areErrors = true;
				console.log('error en ',$(item));
			}
		}.bind(this));

		$('.validator_pass',_form_container[0]).each(function(index,item){
			
			if($(item).val().length<6)
			{
				$(item).parent().addClass('validator-error');
				areErrors = true;
				console.log('error en ',$(item));
			}
			else{
				$(item).parent().removeClass('validator-error');
			}
		}.bind(this));

		$('.validator_select',_form_container).each(function(index,item){
			console.log('select',$(item).val());
			if($(item).val()===-1)
			{
				$(item).parent().addClass('validator-error');
				areErrors = true;
				console.log('error en ',$(item));
			}
			else{
				$(item).parent().removeClass('validator-error');
			}
		}.bind(this));

		console.log('areErrors',areErrors);
		return areErrors;
	}	
};