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
		this.initialPanX = 0;
		/** Pan Direction back(-1) or next(+1) */
		this.panDir: '-1' | '+1';
		/** Pan Timeline */
		this.activeTl: SliderTimeline;

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
		this.slides=$("#header_slide")[0];
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

		// $slides
		this.slides
		    .on('dragstart', e => e.preventDefault());
		// $container
		this.slides
		    .hammer()
		    .on('panstart', this.onPanStart(e))
		    .on('pan',this.onPan(e))
		    .on('panend',this.onPanEndHandler())
		// $(".slider_nav_right").on("click touchstart",function(event){
		// 	event.preventDefault();
		// 	that.goRight();
		// });
		// $(".slider_nav_left").on("click touchstart",function(event){
		// 	event.preventDefault();
		// 	that.goLeft();
		// });
		
		
	},
	setPanTimeline(dir) {
        // Set pan properties
        this.panDir = dir;
        this.activeTl = <SliderTimeline>this.gotoHandler(dir);
        // Pause timeline, pan event will update its progress
        this.activeTl.pause(0);
        return this.activeTl;
    },
    onPanStart(e) {
        /** Pan start delta X */
        this.initialPanX = e.gesture.deltaX;
    },
    onPan(e) {
        // If slider is locked return
        if (this.lock) return;

        const { $container } = this.opts;

        /** Normalized delta x */
        const x = (this.initialPanX - e.gesture.deltaX) / $container.width();

        // x needs to be greater or less than 0 to define direction
        if (x == 0) return;

        /** Current direction back(-1) or next(+1) */
        const dir: '-1' | '+1' = x < 0 ? '-1' : '+1';

        // Initial timeline setup
        if (!this.activeTl) {
            this.setPanTimeline(dir);
        }
        // Swap timeline on direction change
        else if (this.panDir !== dir) {
            if (this.activeTl.progress() > 0) {
                this.activeTl.pause(0);
            }

            // Since last timeline didn't get to complete: undo last css class update
            this.pushActiveSlide(dir === '+1');

            this.setPanTimeline(dir);
        }

        // Control current timeline with normalized delta x
        this.activeTl.progress(Math.abs(x));
    },

    onPanEndHandler() {
        const { panTimeScale, panDistanceLimit } = this.opts;
        const activeTl = this.activeTl;

        if (activeTl) {
            // Lock slider from this point, it will be unlocked
            // on transition events 'onComplete' or 'onReverseComplete',
            // check super.gotoHandler method
            this.lock = true;

            if (activeTl.progress() > panDistanceLimit) {
                // If progress passed the distance limit resume animation
                activeTl.resume()
            }
            else {
                // If progress hasn't passed the distance limit reverse animation 
                activeTl.reverse();
            }
            // Apply panTimeScale
            activeTl.timeScale(panTimeScale);
        }
    },

    onTransitionComplete(input) {
        super.onTransitionComplete(input);
        // Reset props
        this.initialPanX = 0;
        this.panDir = undefined;
    },

    onTransitionReverseComplete(input) {
        // Undo css state classes change...
        this.pushActiveSlide(input.direction === 'back');
        // ...and unlock slider
        this.lock = false;
        // Reset props
        this.initialPanX = 0;
        this.panDir = undefined;
        this.activeTl = undefined;
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

