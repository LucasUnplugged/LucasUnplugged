// leanModal v1.2 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL
// Modified by Lucas Castro (for http://LucasUnplugged.com)

(function($){
	var modal = false;

	$.fn.extend({
		leanModal:function(options){
			var defaults={top:100,overlay:0.5,closeButton:null};
			var overlay=$("<div id='lean_overlay'></div>");
			$("body").append(overlay);
			options=$.extend(defaults,options);
			return this.each(function(){
				var o=options;

				$(this).click(function(e){
					var modal_id=$(this).attr("href");
					$("#lean_overlay").click(function(){
						close_modal(modal_id); modal = false;});
					$(o.closeButton).click(function(){close_modal(modal_id); modal = false;});
					open_modal(modal_id,o);
					e.preventDefault()
				})

				$(this).keydown(function (e) { var modal_id=$(this).attr("href");var code=(e.keyCode ? e.keyCode : e.which);
				if(code==27){ // Esc
					close_modal(modal_id);
					modal = false;
					$("#portfolioBox .details section").hide(0);
				}else if(code==37){ // Left arrow
					close_modal(modal_id);
					if (modal) slideModal();
				}else if(code==39){ // Right arrow
					close_modal(modal_id);
					if (modal) slideModal();
				} console.log("Modal = "+modal); });
			});


			// Move modal slide details (used on key press)
			function slideModal() {
				// Wait for modal to hide before showing new one
				setTimeout(function(){
					// Make sure the overlay is showing
					$("#lean_overlay").show(0);
			
					// Hide all previous
					$("#portfolioBox .details section").hide(0);
					
					// Click on active slide
					$("#portfolioBox .active").trigger("click");
				}, 100);
			}

			function open_modal(modal_id,o){
				var modal_height=$(modal_id).outerHeight();
				var modal_width=$(modal_id).outerWidth();
				$("#lean_overlay").css({"display":"block",opacity:0});
				$("#lean_overlay").fadeTo(200,o.overlay);
				$(modal_id).css({"display":"block","position":"absolute","opacity":0,"z-index":11000,"left":50+"%","margin-left":"-50%","top":o.top+"px"});
				$(modal_id).fadeTo(200,1);
				modal = true;
			}

			function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);
