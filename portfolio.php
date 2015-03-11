
<!DOCTYPE html>

<html lang="en">

<head>
	<meta charset="utf-8" />
	<title>Image Lightbox: Responsive and Touch-Friendly demo by Osvaldas Valutis</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="Demo of Image Lightbox: Responsive and Touch-Friendly" />
	<meta name="robots" content="all">
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<meta name="msapplication-tap-highlight" content="no"/>
	<style>

		html
		{
			/* killing 300ms touch delay in IE */
			-ms-touch-action: manipulation;
			touch-action: manipulation;
		}

		body
		{
			font-family: 'Fjalla One', sans-serif;
			background-color: #efefef;
		}

		#container
		{
			width: 41.25em; /* 660 */
			text-align: center;
			padding: 0 20px;
			margin: 3.125em auto 6.25em; /* 50 100 */
		}
			#container h1
			{
				font-size: 2.125em; /* 34 */
				line-height: 0.882em; /* 30 (34) */
				text-transform: uppercase;
			}
				#container h1 span
				{
					font-size: 0.588em; /* 20 (34) */
					line-height: 1em; /* 20 (20) */
					color: #aaa;
					display: block;
				}
				#container h1 a:hover,
				#container h1 a:hover span
				{
					color: #666;
				}

			#container h2
			{
				border-top: 1px solid #ddd;
				padding-top: 1.875em; /* 30 */
				margin-top: 1.875em; /* 30 */
				margin-bottom: 0.625em; /* 10 */
			}
				#container h2 span
				{
					color: #666;
				}

			#container ul
			{
			}
				#container li
				{
					display: inline-block;
					margin: 0.625em; /* 10 */
				}
					#container img
					{
						width: 8.75em; /* 140 */
						height: 8.75em; /* 140 */
						border-color: #eee;
						border: 0.625em solid rgba( 255, 255, 255, .5 ); /* 10 */

						-webkit-box-shadow: 0 0 0.313em rgba( 0, 0, 0, .05 ); /* 5 */
						-moz-box-shadow: 0 0 0.313em rgba( 0, 0, 0, .05 ); /* 5 */
						box-shadow: 0 0 0.313em rgba( 0, 0, 0, .05 ); /* 5 */

						-webkit-transition: -webkit-box-shadow .3s ease, border-color .3s ease;
						-moz-transition: -moz-box-shadow .3s ease, border-color .3s ease;
						-ms-transition: -ms-box-shadow .3s ease, border-color .3s ease;
						-o-transition: -o-box-shadow .3s ease, border-color .3s ease;
						transition: box-shadow .3s ease, border-color .3s ease;
					}
						#container img:hover
						{
							border-color: #fff;

							-webkit-box-shadow: 0 0 0.938em rgba( 0, 0, 0, .25 ); /* 15 */
							-moz-box-shadow: 0 0 0.938em rgba( 0, 0, 0, .25 ); /* 15 */
							box-shadow: 0 0 0.938em rgba( 0, 0, 0, .25 ); /* 15 */
						}

		footer
		{
			font-size: 0.875em; /* 14 */
			color: #aaa;
			border-top: 1px solid #ddd;
			padding-top: 2.143em; /* 30 (14) */
			margin-top: 2.143em; /* 30 (14) */
		}


		/* IMAGE LIGHTBOX SELECTOR */

		#imagelightbox
		{
			cursor: pointer;
			position: fixed;
			z-index: 10000;

			-ms-touch-action: none;
			touch-action: none;

			-webkit-box-shadow: 0 0 3.125em rgba( 0, 0, 0, .75 ); /* 50 */
			-moz-box-shadow: 0 0 3.125em rgba( 0, 0, 0, .75 ); /* 50 */
			box-shadow: 0 0 3.125em rgba( 0, 0, 0, .75 ); /* 50 */
		}


		/* WITH ACTIVITY INDICATION */

		#imagelightbox-loading,
		#imagelightbox-loading div
		{
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
		}
		#imagelightbox-loading
		{
			width: 2.5em; /* 40 */
			height: 2.5em; /* 40 */
			background-color: #444;
			background-color: rgba( 0, 0, 0, .5 );
			position: fixed;
			z-index: 10003;
			top: 50%;
			left: 50%;
			padding: 0.625em; /* 10 */
			margin: -1.25em 0 0 -1.25em; /* 20 */

			-webkit-box-shadow: 0 0 2.5em rgba( 0, 0, 0, .75 ); /* 40 */
			-moz-box-shadow: 0 0 2.5em rgba( 0, 0, 0, .75 ); /* 40 */
			box-shadow: 0 0 2.5em rgba( 0, 0, 0, .75 ); /* 40 */
		}
			#imagelightbox-loading div
			{
				width: 1.25em; /* 20 */
				height: 1.25em; /* 20 */
				background-color: #fff;

				-webkit-animation: imagelightbox-loading .5s ease infinite;
				-moz-animation: imagelightbox-loading .5s ease infinite;
				-o-animation: imagelightbox-loading .5s ease infinite;
				animation: imagelightbox-loading .5s ease infinite;
			}

			@-webkit-keyframes imagelightbox-loading
			{
				from { opacity: .5;	-webkit-transform: scale( .75 ); }
				50%	 { opacity: 1;	-webkit-transform: scale( 1 ); }
				to	 { opacity: .5;	-webkit-transform: scale( .75 ); }
			}
			@-moz-keyframes imagelightbox-loading
			{
				from { opacity: .5;	-moz-transform: scale( .75 ); }
				50%	 { opacity: 1;	-moz-transform: scale( 1 ); }
				to	 { opacity: .5;	-moz-transform: scale( .75 ); }
			}
			@-o-keyframes imagelightbox-loading
			{
				from { opacity: .5;	-o-transform: scale( .75 ); }
				50%	 { opacity: 1;	-o-transform: scale( 1 ); }
				to	 { opacity: .5;	-o-transform: scale( .75 ); }
			}
			@keyframes imagelightbox-loading
			{
				from { opacity: .5;	transform: scale( .75 ); }
				50%	 { opacity: 1;	transform: scale( 1 ); }
				to	 { opacity: .5;	transform: scale( .75 ); }
			}



		/* WITH OVERLAY */

		#imagelightbox-overlay
		{
			background-color: #fff;
			background-color: rgba( 255, 255, 255, .9 );
			position: fixed;
			z-index: 9998;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}


		/* WITH "CLOSE" BUTTON */

		#imagelightbox-close
		{
			width: 2.5em; /* 40 */
			height: 2.5em; /* 40 */
			text-align: left;
			text-indent: -9999px;
			background-color: #666;
			position: fixed;
			z-index: 10002;
			top: 2.5em; /* 40 */
			right: 2.5em; /* 40 */

			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;

			-webkit-transition: color .3s ease;
			-moz-transition: color .3s ease;
			-ms-transition: color .3s ease;
			-o-transition: color .3s ease;
			transition: color .3s ease;
		}
			#imagelightbox-close:hover
			{
				background-color: #111;
			}
			#imagelightbox-close:before,
			#imagelightbox-close:after
			{
				width: 2px;
				background-color: #fff;
				content: '';
				position: absolute;
				top: 20%;
				bottom: 20%;
				left: 50%;
				margin-left: -1px;
			}
			#imagelightbox-close:before
			{
				-webkit-transform: rotate( 45deg );
				-moz-transform: rotate( 45deg );
				-ms-transform: rotate( 45deg );
				-o-transform: rotate( 45deg );
				transform: rotate( 45deg );
			}
			#imagelightbox-close:after
			{
				-webkit-transform: rotate( -45deg );
				-moz-transform: rotate( -45deg );
				-ms-transform: rotate( -45deg );
				-o-transform: rotate( -45deg );
				transform: rotate( -45deg );
			}


		/* WITH CAPTION */

		#imagelightbox-caption
		{
			text-align: center;
			color: #fff;
			background-color: #666;
			position: fixed;
			z-index: 10001;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 0.625em; /* 10 */
		}


		/* WITH NAVIGATION */

		#imagelightbox-nav
		{
			background-color: #444;
			background-color: rgba( 0, 0, 0, .5 );
			position: fixed;
			z-index: 10001;
			left: 50%;
			bottom: 3.75em; /* 60 */
			padding: 0.313em; /* 5 */

			-webkit-transform: translateX( -50% );
			-moz-transform: translateX( -50% );
			-ms-transform: translateX( -50% );
			-o-transform: translateX( -50% );
			transform: translateX( -50% );

			-webkit-border-radius: 20px;
			-moz-border-radius: 20px;
			border-radius: 20px;
		}
			#imagelightbox-nav a
			{
				width: 1em; /* 20 */
				height: 1em; /* 20 */
				border: 1px solid #fff;
				display: inline-block;
				margin: 0 0.313em; /* 5 */

				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
			}
			#imagelightbox-nav a.active
			{
				background-color: #fff;
			}

	#imagelightbox-loading,
	#imagelightbox-overlay,
	#imagelightbox-close,
	#imagelightbox-caption,
	#imagelightbox-nav
	{
		-webkit-animation: fade-in .25s linear;
		-moz-animation: fade-in .25s linear;
		-o-animation: fade-in .25s linear;
		animation: fade-in .25s linear;
	}
		@-webkit-keyframes fade-in
		{
			from	{ opacity: 0; }
			to		{ opacity: 1; }
		}
		@-moz-keyframes fade-in
		{
			from	{ opacity: 0; }
			to		{ opacity: 1; }
		}
		@-o-keyframes fade-in
		{
			from	{ opacity: 0; }
			to		{ opacity: 1; }
		}
		@keyframes fade-in
		{
			from	{ opacity: 0; }
			to		{ opacity: 1; }
		}

	@media only screen and (max-width: 41.250em) /* 660 */
	{
		#container
		{
			width: 100%;
		}
		#imagelightbox-close
		{
			top: 1.25em; /* 20 */
			right: 1.25em; /* 20 */
		}
		#imagelightbox-nav
		{
			bottom: 1.25em; /* 20 */
		}
	}

	</style>

</head>

<body>



<!--
	DEMO
-->

<div id="container">
	<h2>Combination</h2>
	<ul>
		<li><a href="img/showcase/full_bbl.jpg" data-imagelightbox="portfolio"><img src="img/showcase/thumb_bbl.jpg" alt="BBL" /></a></li>
		<li><a href="img/showcase/full_woh.jpg" data-imagelightbox="portfolio"><img src="img/showcase/thumb_woh.jpg" alt="WOH" /></a></li>
		<li><a href="img/showcase/full_cheo.jpg" data-imagelightbox="portfolio"><img src="img/showcase/thumb_cheo.jpg" alt="CHEO" /></a></li>
	</ul>
</div>





<!--
	LAST BITS
-->
<script src="js/jquery.min.js"></script>
<script src="js/imagelightbox.min.js"></script>
<script>

	$( function()
	{
		var activityIndicatorOn = function()
			{
				$( '<div id="imagelightbox-loading"><div></div></div>' ).appendTo( 'body' );
			},
			activityIndicatorOff = function()
			{
				$( '#imagelightbox-loading' ).remove();
			},

			overlayOn = function()
			{
				$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
			},
			overlayOff = function()
			{
				$( '#imagelightbox-overlay' ).remove();
			},

			closeButtonOn = function( instance )
			{
				$( '<a href="#" id="imagelightbox-close">Close</a>' ).appendTo( 'body' ).on( 'click touchend', function(){ $( this ).remove(); instance.quitImageLightbox(); return false; });
			},
			closeButtonOff = function()
			{
				$( '#imagelightbox-close' ).remove();
			},

			captionOn = function()
			{
				var description = $( 'a[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"] img' ).attr( 'alt' );
				if( description.length > 0 )
					$( '<div id="imagelightbox-caption">' + description + '</div>' ).appendTo( 'body' );
			},
			captionOff = function()
			{
				$( '#imagelightbox-caption' ).remove();
			},

			navigationOn = function( instance, selector )
			{
				var images = $( selector );
				if( images.length )
				{
					var nav = $( '<div id="imagelightbox-nav"></div>' );
					for( var i = 0; i < images.length; i++ )
						nav.append( '<a href="#"></a>' );

					nav.appendTo( 'body' );
					nav.on( 'click touchend', function(){ return false; });

					var navItems = nav.find( 'a' );
					navItems.on( 'click touchend', function()
					{
						var $this = $( this );
						if( images.eq( $this.index() ).attr( 'href' ) != $( '#imagelightbox' ).attr( 'src' ) )
							instance.switchImageLightbox( $this.index() );

						navItems.removeClass( 'active' );
						navItems.eq( $this.index() ).addClass( 'active' );

						return false;
					})
					.on( 'touchend', function(){ return false; });
				}
			},
			navigationUpdate = function( selector )
			{
				var items = $( '#imagelightbox-nav a' );
				items.removeClass( 'active' );
				items.eq( $( selector ).filter( '[href="' + $( '#imagelightbox' ).attr( 'src' ) + '"]' ).index( selector ) ).addClass( 'active' );
			},
			navigationOff = function()
			{
				$( '#imagelightbox-nav' ).remove();
			};



		//	ALL COMBINED

		var portfolio = $( 'a[data-imagelightbox="portfolio"]' ).imageLightbox(
		{
			onStart:		function() { overlayOn(); closeButtonOn( portfolio ); },
			onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); activityIndicatorOff(); },
			onLoadStart: 	function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); }
		});

	});
</script>


</body>

</html>