<?php
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = $_POST['message'];
$from = 'From: BPlaced contact form';
$to = 'matthiasbarde@gmx.de';
$subject = 'From BPlaced contact form';

$body = "From: $name\n E-Mail: $email\n Message:\n $message";

if ($name != '' && $email != '' && $message != '') {
	if (mail($to, $subject, $body, $from)) {
    	# don't do anything, empty response, means OK
	} else {
    	echo print_r(error_get_last());
  }
} else {
    echo '<p>You need to fill in all fields!</p>';
}
?>
