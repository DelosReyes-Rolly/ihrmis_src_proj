<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Email</title>
</head>

<style>
  .class-name-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5;
  }
</style>

<body>
  <p>
    From: {{ $details['from']}} &lt;{{ $details['email_from']}}&gt; <br/>
    Date: {{ $details['date'] }} <br/>
    Subject: NOTICE OF FILING-UP A VACANT POSITION<br/>
    To: {{ $details['email_to'] }}
  </p><br/>

  {!! $details['message'] !!}

  <p>[ <a href="www.google.com">I am interested in the position</a> ]&emsp;[ <a href="www.google.com">I am not interested in the position</a> ]</p>

  <p>
    DISCLAIMER: This email is intended only for the person to whom it is addressed and/or otherwise authorized personnel 
    The information contained herein and attached is confidential and the property of the sender. If you are not the intended reciepient, 
    please be advise that viewing this message and any attachments, as well as copying, forwarding, printing, and disseminating any 
    information related to this email is prohibited, and that you should not take any action based on the content of this email and/or its attachments. 
    The sender cannot guarantee the email transmissions are secure or error-free as information may be corrupted, arrive late, 
    or incomplete, or contain viruses, and therfore does not accept any liability for any errors or omissions in the content of this message.
  </p>

</body>
</html>