<?php

include	"wp-config.php";

date_default_timezone_set('Asia/Jakarta');
// print	date("d-m-Y h:i:s",	strtotime("-6 Hours"));
$tbd	=	date("Y-m-d",	strtotime("-6 Hours"));

$url	=	"https://script.google.com/macros/s/AKfycbyWCsFFH996W_E3t3QjK5JznK4LrhAUcLK8lm_BG4JC6o_qq9o/exec"
	.	"?g=1"
	.	"&start="	.	$tbd
	.	"&end="	.	$tbd;

$response	=	wp_remote_get($url,	array('timeout'	=>	5,	'redirection'	=>	5));

if	(is_array($response))	{
	$header	=	$response['headers'];	// array of http header lines
	$body	=	$response['body'];	// use the content
	$json_analytics	=	json_decode($body);
	print	json_encode($json_analytics,	JSON_PRETTY_PRINT);
}
