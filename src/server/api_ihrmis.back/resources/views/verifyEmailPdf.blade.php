<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    
    <p>
        From: {{ $recruiter }} &lt;{{ $from_email }}&gt; <br/>
        Date: {{ $from_email }} <br/>
        Subject: {{ $subject }} <br/>
        To: {{ $applicant_email }}

    </p><br/><br/>
    
    <p>Hello {{ $applicant_name }}</p>
    
    <p>Thank you for applaying in the position {{ $position }}</p>
    
    <p>Please confirm your email address to complete your application by clicking the link below</p><br/>
    
    <p>[ <a href="#">Continue application</a> ]</p><br/>
    
    <p>
        If having trouble verifying your email account, you may reply to this email and make sure to describe things exactly as they appear 
        on your screen and/or attach a screenshot  of the page where you see an error message or encounter a problem.
    </p><br/>

    <p>{{ $recruiter }}<br/><i>Department of Science and Technology</i><br/>Gen. Santos Avenue, Bicutan, Taguig</p><br/>
 
    <p>
        DISCLAIMER: If you recieved this email by mistake and didn't initiate such request, please disregard and 
        delete this email immediately; do not use it for any purpose, nor disclose its contents to anyone. 
        This email (including any attachment/s) is confidential and/or may also be legally privileged. The Sender
        cannot guarantee that email transmission are secure or error-free as information may be corrupted, arrive late, 
        or incomplete, or contain viruses and therefore does not accept any liability for any errors or ommissions in the content 
        of this message.
    </p>

</body>
</html>