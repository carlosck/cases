document.headerSlide={
		
	constructor(_main){		
		this.main= _main;
		
		this.elements= {};
		
		this.busy= false;
		this.timer = null;
		this.onAuto = true;
		this.timeBetweenAnimations= 2000;
		this.initialPanX = 0;
		this.opts= {};
		/** Pan Direction back(-1) or next(+1) */
		this.panDir= -1;
		/** Pan Timeline */
		this.activeTl= null;
		this.lock= false;
		this.cacheElements();		
		this.loadSlide();
		this.bind();
		
	},

	cacheElements(){
		
		this.$container= $(".header_slide_container");
		this.$nav_left= $(".slider_nav_left",this.$container);
		this.$nav_right= $(".slider_nav_right",this.$container);
		this.$slider_container= $(".slider_mask",this.$container);
		this.$board_left= $(".board_left",this.$container);
		this.slide=$("#header_slide");
		this.$slides={};

		this.$slide_items_template = $('#slide-item-template');
		return this;
	},
	bind(){
		
		var that= this;
		

		// $slides
		this.slide
			.on('dragstart', e => e.preventDefault());
		
		var hammertime = new Hammer(this.$container[0]);
			hammertime.on('dragstart', e => e.preventDefault());
			hammertime
			.on('panstart', function(e){that.onPanStart(e)})
			.on('pan',function(e){that.onPan(e)})
			.on('panend',function(e){that.onPanEndHandler()})		
		
		
	},
	init(){
		that = this;
		screen_size = $( window ).width();
		media_size = '.';
		this.opts.$container=this.$container;
		this.opts.panDistanceLimit= 0.10;
		this.opts.allowPan= true;
		this.opts.panTimeScale= 4;
		this.opts.cssClasses={
			defaultSlide: 'slider__item',
			activeSlide: 'slider__item--active',
			backSlide: 'slider__item--back',
			nextSlide: 'slider__item--next',
		}

		// Abort if there's no slider
		if (this.$container.length === 0) return false;
		// Define $slides
		this.$slides = $('.'+this.opts.cssClasses.defaultSlide, this.$container);
		console.log('this.$slides',this.$slides);
		let { cssClasses, $container } = this.opts;

		            // Abort if there's no slider
        if ($container.length === 0) return false;
        
        // Mark slides with `data-slide-index`
        this.setSlidesIndex();
        // Set initial active slide
        this.setActiveSlide(this.getActiveSlide());
		

		this.transitionBack = function(slides){
			
			return that.transitionHandler('back', slides.$activeSlide, slides.$backSlide);
		}

		/** @override */
		this.transitionNext = function(slides){			
			return that.transitionHandler('next', slides.$activeSlide, slides.$nextSlide);
		}
		
		this.slideCount= $('.header_slide_item',this.$slider_container).length;
		this.gotoHandler(0);
	},
	setPanTimeline(dir) {
		// Set pan properties
		this.panDir = dir;
		this.activeTl = this.gotoHandler(dir);
		// Pause timeline, pan event will update its progress
		this.activeTl.pause(0);
		return this.activeTl;
	},
	onPanStart(e) {
		/** Pan start delta X */		
		this.initialPanX = e.deltaX;
	},
	onPan(e) {
		// If slider is locked return
		
		if (this.lock) return;

		const { $container } = this.opts;

		/** Normalized delta x */
		const x = (this.initialPanX - e.deltaX) / $container.width();
	
		// x needs to be greater or less than 0 to define direction
		if (x == 0) return;

		/** Current direction back(-1) or next(+1) */
		const dir= x < 0 ? '-1' : '+1';

		// Initial timeline setup
		if (!this.activeTl) {			
			this.setPanTimeline(dir);
		}
		// Swap timeline on direction change
		else {			
			if (this.panDir !== dir) {
				if (this.activeTl.progress() > 0) {					
					this.activeTl.pause(0);
				}

				// Since last timeline didn't get to complete: undo last css class update
				this.pushActiveSlide(dir === '+1');

				this.setPanTimeline(dir);
			}
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
	
	
	gotoHandler(index) {
		// Abort if slider is locked, or doesn't have enough slides to navigate
		if (this.lock || this.$slides.length < 2) return;

		let slides = {};
		let $target=null;
		let transition= null;
		let backwards = false;

		slides.$activeSlide = this.getActiveSlide();
		const activeSlideIndex = this.getSlideIndex(slides.$activeSlide);

		// NEXT||BACK
		if (index === '+1' || index === '-1') {
			backwards = index === '-1';
			slides.$backSlide = this.getBackSlide(activeSlideIndex);
			slides.$nextSlide = this.getNextSlide(activeSlideIndex);

			$target = backwards ? slides.$backSlide : slides.$nextSlide;
			transition = backwards ? this.transitionBack : this.transitionNext;			
		}
		// GOTO
		else if (typeof index === 'number') {			
			/** Normalized index */
			const nIndex = this.normalizeIndex(index);

			// Abort if trying to go to the already active
			if (nIndex === activeSlideIndex) return;

			backwards = nIndex < activeSlideIndex;
			slides.$backSlide = backwards ? this.getSlideByIndex(nIndex) : this.getBackSlide(activeSlideIndex);
			slides.$nextSlide = backwards ? this.getNextSlide(activeSlideIndex) : this.getSlideByIndex(nIndex);

			$target = backwards ? slides.$backSlide : slides.$nextSlide;
			transition = backwards ? this.transitionBack : this.transitionNext;
		}

		// Get timeline
		const timeline = this.activeTl = (transition ? transition(slides) : '');

		// onGoto binds the events that activate the next or back slide
		// and that locks and unlocks the slider on transition
		this.onGoto({
			index: this.getSlideIndex($target),
			$target: $target,
			slides: slides,
			timeline: timeline,
			direction: backwards ? 'back' : 'next'
		});

		if (timeline) {
			// If there is a timeline play it and return it.
			return timeline.play();
		}
	},
	normalizeIndex(index) {
		/** $Slides length */
		let sl = this.$slides.length;
		
		return index >= 0 ?
			index % sl :
			sl - (-index % sl || sl);
	},
	pushActiveSlide(forward) {
		const activeSlideIndex = this.getSlideIndex(this.getActiveSlide());		
		const targetSlideIndex = forward ? activeSlideIndex + 1 : activeSlideIndex - 1;
		const $targetSlide = this.getSlideByIndex(targetSlideIndex);
		this.setActiveSlide($targetSlide);
	},
	getSlideIndex($slide){
		return parseInt($slide.data('slide-index'));
	},
	getActiveSlide() {
		let { cssClasses, $container } = this.opts;
		
		
		let activeClass = cssClasses.activeSlide;
		let $activeSlide = $('.'+activeClass, $container);

		if ($activeSlide.length > 1) {
			throw Error(`More than one DOMElement is set as \`.${activeClass}\`.`);
		}
		else if ($activeSlide.length === 1) {			
			return $activeSlide;
		}
		else {			
			return this.getSlideByIndex(0);
		}
	},

	/**
	 * Get the slide after the index passed. To keep an infinite loop:
	 * if the index is the last one returns the firts slide
	 * @param {number} index - Target slide index
	 * @returns {JQuery}
	 */
	getNextSlide(index) {
		return this.getSlideByIndex(index + 1);
	},

	/**
	 * Get the slide before the index passed. To keep an infinite loop:
	 * if the index is the first one returns the last slide
	 * @param {number} index - Target slide index
	 * @returns {JQuery}
	 */
	getBackSlide(index){
		return this.getSlideByIndex(index - 1);
	},
	getSlideByIndex(index) {
		const i = this.normalizeIndex(index);        
		return $('[data-slide-index='+i+']', this.opts.$container);
	},

	/**
	 * Returns the `data-slide-index` attr value of an slide
	 * @returns {number}
	 */
	getSlideIndex($slide) {
		return parseInt($slide.data('slide-index'));
	},
	setActiveSlide($targetSlide) {
		let { cssClasses } = this.opts;
		let activeSlideIndex = this.getSlideIndex($targetSlide);

		// Remove current css classes
		this.removeCssStateClasses();
		// Add active class to target
		$targetSlide.addClass(cssClasses.activeSlide);
		// Add back class to slide before target
		this.getBackSlide(activeSlideIndex).addClass(cssClasses.backSlide);
		// Add next class to slide after target
		this.getNextSlide(activeSlideIndex).addClass(cssClasses.nextSlide);

		return {
			index: activeSlideIndex
		}
	},
	removeCssStateClasses() {
		const { cssClasses, $container } = this.opts;
		const { activeSlide, backSlide, nextSlide } = cssClasses;

		for (let key in cssClasses) {
			let cssClass = cssClasses[key];

			if (cssClass === activeSlide ||
				cssClass === backSlide ||
				cssClass === nextSlide) {
				$('.'+cssClass, $container).removeClass(cssClass);
			}
		}
	},
	onGoto(input) {
		if (!input.timeline) {
			// no timeline = motionless change
			this.onMotionlessChange(input);
		}
		else {
			// If there's a timeline, bind state events  
			let tl = input.timeline;
			tl.eventCallback('onStart', this.onTransitionStart, [input], this);
			tl.eventCallback('onComplete', this.onTransitionComplete, [input], this);
			tl.eventCallback('onReverseComplete', this.onTransitionReverseComplete, [input], this);
		}
		

		
	},

	onMotionlessChange(input) {
		// Just update css state classes, if there are no transitions
		// there is no need to lock or unlock the slider
		this.setActiveSlide(input.$target);
	},

	onTransitionStart(input) {
        // Update css state classes...
        this.setActiveSlide(input.$target);
        // ...and block slider if the user is >>not panning<<
        if (this.initialPanX === 0 && !this.lock) {
            this.lock = true;
        }
    },

	onTransitionComplete(input) {
		// Unlock slider
		this.activeTl = undefined;
		this.lock = false;
	},


	transitionHandler(dir, $activeSlide, $targetSlide) {
		const tl = new TimelineMax();

		const targetX = dir === 'back' ? '-25%' : '25%';
		const activeX = dir === 'back' ? '75%' : '-75%';

		tl.set($targetSlide, { alpha: 0, x: targetX, zIndex: 1 });
		tl.set($activeSlide, { zIndex: 3 });

		tl.to($targetSlide, 1, { x: '0%', alpha: 1, ease: Power1.easeInOut })
		tl.to($activeSlide, 1, { x: activeX, alpha: 0, ease: Power1.easeInOut }, '-=1');

		tl.set($activeSlide, { alpha: 0, zIndex: 1 });
		tl.set($targetSlide, { zIndex: 3 });

		return tl;
	},
	setSlidesIndex() {
		this.$slides.each((index, slide) => {
			$(slide).attr('data-slide-index', index);
		});
	},
	loadSlide(){
		$.ajax({
			method: "GET",
			url: "service/load_slider.php",
			dataType: "json"			
		})
		.done(function( obj_json ) {			
			if(obj_json.action=='done'){
				this.showSlide(obj_json.items);
			}
									
		}.bind(this));
	},
	showSlide(_items){
		var source   = this.$slide_items_template[0].innerHTML;		
		var template = Handlebars.compile(source);

		this.$slider_container.html("");

		var selected= true;
		var cont =1;
		for(let  itemKey in _items){				
			var item = _items[itemKey];			
			item.classe_selected= selected ? 'slider__item--active': '';
			item.cont= cont;
			cont++;
			selected = false;
			var html    = template(item);
			this.$slider_container.append(html);				
		}
		this.init();
		console.log(this.$slider_container);
	}
}

// var $;
// jQuery(document).ready(function(_$) {
//     $=_$;
//     rw.constructor($);
// });

