<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Mail</title>
</head>

<body>
    <div style="width:80%;margin:auto;">
      <p>
          From: {{ $details['from'] }} < {{ $details['email_from'] }} > <br />
              Date: {{ date("D M j, Y \a\t g:i a") }} <br />
              Subject: {{ $details['message_type'] }}<br />
              To: {{ $details['email_to'] }}
      </p><br />
      {!! $details['message'] !!}<br />
    </div>
</body>

</html>

<style>
    .pre-line-css {
        white-space: pre-line;
    }
</style>
