(function ($) {
	"use strict";
	// jQuery MeanMenu
	jQuery('nav#dropdown').meanmenu();
	//menu a active jquery
	var pgurl = window.location.href.substr(window.location.href
		.lastIndexOf("/") + 1);
	$("ul li a").each(function () {
		if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
			$(this).addClass("active");
		$('header ul li ul li a.active').parent('li').addClass('parent-li');
		$('header ul li ul li.parent-li').parent('ul').addClass('parent-ul');
		$('header ul li ul.parent-ul').parent('li').addClass('parent-active');
	})
	//search bar exprnd
	$('.header-top-two .right button').on('click', function () {
		$('.header-top-two .right').toggleClass('widthfull');
		console.log('Clicked');
	});
	//search bar border color
	$('.middel-top .center').on('click', function () {
		$('.middel-top .center').toggleClass('bordercolor');
	});
	//color select jquery
	$('.color-select > span').on('click', function () {
		$('.color-select > span').toggleClass('outline');
		$(this).addClass("outline").siblings().removeClass("outline");
	});
	/*----------------------------
	 nivoSlider active
	------------------------------ */
	$('#mainSlider').nivoSlider({
		directionNav: true,
		animSpeed: 500,
		effect: 'random',
		slices: 18,
		pauseTime: 10000,
		pauseOnHover: false,
		controlNav: true,
		prevText: '<i class="mdi mdi-chevron-left"></i>',
		nextText: '<i class="mdi mdi-chevron-right"></i>'
	});
	/*----------------------------
	 plus-minus-button
	------------------------------ */
	$(".qtybutton").on("click", function () {
		var $button = $(this);
		var oldValue = $button.parent().find("input").val();
		if ($button.text() == "+") {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		$button.parent().find("input").val(newVal);
	});
	/*----------------------------
	 price-slider active
	------------------------------ */
	$("#slider-range").slider({
		range: true,
		min: 40,
		max: 600,
		values: [150, 399],
		slide: function (event, ui) {
			$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
		}
	});
	$("#amount").val("$" + $("#slider-range").slider("values", 0) +
		" - $" + $("#slider-range").slider("values", 1));
	/*--------------------------
	 scrollUp
	---------------------------- */
	$.scrollUp({
		scrollText: '<i class="mdi mdi-chevron-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
	/*--------------------------
	 // simpleLens
	 ---------------------------- */
	$('.simpleLens-image').simpleLens({});
	/*--------------------------------
	Ajax Contact Form
-------------------------------- */
	$(function () {
		// Get the form.
		var form = $('#contact-form');
		// Get the messages div.
		var formMessages = $('.form-message');
		// Set up an event listener for the contact form.
		$(form).submit(function (e) {
			// Stop the browser from submitting the form.
			e.preventDefault();
			// Serialize the form data.
			var formData = $(form).serialize();
			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: $(form).attr('action'),
				data: formData,
			})
			.done(function (response) {
				// Make sure that the formMessages div has the 'success' class.
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				// Set the message text.
				$(formMessages).text(response);

				// Clear the form.
				$('#contact-form input,#contact-form textarea').val('');
			})
			.fail(function (data) {
				// Make sure that the formMessages div has the 'error' class.
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				// Set the message text.
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text(
						'Oops! An error occured and your message could not be sent.'
					);
				}
			});
		});
	});


})(jQuery);