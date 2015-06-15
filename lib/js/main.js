(function($){
	var scrollTop,
	    target = $('main[role="main"]').offset().top - $('#bg').innerHeight(),
	    bg = $("#bg"),
	    header = $("header[role='banner']");

	// Animations and adjustments made based on scrolling position
	function scrollAdjustments() {
		scrollTop = $(window).scrollTop();
		
		// Adjust the menu once the user scrolls down the page
		if (scrollTop > 0) {
			header.addClass("overlay");
		} else {
			header.removeClass("overlay");
		}

		// Sync the position of the fancy background with the initial blurb
		if (scrollTop >= target) {
			bg.css("position", "absolute");
			bg.css("top", target);
		} else {
			bg.css("top", 0);
			bg.css("position", "fixed");
		}
	}

	$(document).scroll( function(){
		scrollAdjustments();
	});
	$(window).resize( function(){
		target = $('main[role="main"]').offset().top - $('#bg').innerHeight();
		scrollAdjustments();
	});

	$(document).ready(function(){
		setTimeout(function(){
			target = $('main[role="main"]').offset().top - $('#bg').innerHeight();
			scrollAdjustments();
		}, 1);
		

		// Scrolls smoothly from the top menu
		$('a[href^="#"]').click(function(){
			// Check if the click was on a portfolio project
			if ( $(this).hasClass("project") ) {
				console.log("modal");
				return false;
			} else {
				var targetId = $(this).attr("href");
				$("body,html").animate({ scrollTop: $(targetId).offset().top - 60 }, "slow");
				console.log( $(targetId).offset().top );
				return false;
			}
		});


		// Expand collapsed content
		$(".break .expand").click(function(){
			// Expand or collapse the related element
			var targetId = $(this).attr("href");
			$(targetId).toggleClass("collapse expand");
			$(this).toggleClass("collapse expand");

			if ( $(this).html() == "+" ) {
				$(this).html("&ndash;")
			} else {
				$(this).html("+")
			}
			return false;
		});


		// Beautify the Skills section
		$(".skills").each(function(){
			var skills = $(this).html();

			/*  LEGEND
			 *
			 *  5 Expert
			 *  4 Advanced
			 *  3 Intermediate
			 *  2 Knowledgeable
			 *  1 Novice
			 */

			// Expert
			skills = skills.replace(/\: Expert/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span>");
			// Advanced
			skills = skills.replace(/\: Advanced/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span>");
			// Intermediate
			skills = skills.replace(/\: Intermediate/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
			// Knowledgeable
			skills = skills.replace(/\: Knowledgeable/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
			// Novice
			skills = skills.replace(/\: Novice/g, "<span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
			// Apply changes
			$(this).html(skills);
		});


	}); // END of $(document).ready


	// Temporarily display form messages
	function formMessage (formId, text) {
		$(formId + " .messageBox").html(text);

		var fade = setInterval(function() {
			formMessage(formId,"");
			clearInterval(fade);
		}, 5000);
	}


	// Stops default form behaviour to prevent spam
	$("form").submit(function(e){
		e.preventDefault();
	});
	// SUBMIT via a button instead
	$("[type='submit']").click(function(e){
		e.preventDefault();
		var formId = "#" + $(this).attr("form");
		var data = $(formId).serializeArray();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

		formMessage(formId, "<span>Processing...</span>");

		if ( data[1]["value"] == "" || data[2]["value"] == "" ) {
			formMessage(formId, "<span class='fail'>Oops, you missed a mandatory field!</span>");
		} else if (!emailReg.test(data[2]["value"])) {
			formMessage(formId, "<span class='fail'>Please enter a valid email address.</span>");
		}else { // Everything looks fine
			$.post("http://lucasunplugged.com/mail/", data, function(data,status) {
				console.log(status);
				if(status == "success"){
					formMessage(formId, "<span class='success'>Success!</span>");
				} else {
					formMessage(formId, "<span class='fail'>Oops, something went wrong. Please try again.</span>");
				}
			});
		}

	});

})(jQuery);