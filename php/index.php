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
			min-width: 300px;
			max-width: 640px;
			margin: 0 auto;
		}
		
	</style>
</head>

<body>
	<section role="main">
		<?php /*
		class managedArray {
			public $out;
			
			function __construct( $data ) {
				$this->out = $data;
			}
			
			public function output() {
				foreach ($this->out as $key => $value) {
					echo "<pre><p><strong>$key</strong>\t=>\t<span class='value'>$value</span></p></pre>";
				}
			}
		}
		print_r($expression[, $return=false])
		$sample_array = array(
			"Lorem" => "Sit",
			"Ipsum" => "Amet",
			"Dolor" => "Consectetur"
		);
		
		$array_obj = new managedArray( $sample_array );
		
		$array_obj->output();
		
		
		* /
		$start = microtime(true);
		
		function  getNumberOfPrimes( $n) {
			
		    $t = 1;
		    $prime = false;
		    $max = ($n%2 == 0) ? $n-1 : $n;
		    $a = array(2);
		    
		    for($i = 3; $i <= $max; $i = $i + 2) {
            $prime = true;
            foreach($a as $j){
              if ( $j <= ceil(sqrt($i)) ) {
	              if($i % $j == 0) {
	                $prime = false;
	                break;
	              }
              } else {
              	break;
              }
            }

		        if ($prime == true) {
		            $a[]=$i;
		            $t++;
		        }
		    }
		    
		    return $t;
		
		}
		echo "<pre>";
		echo getNumberOfPrimes(10000) . "\n"; ## 1229
		echo "TIME : " . (microtime(true) - $start); ## 0.205440044403
		echo "</pre>";
		*/
		
		$handle = fopen ("php://stdin","r");
		$t = fgets($handle);
		$series = split(' ', fgets($handle));
		
		$diff = array();
		$a = 0;
		$pos = 0;
		
		for($i=0; $i<$t; $i++) {
//			echo $list[$i];
			$diff[] = ( isset($series[$i - 1]) ) ? $series[$i] - $series[$i - 1] : 0;
		}
		
		foreach ($diff as $key => $value) {
			if ($value > $a) {
				$a = $value;
				$pos = $key;
			}
		}
		
$a = $series[$pos] - $a/2;
echo "A = $a";

		
		fclose($handle);
		
		?>
	</section>
</body>
</html>