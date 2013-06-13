// jQUERY WRAPPER
(function($){

	function formMessage (formId, text) {
		$(formId + " .messageBox").html(text);

		var fade = setInterval(function() {
			formMessage(formId,"");
			clearInterval(fade);
		}, 5000);
	}

	function prevSlide () {
		// If we're on the first slide, loop around
		if ( !$("#portfolioBox .project").first().hasClass("hidden") ) {
			return false;
/*				// Move the current slide to the top and animate it
			$("#portfolioBox .project").first().css("z-index","100");
			$("#portfolioBox .project").first().toggleClass("prevSlide");

			// Show last slide
			$("#portfolioBox .project").last().toggleClass("nextSlide hidden");

			setTimeout(function(){
				// Hide the first slide
				$("#portfolioBox .project").first().toggleClass("nextSlide hidden");
				$("#portfolioBox .project").first().css("z-index","0");
			}, 300);
*/
		} else {
			// Reveal the next slide
			$("#portfolioBox .frame a.hidden").not(".nextSlide").last().toggleClass("hidden");

			// Moves the current slide
			$("#portfolioBox .prevSlide").last().toggleClass("prevSlide");
			$("#portfolioBox .project").not(".nextSlide").last().toggleClass("nextSlide");

			// Wait for CSS animations to complete
			setTimeout(function(){
				// Hide this batch
				$("#portfolioBox .nextSlide").first().toggleClass("hidden");
				//$("#portfolioBox .nextSlide").first().css("z-index","0");
			}, 200);
		}
	}

	function nextSlide () {
		// If we're on the last slide, loop around
		if ( !$("#portfolioBox .project").last().hasClass("hidden") ) {
			return false;
/*				// Move the current slide to the top and animate it
			$("#portfolioBox .project").first().css("z-index","0");
			$("#portfolioBox .project").last().toggleClass("nextSlide");

			// Show first slide
			$("#portfolioBox .project").first().toggleClass("prevSlide hidden");

			setTimeout(function(){
				// Hide the last slide
				$("#portfolioBox .project").last().toggleClass("prevSlide hidden");
				$("#portfolioBox .project").last().css("z-index","0");
			}, 300);
*/
		} else {
			// Move current slide to the top
			$("#portfolioBox .project").not(".prevSlide").first().css("z-index","100");

			// Reveal the next slide
			$("#portfolioBox .frame a.hidden").not(".prevSlide").first().toggleClass("hidden");

			// Moves the current slide
			$("#portfolioBox .nextSlide").first().toggleClass("nextSlide");
			$("#portfolioBox .project").not(".prevSlide").first().toggleClass("prevSlide");

			// Wait for CSS animations to complete
			setTimeout(function(){
				// Hide this batch
				$("#portfolioBox .prevSlide").last().toggleClass("hidden");
				$("#portfolioBox .prevSlide").last().css("z-index","0");
			}, 200);
		}
	}




	$(document).ready(function(){
		// Remove content from portfolio arrows
		$("#portfolio .inset").html("");

		// Animate slider (previous)
		$("#portfolioBox .icon-left-open").click(function(){
			prevSlide();
		});
		// Animate slider (next)
		$("#portfolioBox .icon-right-open").click(function(){
			nextSlide();
		});
		$("body").keydown(function (e) {
			var code=(e.keyCode ? e.keyCode : e.which);
			console.log(code);
			if(code==37){
				prevSlide();
			} else if (code==39){
				nextSlide();
			}
		});


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

		// Expand portfolio projects
		$("a[rel*=leanModal]").leanModal( { top : -50, overlay : 0.7 } );

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
				$("#meSlide h1.animate").first().toggleClass("hidden");
				$("#meSlide img.animate").first().toggleClass("hidden");
				$("#meSlide div.animate").first().toggleClass("hidden");
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


		// Beautify the Skills section
		$("div.skills").each(function(){
			var skills = $(this).html();
			// Expert
			skills = skills.replace(/\: Expert/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span>");
			// Advanced
			skills = skills.replace(/\: Advanced/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span>");
			// Intermediate
			skills = skills.replace(/\: Intermediate/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
			// Knowledgeable
			skills = skills.replace(/\: Knowledgeable/g, "<span class='on'>&bull;</span><span class='on'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span><span class='off'>&bull;</span>");
			// Apply changes
			$(this).html(skills);
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

})(jQuery);