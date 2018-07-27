var rw={
		
	constructor(){		
		this.answers=[false,false,false,false,false];
		this.elements= {};
		this.currentSlide=0;
		this.prevSlide=0;
		this.slideCount =3;
		this.busy= false;
		this.timer = null;
		this.onAuto = true;
		this.timeBetweenAnimations= 2000;
		this.cacheElements();		
		this.bind();
		this.init();
		
	},

	cacheElements(){
		
		this.$container= $(".header_slide_container");
		this.$nav_left= $(".slider_nav_left",this.$container);
		this.$nav_right= $(".slider_nav_right",this.$container);
		this.$slider_container= $(".slider_mask",this.$container);
		this.$board_left= $(".board_left",this.$container);
		
		return this;
	},
	bind(){
		
		var that= this;
		
		var hammertime = new Hammer($("#header_slide")[0]);
		hammertime.on('swipeleft', function(ev) {
			that.goLeft();
		});
		hammertime.on('swiperight', function(ev) {
			that.goRight();
		});

		
		// $(".slider_nav_right").on("click touchstart",function(event){
		// 	event.preventDefault();
		// 	that.goRight();
		// });
		// $(".slider_nav_left").on("click touchstart",function(event){
		// 	event.preventDefault();
		// 	that.goLeft();
		// });
		
		
	},
	init(){
		
		screen_size = $( window ).width();
		media_size = '.';
		// if(screen_size<=768)
		// {
		// 	media_size= '-768x276.';
		// }
		// else{
		// 	if(screen_size>768 && screen_size<=1024)
		// 	{
		// 		media_size= '-1024x369.';
		// 	}
			
		// }

		// var that= this;
		//  imageArray= [];
		// $('.lazy_load').each(function( index ){
		//   var src= $(this).data('dirname')+'/'+$(this).data('filename')+''+media_size+$(this).data('extension');
		//   imageArray.push({link:src,objeto:$(this)});		  
		// });
		// this.loadImage(imageArray,0);
		this.slideCount= $('.header_slide_item',this.$slider_container).length;
		
	},
	goLeft(){
		if(this.busy) return false;
		this.busy= true;
		this.currentSlide--;
		if(this.currentSlide<0)
		{
			this.currentSlide= this.slideCount-1;
		}
		// this.deactivateAutoplay();
		this.switchSlide(false);
	},
	goRight(){
		if(this.busy) return false;
		this.busy= true;
		this.currentSlide++;
		
		if(this.currentSlide>this.slideCount-1)
		{
			this.currentSlide= 0;
		}
		// this.deactivateAutoplay();
		this.switchSlide(true);
	},
	goRandom(){
		if(this.busy) return false;
		this.busy= true;
		this.prevSlide= this.currentSlide;
		while(this.currentSlide== this.prevSlide)
		{
			this.currentSlide= Math.floor(Math.random()*this.slideCount)*1;			
		}
		
		this.switchSlide(true);
	},
	deactivateAutoplay(){
		this.onAuto = false;
		clearTimeout(this.timer);
	},
	activateAutoplay(){
		this.onAuto = true;		
	},	
	switchSlide(isForward)
	{
		
		current = $('.is-selected',this.$slider_container);
		next    = $('.slider_no_'+this.currentSlide,this.$slider_container);
		console.log('current',current);
		console.log('next   ',next);

		var that = this;
		var x_from = '-50%';
		var x_to ='50%';
		if(!isForward)
		{
			x_from = '50%';
			x_to ='-50%';
		}
		clearTimeout(this.timer);
		tl = new TimelineMax({paused: true,onComplete: function(){
						
			that.busy= false;
			
			// that.timer= setTimeout(function(){
			// 	that.goRandom()
			// },that.timeBetweenAnimations);
			$('.is-selected',that.$slider_container).css('opacity','0');
			$('.is-selected',that.$slider_container).removeClass('is-selected');
			$('.slider_no_'+that.currentSlide,that.$slider_container).addClass('is-selected');

		}});
		
		tl.set(next,{opacity: 1,zIndex: 2});
		tl.set(current,{zIndex: 1});
		// tl.set($('.lazy_load',next),{opacity: 0});
		// tl.set($('.slider__item__title',next),{opacity: 0});
		

		
		// tl.fromTo($('.slider__item__title',current),0.5,{opacity: 1},{ opacity: 0 });
		// tl.fromTo(this.$board_left,0.5,{opacity: 1},{ opacity: 0 },'-=0.5');
		// tl.set(this.$board_left,{innerHTML: this.currentSlide+1});
		// tl.fromTo($('.lazy_load',current),1,{opacity: 1,x:'0%'},{ opacity: 1,x: x_to,ease: Cubic.easeInOut },'-=0.5');
		// tl.fromTo($('.lazy_load',next),1,{opacity: 0,x:x_from},{ opacity: 1,x: '0%',ease: Cubic.easeInOut },'-=1');
		// tl.fromTo(this.$board_left,0.5,{opacity: 0},{ opacity: 1 },'-=0.5');
		// tl.fromTo($('.slider__item__title',next),0.5,{opacity: 0},{ opacity: 1 },'-=0.5');
		
		tl.play();
	},
	hidePreload()
	{
		$('body').addClass('page-loaded');
		that = this;
		
		that.timer= setTimeout(function(){
			that.goRandom();
		},this.timeBetweenAnimations);
	},
	loadImage(imageArray, index) {
        index = index || 0;
        that = this;

        if (imageArray && imageArray.length > index) {
            var img = new Image ();
            img.onload = function() {
                $(this).appendTo(imageArray[index].objeto);
                that.onLoadedCompleteImage(imageArray, index + 1);
            }
            img.src = imageArray[index].link;            
        }
        else {
        	that.hidePreload();
        	// setTimeout(function(){

        		
        	// },3000);

        }
	},
	onLoadedCompleteImage(imageArray, index)
	{
		
		this.loadImage(imageArray,index);
	}
}

var $;
jQuery(document).ready(function(_$) {
    $=_$;
    rw.constructor($);
});

