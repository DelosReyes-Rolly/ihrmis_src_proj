<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Next-in-Rank Memo</title>
</head>

<style>
  .header-tag{
    font-weight: bold;
  }

  table{
    width: 100%;
  }
  td{
    vertical-align: top;
  }

  .table-container{
    margin: 0px 100px;
  }

  .text-left{
    text-align: left;
    padding-top: 20px
  }

  .text-center{
    text-align: center;
  }

  .border-table-bot{
    border-bottom: 1px solid black;
  }
</style>

<body>
  <p class="header-tag">MEMORANDUM</p>
  <table>
    <tbody>
      <tr>
        <td>FOR:</td>
        <td>{!! $employee !!}</td>
      </tr>
      <tr>
        <td>FROM:</td>
        <td><strong>ATTY. ANGEL P. MEDALLE-ALVIAR</strong><br>Attorny V. Legal Division, and<br>Officer-in-Charge, Office of the Director<br>Administrative and Legal Service</td>
      </tr>
      <tr>
        <td>DATE:</td>
        <td>{{ $date_now }}</td>
      </tr>
      <tr>
        <td>SUBJECT:</td>
        <td>{{$title}}</td>
      </tr>
    </tbody>
  </table>
  <hr/>
  <p>
    Please be informed that one (1) vacant position of <strong>{{$title}}, SG-{{ $grade }},
    Item No. {{ $item }}</strong>, under the Special Projects Division, Office of the
    Undersecretary for R&D, was published on _______________________ and is scheduled for
    filling up.
    <br/><br/>
    As next-in-rank employee to the aforesaid vacant position as indicated in the approved DOST-
    Central Office (DOST-CO) System of Ranking Positions (SRP), please be informed that you are
    
    considered as one of the candidates who will be evaluated by the Human Resource Merit
    Promotion and Selection Board (HRMPSB) pursuant to the Merit Selection Plan (MSP) of the
    DOST. To comply with the requirements of the MSP, please indicate your decision within five (5)
    days upon receipt of this letter by checking the appropriate choice shown below and affixing your
    signature on the space provided herein:
  </p>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="text-center">Signature / Date</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <th class="text-left">I am interested in the position</th>
          <td class="border-table-bot"></td>
        </tr>
        <tr>
          <th class="text-left">I am not interested in the position</th>
          <td class="border-table-bot"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    If you are interested to apply, please submit to the Personnel Division the following documents,
    for evaluation:
    <span>
      <ol>
        <li>Letter of Application.</li>
        <li>Personal Data Sheet (CSC Form 212, Revised 2017) with latest passport-sized picture with name tag and Work Experience Sheet.</li>
        <li>Certificate of Trainings/Seminars and Awards.</li>
        <li>Performance Rating for the last rating period.</li>
      </ol>
    </span>


    However, if you are not interested, please return this Memorandum to the Personnel Division
    duly accomplished for record and monitoring purposes. Further, <u>if we do not receive any
      response from you, we would take it to mean that you are not interested to apply for the subject
      position.</u><br/><br/>
    Thank you.
  </p>
</body>
</html>