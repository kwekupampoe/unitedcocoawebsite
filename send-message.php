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
    
    // Email subject
    $subject = 'New Message from Contact Form';
    
    // HTML email body
    $htmlBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .header {
                background-color: #4b3621;
                color: white;
                padding: 15px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
                background-color: #f9f9f9;
            }
            .field {
                margin-bottom: 15px;
            }
            .label {
                font-weight: bold;
                color: #4b3621;
            }
            .message-box {
                background-color: white;
                padding: 15px;
                border-left: 4px solid #4b3621;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ddd;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
                <div class="field">
                    <span class="label">Name:</span> ' . $name . '
                </div>';
                
    if (!empty($company)) {
        $htmlBody .= '
                <div class="field">
                    <span class="label">Company:</span> ' . $company . '
                </div>';
    }
    
    $htmlBody .= '
                <div class="field">
                    <span class="label">Email:</span> <a href="mailto:' . $email . '">' . $email . '</a>
                </div>
                <div class="field">
                    <span class="label">Phone:</span> ' . $phone . '
                </div>
                <div class="field">
                    <span class="label">Message:</span>
                    <div class="message-box">
                        ' . nl2br($message) . '
                    </div>
                </div>
            </div>
            <div class="footer">
                This email was sent from the contact form on United Cocoa Ltd website.
            </div>
        </div>
    </body>
    </html>';
    
    // Plain text alternative
    $plainBody = "Name: $name\n";
    if (!empty($company)) {
        $plainBody .= "Company: $company\n";
    }
    $plainBody .= "Email: $email\n";
    $plainBody .= "Phone: $phone\n\n";
    $plainBody .= "Message:\n$message\n";
    
    // Email headers
    $headers = "From: United Cocoa Contact Form <noreply@unitedcocoaltd.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/alternative; boundary=\"boundary\"\r\n";
    
    // Email content with multipart boundary
    $message = "--boundary\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $plainBody . "\r\n\r\n";
    $message .= "--boundary\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $message .= $htmlBody . "\r\n\r\n";
    $message .= "--boundary--";
    
    // Send email and store result
    $emailSent = mail($to, $subject, $message, $headers);
    
    // Set session variable for success/error message
    session_start();
    if ($emailSent) {
        $_SESSION['contact_message'] = 'success';
    } else {
        $_SESSION['contact_message'] = 'error';
    }
    
    // Redirect back to contact page
    header('Location: contact.php');
    exit;
    
} else {
    // Redirect back to contact page if accessed directly
    header('Location: contact.php');
    exit;
}
?>


<?php
session_start();

// Check if we have a message to display
if (isset($_SESSION['contact_message'])) {
    if ($_SESSION['contact_message'] === 'success') {
        echo '<div style="color: green; padding: 10px; background-color: #e8f5e9; border-radius: 5px; text-align: center; margin-bottom: 20px;">
                <strong>Success!</strong> Your message has been sent successfully. We will get back to you soon.
              </div>';
    } else {
        echo '<div style="color: #721c24; padding: 10px; background-color: #f8d7da; border-radius: 5px; text-align: center; margin-bottom: 20px;">
                <strong>Error!</strong> Failed to send your message. Please try again later.
              </div>';
    }
    
    // Clear the message so it doesn't show again on refresh
    unset($_SESSION['contact_message']);
}
?>