<?php
// PHP extensions Mail and Net_SMTP must be installed. If they are not already
// installed, install them by PEAR:
// > pear install Mail
// > pear install Net_SMTP
// SSL must be allowed. On Windows you should uncomment line in php.ini:
//		extension=php_openssl.dll
// If you use smtp.gmail.com as smpt host then use:
//		https://accounts.google.com/DisplayUnlockCaptcha
// and allow access for less secure apps:
//		https://www.google.com/settings/security/lesssecureapps
//		
// =============================================================================
// NOTES
// contact.php – is a script for a web servers with php support.
// Extensions which required for this script are often installed by default.
// If they are not already installed, the easiest way to do this using PEAR.
// Learn more about PEAR http://pear.php.net/.
// Editing the php.ini required only on Windows. On other operating systems this
// is usually not required. Location of this file depends on settings of web
// server.
// Also, your web server should not be denied access to external mail servers.
// On the majority of paid and on many free hostings (eg OpenShift:
// https://www.openshift.com/) all these features are available. 
// =============================================================================

require_once "Mail.php";
// Change this options:
$username = 'user@gmail.com';
$password = 'password';
$smtpHost = 'ssl://smtp.gmail.com';
$smtpPort = '465';
$to = 'user@gmail.com';
$from = 'user@gmail.com';

$subject = 'Contact Form';
$successMessage = 'Message successfully sent!';

$replyTo = $_POST['your-email'];
$name = $_POST['your-name'];
$body = $_POST['your-message'];

$headers = array(
	'From' => $name . " <" . $from . ">",
	'Reply-To' => $name . " <" . $replyTo . ">",
	'To' => $to,
	'Subject' => $subject
);
$smtp = Mail::factory('smtp', array(
			'host' => $smtpHost,
			'port' => $smtpPort,
			'auth' => true,
			'username' => $username,
			'password' => $password
		));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
	echo($mail->getMessage());
} else {
	echo($successMessage);
}
?>