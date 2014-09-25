/****** JiSlider version 0.4 ******/
var index, index_save, time, stay_time, easeing, JiSlider_width, JiSlider_height, _click = new Date().getTime()

function JiSlider (/****** time | stay time | control | easing | preview******/) {
	/****** JiSlider get info ******/
	index = 1
	time = arguments[0]
	stay_time = arguments[1]
	control = arguments[2] || 'none'
	easeing = arguments[3] || 'swing'
	preview = arguments[4] || 'off'
	JiSlider_width = $('.JiSlider').width()	
	JiSlider_height = $('.JiSlider').height()
	var slide_length = $('.JiSlider ul li').length

	/****** pre set ups ******/
	$('.JiSlider').css({
		position: 'relative',
		overflow: 'hidden'
	})
	$('.JiSlider ul').css({
		width: 100 * (slide_length + 2) + '%',
		margin: 0,
		padding: 0,
		left: -JiSlider_width,
		position: 'relative',
		listStyleType: 'none'
	})
	$('.JiSlider ul li').css('float', 'left')

	/****** one way slider ******/
	var first_img = $('.JiSlider ul li').first().clone()
	var last_img = $('.JiSlider ul li').last().clone()
	$('.JiSlider ul').append(first_img)
	$('.JiSlider ul').prepend(last_img)
	$('.JiSlider ul li').css('width', (100 / (slide_length + 2)) + '%')
	$('.JiSlider ul li img').css('width', '100%')
	var sub_margin = -($('.JiSlider ul li img').height() - JiSlider_height) /2
	$('.JiSlider ul li img').css('margin-top', sub_margin)

	/****** image preview ******/
	/*
	if (preview == 'on') {
		var preview_img = ''
		for (var i = 0; i < slide_length; i++) {
			preview_img += '<div class="JiSlider_preview_wrap" data-index="' + (i + 1) + '"><img src="' + $('.JiSlider ul li img:eq(' + (i + 1) + ')').attr('src') + '"></div>'
		}
		$('.JiSlider').append('<div class="JiSlider_previews">' + preview_img + '</div>')
		$('.JiSlider_previews').css({
			display: 'table',	
			position: 'absolute',
			top: '50%',
			width: '100%',
			backgroundColor: '#aaa',
			opacity: 0
		})
		$('.JiSlider_preview_wrap').css({
			display: 'table-cell',
			width: (100 / slide_length) + '%',
			height: '100%',
			padding: '15px'
		})
		$('.JiSlider_preview_wrap img').css({
			display: 'block',
			margin: 'auto',
			width: '80%'
		})
		$('.JiSlider_previews').css('margin-top', -($('.JiSlider_preview_wrap').height() / 2) - 15)
	}
	*/

	/****** arrow control ******/
	$('.JiSlider').append('<div class="JiSlider_arrow_control"><img class="JiSlider_left_button" src="http://www.unifox.kr/minha/imageslide_arrow_left.png" height="80" /><img class="JiSlider_right_button" src="http://www.unifox.kr/minha/imageslide_arrow_right.png" height="80" /></div>')

	$('.JiSlider_arrow_control').css({
		position: 'absolute',
		width: '100%',
		left: 0,
		top: (JiSlider_height - 80) / 2
	})
	$('.JiSlider_left_button').css({
		position: 'absolute',
		left: '10px',
		cursor: 'pointer'
	})
	var JiSlider_left_button = $('.JiSlider_left_button').attr('src')
	$('.JiSlider_left_button').hover(function () {
		previewStart()
		var JiSlider_left_button_nul = 'http://www.unifox.kr/minha/imageslide_arrow_left_nul.png'
		$(this).attr('src', JiSlider_left_button_nul)
	}, function () {
		previewEnd()
		$(this).attr('src', JiSlider_left_button)
	})
	$('.JiSlider_right_button').css({
		position: 'absolute',
		right: '10px',
		cursor: 'pointer'
	})
	var JiSlider_right_button = $('.JiSlider_right_button').attr('src')
	$('.JiSlider_right_button').hover(function () {
		previewStart()
		var JiSlider_right_button_nul = 'http://www.unifox.kr/minha/imageslide_arrow_right_nul.png'
		$(this).attr('src', JiSlider_right_button_nul)
	}, function () {
		previewEnd()
		$(this).attr('src', JiSlider_right_button)
	})

	/****** control button ******/
	var JiSlider_control_position = {'none': {}, 'up': {'left': 0, 'right': 0, 'top': '25px'}, 'down': {'left': 0, 'right': 0, 'bottom': '25px'}}
	if (control != 'none') {
		var buttons = ''	
		for (var i = 0; i < slide_length; i++)
			buttons += '<div class="JiSlider_control_button" data-index="' + (i + 1) + '"><img src="http://www.unifox.kr/minha/control_button.png" /></div>'
		$('.JiSlider').append('<div class="JiSlider_control">' + buttons + '</div>')		
		$('.JiSlider_control_button').css({
			float: 'left',
			width: '30px',
			height: '25px',
			overflow: 'hidden',
			cursor: 'pointer'
		})
		$('.JiSlider_control').css({
			position: 'absolute',
			width: slide_length * $('.JiSlider_control_button').width(),
			height: '30px',
			margin: 'auto'
		})
		$('.JiSlider_control').css(JiSlider_control_position[control])
		$('.JiSlider_control_button').click(function () {
			index = $(this).attr('data-index')
			index_save = index
			controlAnimation(index)
		})
	}

	/****** animation ******/
	function animate (time, easeing) {
		var left = -(index * JiSlider_width)
		$('.JiSlider ul').animate({
			left: left
		}, time, easeing)
		$('.JiSlider_control_button[data-index=' + index + ']').addClass('JiSlider_on').find('img').css('margin-top', -$('.JiSlider_control_button').height())
		$('.JiSlider_control_button[data-index!=' + index + ']').removeClass('JiSlider_on').find('img').css('margin-top', '0px')
		$('.JiSlider_preview_wrap[data-index=' + index + ']').addClass('JiSlider_on').find('img').animate({opacity: 1}, (time / 2))
		$('.JiSlider_preview_wrap[data-index!=' + index + ']').removeClass('JiSlider_on').find('img').animate({opacity: 0.5}, (time / 2))
	}

	function indexCheck (gIndex) {
		if (gIndex > slide_length) {
			animate(time, easeing)			
			index = 1
			animate(0, easeing)
		} else if (gIndex < 1) {
			animate(time, easeing)
			index = slide_length
			animate(0, easeing)
		} else {
			animate(time, easeing)
		}
	}

	function controlAnimation (gIndex) {
		var click_time = new Date().getTime()
		if (click_time - _click > (time / 2)) {
			indexCheck(gIndex)
			reset()
			_click = click_time
		} else {
			index = index_save
			_click = click_time
		}
	} 

	/****** timer reset ******/
	function reset () {
		clearInterval(play)
		play = setInterval(function () {
			indexCheck(++index)
		}, stay_time)
	}
	
	/****** auto play ******/
	var play = setInterval(function () {
		indexCheck(++index)
	}, stay_time)

	/****** arrow button ******/
	$('.JiSlider_left_button').click(function () {
		index_save = index
		controlAnimation(--index)
	})

	$('.JiSlider_right_button').click(function () {
		index_save = index
		controlAnimation(++index)
	})

	/****** preview function ******/
	function previewStart () {
		hover = setTimeout(function () {
			$('.JiSlider_previews').animate({
				opacity: 1
			}, 400)
		}, 500)
	}
	
	function previewEnd () {
		clearTimeout(hover)
		$('.JiSlider_previews').animate({
			opacity: 0
		}, 400)
	}

	/****** run JiSlider ******/
	animate(time, easeing)
}

/****** on resize ******/
window.onresize = function () {
	JiSlider_width = $('.JiSlider').width()
	JiSlider_height = $('.JiSlider').height()
	$('.JiSlider ul').css('left', -index * JiSlider_width)
	if (control != 'none')
		$('.JiSlider .JiSlider_arrow_control').css('top', (JiSlider_height - 80) / 2)
	$('.JiSlider ul li img').css('margin-top', -($('.JiSlider ul li img').height() - JiSlider_height) / 2)
	if (preview == 'on')
		$('.JiSlider_previews').css('margin-top', -($('.JiSlider_preview_wrap').height() / 2) - 20)
}
