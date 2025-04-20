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
    $subject = 'New Message from the Website Contact Form';
    
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
    $emailMessage = "--boundary\r\n";
    $emailMessage .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $emailMessage .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $emailMessage .= $plainBody . "\r\n\r\n";
    $emailMessage .= "--boundary\r\n";
    $emailMessage .= "Content-Type: text/html; charset=UTF-8\r\n";
    $emailMessage .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $emailMessage .= $htmlBody . "\r\n\r\n";
    $emailMessage .= "--boundary--";
    
    // Send email
    $emailSent = mail($to, $subject, $emailMessage, $headers);
    
    // Determine the contact page URL
    // Option 1: Get referring page
    $contactPage = $_SERVER['HTTP_REFERER'] ?? '';
    
    // Option 2: If referer is not available, try to construct URL
    if (empty($contactPage)) {
        // Remove the filename from the current script path to get directory
        $directory = dirname($_SERVER['PHP_SELF']);
        // Construct URL to contact page (assuming it's named contact.html, .php, etc.)
        // Try multiple common filenames
        $possibleFiles = ['contact.html', 'contact.php', 'index.html', 'index.php'];
        
        // Default to site root if we can't determine the page
        $contactPage = '/';
    }
    
    // Add query parameter for status message
    $redirectUrl = $contactPage . (strpos($contactPage, '?') ? '&' : '?') . 'status=' . ($emailSent ? 'success' : 'error');
    
    // JavaScript redirect (more reliable than header redirect in some cases)
    echo '<script>window.location.href = "' . $redirectUrl . '";</script>';
    
    // Fallback for if JavaScript is disabled
    echo '<p>Message ' . ($emailSent ? 'sent' : 'failed') . '. <a href="' . $contactPage . '">Click here</a> to return to the contact page.</p>';
    exit;
    
} else {
    // If accessed directly, try to redirect to contact page
    echo '<p>Invalid request. <a href="/">Click here</a> to return to the homepage.</p>';
    exit;
}
?>