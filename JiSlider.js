/****** JiSlider version 0.5.1 ******/
// tested on IE9+, Chrome, Safari

(function ($) {
	$.fn.JiSlider = function (options) {
		// stacking prohibit
		var then = new Date().getTime();
		var UP = 'up', DOWN = 'down';

		// animation
		var Animate = function (JiSlider, slide, auto, time, stay, easing) {
			this.slider = JiSlider;
			this.width = this.slider.width();
			this.ul = JiSlider.find('ul');
			this.li = JiSlider.find('ul li');
			this.index = 1;
			this.auto = auto;
			this.time = time;
			this.stay = stay;
			this.easing = easing;
			this.slide = slide;
			this.play = setInterval(this.autoroll.bind(this), this.stay);
		}

		Animate.prototype = {
			init: function (options) {
				$.extend(this, options);
			},
			roll: function (time) {
				var left = -(this.index * this.width);
				ul.animate({
					left: left
				}, time, this.easing);

				if (this.controller) {
					this.controller.find('.ji-button[data-index=' + this.index + ']').addClass('ji-on').css('background-color', setting.color);
					this.controller.find('.ji-button[data-index!=' + this.index + ']').removeClass('ji-on').css('background-color', 'transparent');
				}
				
				this.check();
			},
			move: function (index) {
				this.index = index;
				this.roll(0);
			},
			autoroll: function () {
				if (this.auto)
					this.index += 1;
				this.roll(this.time);
			},
			check: function () {
				if (this.index > this.slide) {
					this.move(1);
				} else if (this.index < 1) {
					this.move(slide);
				}
			},
			control: function (index) {
				if (this.timeCheck()) {
					this.index = index;
					this.reset();
					this.roll(this.time);
				}
			},
			timeCheck: function () {
				var now = new Date().getTime();
				if (now - then > this.time) {
					then = now;
					return true;
				} else {
					return false;
				}
			},
			reset: function () {
				clearInterval(this.play);
				this.play = setInterval(this.autoroll.bind(this), this.stay);
			},
			timer: function (bar) {
				this.bar = bar;
			}
		}

		// jquery element variable
		var ul = this.find('ul');
		var li = this.find('ul li');

		// setting
		var setting = $.extend({
			auto: true,
			time: 500,
			stay: 5000,
			control: true,
			easing: 'swing',
			timer: true,
			timerColor: '#444444',
			preview: false,
			color: '#664422'
		}, options);
		var jw = this.width();
		var jh = this.height();
		var slide = this.find('ul li').length;

		// slider setup
		var first = li.first().clone();
		var last = li.last().clone();
		ul.prepend(last);
		ul.append(first);

		this.css({
			position: 'relative',
			overflow: 'hidden'
		});

		ul.css({
			width: (100 * (slide + 2)) + '%',
			height: '100%',
			margin: 0,
			padding: 0,
			left: -jw,
			position: 'relative',
			listStyleType: 'none'
		});

		// selecting li tags with two clones
		li = this.find('ul li');
		var img = this.find('ul li img');

		li.css({
			position: 'relative',
			width: (100 / (slide + 2)) + '%',
			height: '100%',
			float: 'left',
			overflow: 'hidden'
		});

		img.each(function () {
			var div = $('<div>').css({
				backgroundImage: 'url(' + $(this).attr('src') + ')',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				position: 'absolute',
				width: '100%',
				height: '100%',
				zIndex: 0
			});
			$(this).after(div);
			$(this).remove();
		});

		// animation
		var animate = new Animate(this, slide, setting.auto, setting.time, setting.stay, setting.easing);

		// controller
		if (setting.control) {
			var controller = $('<div>', {'class': 'ji-controller'}).css({
				position: 'absolute',
				width: 20 * slide,
				left: 0,
				right: 0,
				bottom: 20,
				margin: 'auto'
			});
			
			var buttons = new Array();
			for (var i = 0; i < slide; i++) {
				buttons[i] = $('<div>', {'class': 'ji-button', 'data-index': (i + 1)}).css({
					width: 10,
					height: 10,
					margin: 5,
					border: '1px solid ' + setting.color,
					boxSizing: 'border-box',
					backgroundColor: 'transparent',
					borderRadius: '50%',
					float: 'left',
					cursor: 'pointer'
				}).click(function () {
					var index = $(this).data('index')
					animate.control(index)
				});
			}
			this.append(controller);
			controller.append(buttons);
			animate.init({controller: controller});
		}

		if (setting.timer) {
			var timer = $('<div>', {'class': 'ji-timer'}).css({
				position: 'absolute',
				left: 0,
				bottom: 0,
				width: 0,
				height: '10px',
				backgroundColor: setting.timerColor,
				opacity: 0.7
			});
			this.append(timer);
			animate.timer(timer);
		}

		if (typeof $.fn.mousewheel !== undefined) {
			this.on('mousewheel', function (e) {
				var now = new Date().getTime();

				if (now - then > animate.time) {
					var dir = e.deltaY > 0 ? UP: DOWN;
					if (dir == UP) {
						animate.index--;
						animate.roll(this.time);
					} else if (dir == DOWN) {
						animate.index++
						animate.roll(this.time);
					}
				}

				then = now - animate.time + 100;
			});
		}

		animate.roll(0);

		return this;
	}
}(jQuery));