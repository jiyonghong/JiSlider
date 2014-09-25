/****** JiSlider version 0.5.0 ******/
// tested on IE9+, Chrome, Safari

(function ($) {
	$.fn.JiSlider = function (options) {
		// stacking prohibit
		var then = new Date().getTime()

		// animation
		var Animate = function (JiSlider, slide, time, stay, easing) {
			this.slider = JiSlider
			this.width = this.slider.width()
			this.ul = JiSlider.find('ul')
			this.li = JiSlider.find('ul li')
			this.index = 1
			this.time = time
			this.stay = stay
			this.easing = easing
			this.slide = slide
			this.play = setInterval(this.autoroll.bind(this), this.stay)
		}

		Animate.prototype = {
			init: function (options) {
				$.extend(this, options)
			},
			roll: function (time) {
				var left = -(this.index * this.width)
				ul.animate({
					left: left
				}, time, this.easing)
				this.controller.find('.ji-button[data-index=' + this.index + ']').addClass('ji-on').css('background-color', setting.color)
				this.controller.find('.ji-button[data-index!=' + this.index + ']').removeClass('ji-on').css('background-color', 'transparent')

				this.check()
			},
			move: function (index) {
				this.index = index
				this.roll(0)
			},
			autoroll: function () {
				this.index += 1
				this.roll(this.time)
			},
			check: function () {
				if (this.index > this.slide) {
					this.move(1)
				} else if (this.index < 1) {
					this.move(slide)
				}
			},
			control: function (index) {
				if (this.timeCheck()) {
					this.index = index
					this.reset()
					this.roll(this.time)
				}
			},
			timeCheck: function () {
				var now = new Date().getTime()
				if (now - then > this.time) {
					then = now
					return true
				} else {
					return false
				}
			},
			reset: function () {
				clearInterval(this.play)
				this.play = setInterval(this.autoroll.bind(this), this.stay)
			}
		}

		// jquery element variable
		var ul = this.find('ul')
		var li = this.find('ul li')
		var img = this.find('ul li img')

		// setting
		var setting = $.extend({
			time: 500,
			stay: 5000,
			control: true,
			easing: 'swing',
			preview: false,
			color: '#664422'
		}, options)
		var jw = this.width()
		var jh = this.height()
		var slide = this.find('ul li').length

		// slider setup
		var first = li.first().clone() 
		var last = li.last().clone()
		ul.prepend(last)
		ul.append(first)

		this.css({
			position: 'relative',
			overflow: 'hidden'
		})

		ul.css({
			width: (100 * (slide + 2)) + '%',
			margin: 0,
			padding: 0,
			left: -jw,
			position: 'relative',
			listStyleType: 'none'
		})

		// reset
		li = this.find('ul li')
		img = this.find('ul li img')

		li.css({
			width: (100 / (slide + 2)) + '%',
			float: 'left'
		})

		img.each(function () {file:///Users/jiyong/Documents/Plugins/JiSlider/img/1.jpg
			$(this).css('width', '100%')
			$(this).css({
				marginTop: -(($(this).height() - jh) / 2)
			})
		})

		// controller
		if (setting.control) {
			var controller = $('<div>', {'class': 'ji-controller'}).css({
				position: 'absolute',
				width: 20 * slide,
				left: 0,
				right: 0,
				bottom: 20,
				margin: 'auto'
			})
			
			var buttons = new Array()
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
				})
			}
			this.append(controller)
			controller.append(buttons)
		}

		// animation
		var animate = new Animate(this, slide, setting.time, setting.stay, setting.easing)
		animate.init({controller: controller})
		animate.roll()

		return this
	}
}(jQuery))