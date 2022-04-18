<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>

<style>
  .table-class, th, td{
    border: 1px solid black;
    border-collapse: collapse;
  }

  th, td{
    padding: 10px
  }

  table{
    width: 100%;
    font-size: 12px;
  }

  h4{
    padding: 0px;
    margin: 0;
    margin-bottom: 3px;
  }

  .align-div{
    text-align: right;
  }
  .align-left{
    text-align: left;
  }
  .align-center{
    text-align: center;
  }

  span{
    
  }
</style>

<body>
  <div class="align-div">
    PD-001 <br>
    Rev.0 / 07-08-2015
  </div>
  <div>
    <div class="align-center">
      <p>Department of Science and Technology <br/> Gen. Santos Avenue, Bicutan, Taguig City</p>
      <h3>JOB VACANCY SPECIFICATION FORM</h3>
    </div><br/>

    {{-- DISPLAY POSITION --}}
    <h4>JOB POSITION</h4>
    <table class="table-class">
      <thead >
        <tr>
          <td class="align-left"><strong>Office/Unit:</strong> {{ $plantilla->tbloffices->ofc_name }}</td>
          <td class="align-left"><strong>Plantilla Item No.:</strong> {{ $plantilla->itm_no }}</td>
        </tr>
        <tr>
          <td class="align-left"><strong>Position Title:</strong> {{ $plantilla->tblpositions->pos_title }}</td>
          <td class="align-left"><strong>Reports to:</strong> {{ $plantilla->tblpositions->pos_title }}</td>
        </tr>
        <tr>
          <td class="align-left"><strong>Salary Grade:</strong> {{ $plantilla->tblpositions->pos_salary_grade }}</td>
          <td class="align-left"><strong>Place of Assignment:</strong> </td>
        </tr>
      </thead>
    </table>
    <br/>
    {{-- DISPLAY CSC STANTDARD--}}
    <h4>CSC QUALIFICATION STANDARDS</h4>
    <table class="table-class">
      <tbody>
        <tr>
          <td><strong>Education:</strong> <br/>{!! $standard['education'] !!}<br/></td>
        </tr>
        <tr>
          <td><strong>Experience:</strong> <br/>{{ $standard['experience'] }}<br/></td>
        </tr>
        <tr>
          <td><strong>Training:</strong> <br/>{{ $standard['training'] }}<br/></td>
        </tr>
        <tr>
          <td><strong>Eligibility:</strong> <br/>{{ $standard['eligibility'] }}<br/></td>
        </tr>
      </tbody>
    </table>
    <br/><br/>
    {{-- DISPLAY DTY RESPO--}}
    <table class="table-class">
      <thead>
        <tr>
          <th class="label-class">DUTIES AND RESPONSIBILITY</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            @foreach( $responsibility ?? '' as $indexKey => $data)
              {{$indexKey + 1 . ". " . $data->dty_jvs_desc }}<br/>
            @endforeach 
          </td>
        </tr>
      </tbody>
    </table>
      <br/><br/>
      {{-- DISPLAY JOB COMPETENCY--}}
    <table class="table-class">
      <thead>
        <tr>
          <th colspan="6" class="label-class">REQUIRED JOB COMPENTENCIES <span>(please check all that apply)</span></th>
        </tr>
        <tr>
          <th class="middle-font">Written<br/>Exam</th>
          <th class="middle-font">Oral<br/>Exam</th>
          <th class="middle-font">Creative<br/>Work</th>
          <th class="middle-font">Analitical<br/>Skills</th>
          <th class="middle-font">Computation<br/>Skills</th>
          <th class="middle-font">Others<br/>(please specify)</th>
        </tr>
      </thead>
      <tbody>
        @for ($i = 0; $i < $required_comp->counter; $i++)
          <tr>
            <td class="align-left">{{ $required_comp->we[$i]->rtg_factor ?? ""}}</td>
            <td class="align-left">{{ $required_comp->oe[$i]->rtg_factor ?? ""}}</td>
            <td class="align-left">{{ $required_comp->cw[$i]->rtg_factor ?? ""}}</td>
            <td class="align-left">{{ $required_comp->as[$i]->rtg_factor ?? ""}}</td>
            <td class="align-left">{{ $required_comp->cs[$i]->rtg_factor ?? ""}}</td>
            <td class="align-left">{{ $required_comp->ot[$i]->rtg_factor ?? ""}}</td>
          </tr>
        @endfor
      </tbody>
    </table>

    <br/>
    {{-- DISPLAY CSC STANTDARD--}}
    <h4>APPROVED BY</h4>
    <table class="table-class">
      <tbody>
        <tr>
          <th class="align-left">Name</th>
          <td class="align-left">{{ $approved['name'] ?? ""}}</td>
        </tr>
        <tr>
          <th class="align-left">Position</th>
          <td class="align-left"></td>
        </tr>
        <tr>
          <th class="align-left">Date</th>
          <td class="align-left">{{ $approved['date'] ?? ""}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  {{-- <div style="page-break-before: always;">
  <h1>ASDFGASD</h1>
  </div> --}}

</body>
</html>