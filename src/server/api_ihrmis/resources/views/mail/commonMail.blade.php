<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mail</title>
</head>

<body>
    <p>
        From: {{ $details['from'] }} &lt;{{ $details['email_from'] }}&gt; <br />
        Date: {{ $details['date'] }} <br />
        Subject: {{ $details['message_type'] }}<br />
        To: {{ $details['email_to'] }}
    </p><br />

    {!! $details['message'] !!}<br />

    <p class="pre-line-css">{!! $details['sender'] !!}</p>
</body>

</html>

<style>
    .pre-line-css {
        white-space: pre-line;
    }
</style>
