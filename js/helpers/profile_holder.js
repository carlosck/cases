document.profile_holder={
		
	constructor(_main){
		this.main= _main;
		this.isWaitingForLogin=false;
		this.profile= null;
	},
	setProfile(_profile){
		this.profile = _profile;
	},
	isLoged(){
		return this.profile!= null
	},
	setWaitingForLogin(_waiting)
	{
		this.isWaitingForLogin= _waiting;
	}

}