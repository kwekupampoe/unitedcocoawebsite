<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['firstname']);
    $lastName = htmlspecialchars($_POST['lastname'] ?? '');
    if (!empty($lastName)) {
        $name .= ' ' . $lastName;
    }
    
    $company = htmlspecialchars($_POST['company'] ?? '');
    $phone = htmlspecialchars($_POST['phonenumber']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // Recipient email
    $to = 'david@unitedcocoaltd.com';
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Email subject
    $subject = 'New Message from Contact Form';
    
    // Email body
    $body = "Name: $name\n";
    if (!empty($company)) {
        $body .= "Company: $company\n";
    }
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n\n";
    $body .= "Message:\n$message\n";
    
    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo 'Message sent successfully!';
    } else {
        echo 'Failed to send message.';
    }
} else {
    echo "Invalid request.";
}
?>