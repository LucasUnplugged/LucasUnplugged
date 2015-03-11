// jQUERY WRAPPER
(function($){

	function formMessage (formId, text) {
		$(formId + " .messageBox").html(text);

		var fade = setInterval(function() {
			formMessage(formId,"");
			clearInterval(fade);
		}, 5000);
	}

	$(document).ready(function(){

		// Hides the logo when on the "About Me" section, and show it otherwise
		var scrollTop = $(window).scrollTop();
		
		var target = $("#portfolio").offset().top - 200; // Give a bit of leeway
		var interval = setInterval(function() {
			if ($(window).scrollTop() >= target) {
				$("#logo").animate({opacity:1},5,"linear");
			} else {
				$("#logo").animate({opacity:0},5,"linear");
			}
		}, 750);

		// Scrolls smoothly from the top menu
		$("nav a").click(function(){
			var targetId = $(this).attr("href");
			$("body,html").animate({ scrollTop: $(targetId).offset().top }, "slow");
			console.log( $(targetId).offset().top );
			return false;
		});


		var found = 0;

		// About Me Animations
		$(".slideBtn").click(function(){
			// Get the first animation-ready element of each type, and animate it by assigning the proper class to it
			$("#meSlide h1.animate").first().toggleClass("moveUp");
			$("#meSlide img.animate").first().toggleClass("moveLeft");
			$("#meSlide div.animate").first().toggleClass("moveRight");
			
			// Wait for CSS animations to complete
			setTimeout(function(){
				// Hide this batch
				$("#meSlide h1.animate").first().remove();
				$("#meSlide img.animate").first().remove();
				$("#meSlide div.animate").first().remove();

				// Show the next batch
				$("#meSlide h1.animate").first().show();
				$("#meSlide img.animate").first().show();
				$("#meSlide div.animate").first().show();
				$("#meSlide h1.animate").first().css({"opacity": "1"});
				$("#meSlide img.animate").first().css({"opacity": "1"});
				$("#meSlide div.animate").first().css({"opacity": "1"});
			}, 400);

			return false;
		});

		// Expand collapsed content
		$("div.break .btnIcon").click(function(){
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


	}); // END of $(document).ready


	// Stops default form behaviour to prevent spam
	$("form").submit(function(e){
		e.preventDefault();
	});
	// SUBMIT via a button instead
	$(".submit").click(function(e){
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
			$.post("http://ninelime.com/lucas/main/mail.php", data, function(data,status) {
				console.log(status);
				if(status == "success"){
					formMessage(formId, "<span class='success'>Success!</span>");
				} else {
					formMessage(formId, "<span class='fail'>Oops, something went wrong. Please try again.</span>");
				}
			});
		}

	});

	// Beautify the Skills section
	$("div.skills").each(function(){
		var skills = $(this).html();
		// Expert
		skills = skills.replace(/\: Expert/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span>");
		// Advanced
		skills = skills.replace(/\: Advanced/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span>");
		// Intermediate
		skills = skills.replace(/\: Intermediate/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
		// Apply changes
		$(this).html(skills);
	});
	
})(jQuery);