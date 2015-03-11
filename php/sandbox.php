<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Sandbox</title>
	
	<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<style type="text/css">
		/* @group Reset */
		/* 
		html5doctor.com Reset Stylesheet
		v1.6.1
		Last Updated: 2010-09-17
		Author: Richard Clark - http://richclarkdesign.com 
		Twitter: @rich_clark
		
		More info: http://html5doctor.com/html-5-reset-stylesheet/
		*/
		
		html, body, div, span, object, iframe,
		h1, h2, h3, h4, h5, h6, p, blockquote, pre,
		abbr, address, cite, code,
		del, dfn, em, img, ins, kbd, q, samp,
		small, strong, sub, sup, var,
		b, i,
		dl, dt, dd, ol, ul, li,
		fieldset, form, label, legend,
		table, caption, tbody, tfoot, thead, tr, th, td,
		article, aside, canvas, details, figcaption, figure, 
		footer, header, hgroup, menu, nav, section, summary,
		time, mark, audio, video {
				margin:0;
				padding:0;
				border:0;
				outline:0;
				font-size:100%;
				vertical-align:baseline;
				background:transparent;
		}
		
		body {
				line-height:1;
		}
		
		article,aside,details,figcaption,figure,
		footer,header,hgroup,menu,nav,section { 
			display:block;
		}
		
		nav ul {
				list-style:none;
		}
		
		blockquote, q {
				quotes:none;
		}
		
		blockquote:before, blockquote:after,
		q:before, q:after {
				content:'';
				content:none;
		}
		
		a {
				margin:0;
				padding:0;
				font-size:100%;
				vertical-align:baseline;
				background:transparent;
		}
		
		/* change colours to suit your needs */
		ins {
				background-color:#ff9;
				color:#000;
				text-decoration:none;
		}
		
		/* change colours to suit your needs */
		mark {
				background-color:#ff9;
				color:#000; 
				font-style:italic;
				font-weight:bold;
		}
		
		del {
				text-decoration: line-through;
		}
		
		abbr[title], dfn[title] {
				border-bottom:1px dotted;
				cursor:help;
		}
		
		table {
				border-collapse:collapse;
				border-spacing:0;
		}
		
		/* change border colour to suit your needs */
		hr {
				display:block;
				height:1px;
				border:0;	 
				border-top:1px solid #cccccc;
				margin:1em 0;
				padding:0;
		}
		
		input, select {
				vertical-align:middle;
		}
		/* @end */
		
		
		body {
			padding: 40px 10px;
			color: #fdfdfd;
			background: #272822;
			font-family: "Proxima Nova", "Heuvetica Neue", Helvetica, Arial, sans-serif;
			font-size: 15px;
			line-height: 1.618em;
		}
		
		section[role="main"] {
			width: 50%;
			min-width: 460px;
			margin: 0 auto;
		}
		
	</style>
</head>

<body>
	<section role="main">
		<?php 
		class managedArray {
			public $out;
			
			function __construct( $data ) {
				$this->out = $data;
			}
			
			public function output() {
				foreach ($this->out as $key => $value) {
					echo "<p><strong>$key</strong> => <span class='value'>$value</span></p>";
				}
			}
		}
		
		$sample_array = array(
			"Lorem" => "Sit",
			"Ipsum" => "Amet",
			"Dolor" => "Consectetur"
		);
		
		$array_obj = new managedArray( $sample_array );
		
		$array_obj->output();
		
		?>
	</section>
</body>
</html>