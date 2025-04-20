<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $name = htmlspecialchars($_POST['firstname']);
    $lastName = htmlspecialchars($_POST['lastname'] ?? '');
    if (!empty($lastName)) {
        $name .= ' ' . $lastName;
    }

    $company = htmlspecialchars($_POST['company'] ?? '');
    $phone = htmlspecialchars($_POST['phonenumber']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // SMTP server settings
        $mail->isSMTP();
        $mail->Host       = 'mail.unitedcocoaltd.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'david@unitedcocoaltd.com'; 
        $mail->Password   = 'Davidmensah';    
        $mail->SMTPSecure = 'ssl';
        $mail->Port       =  465;

        // Recipients
        $mail->setFrom($email, $name);
        // $mail->addAddress('your-email@gmail.com'); 

        // Email content
        $mail->isHTML(false);
        $mail->Subject = 'New Message from Contact Form';
        $mail->Body    = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";

        $mail->send();
        echo 'Message sent successfully!';
    } catch (Exception $e) {
        echo "Failed to send message. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
?>
