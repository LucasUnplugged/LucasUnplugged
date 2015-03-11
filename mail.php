<?php

$contact = 0;
$errors = 0;

if($_POST['youSubmit']) {
	$name=$_REQUEST['youName'];
	$email=$_REQUEST['youEmail'];
	$comments=$_REQUEST['youMessage'];
	if($name=="" || $name=="Name")$errors++;
	if($email=="" || $email=="Email"){
		$errors++;
	} else{
		if(!eregi("^[a-z0-9]+([_\\.-][a-z0-9]+)*" ."@"."([a-z0-9]+([\.-][a-z0-9]+)*)+"."\\.[a-z]{2,}"."$",$email)){
			$errors++;
		}
		else{
			list($discard,$domain)=split('@',$email);
			if(!checkdnsrr($domain,'MX'))$errors++;
		}
	}
	if($errors==0){
		$message="A visitor to LucasUnplugged.com has sent a message:\n\n";
		$message.="Name: ".$name."\n";
		$message.="Email: ".$email."\n";
		if ($comments != 'Message') $message.="Message: ".$comments."\n";
		$message=stripslashes($message);
		mail("lucas.castro@gmail.com","LucasUnplugged.com Contact (You Banner)",$message,"From: ".$email);
		
		$contact = true;
		
		echo 'Sent: '. $message;
		
	} else { $contact = false;}

	return $contact;
} elseif ($_POST['footSubmit']) {
	$name=$_REQUEST['footName'];
	$email=$_REQUEST['footEmail'];
	$comments=$_REQUEST['footMessage'];
	if($name=="" || $name=="Name")$errors++;
	if($email=="" || $email=="Email"){
		$errors++;
	} else{
		if(!eregi("^[a-z0-9]+([_\\.-][a-z0-9]+)*" ."@"."([a-z0-9]+([\.-][a-z0-9]+)*)+"."\\.[a-z]{2,}"."$",$email)){
			$errors++;
		}
		else{
			list($discard,$domain)=split('@',$email);
			if(!checkdnsrr($domain,'MX'))$errors++;
		}
	}
	if($errors==0){
		$message="A visitor to LucasUnplugged.com has sent a message:\n\n";
		$message.="Name: ".$name."\n";
		$message.="Email: ".$email."\n";
		if ($comments != 'Message') $message.="Message: ".$comments."\n";
		$message=stripslashes($message);
		mail("lucas.castro@gmail.com","LucasUnplugged.com Contact (Footer)",$message,"From: ".$email);
		
		echo 'Sent: '. $message;
		
		$contact = true;
		
	} else { $contact = false;}

	return $contact;
}
?>