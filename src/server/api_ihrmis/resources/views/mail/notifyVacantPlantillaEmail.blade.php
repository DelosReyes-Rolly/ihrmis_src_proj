<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notify Vacant Plantilla</title>
</head>
<body>
    <p>
        From: {{ env("MAIL_FROM_RECUITER")  $details['from']}} &lt;{{ env("MAIL_FROM_RECRUITER") $details['from_to']}}&gt; <br/>
        Date: <span id="current_date"></span> <br/>
        Subject: Notice To Fill A Job Vacancy<br/>
        To: {{ $details['email_to'] }}

    </p><br/><br/>
    
    {{ $details['message'] }}<br/>

    <p>Here is the link to the Job Vacancy Specification and Criteria Rating Form:</p><br/>

    <p>[ <a href="www.google.com">Continue application</a> ]</p><br/>
    
    <p>{{ $details['sender'] }}</p>
</body>
</html>

<script>
    document.getElementById("current_date").innerHTML = Date();
</script>