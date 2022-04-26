<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>

  <style>
    table{
      width: 100%;
      font-size: 12px;
    }
    .table-class, th, td{
      border: 1px solid black;
      border-collapse: collapse;
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

    .no-border {
      border: none;
      padding: 0;
      margin: 0;
    }

    .position-office{
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .col-po-item{
      width: 50%;
    }

  </style>

  <body>
    <div class="align-div">PD-001 <br> Rev.0 / 07-08-2015</div>

    <div class="align-center">
      <p>Department of Science and Technology<br>Gen. Santos Avenue, Bicutan, Taguig City</p>
      <h3>CRITERIA RATING WORKSHEET FORM</h3>
    </div>
    <br><br>
    <table>
      <tbody>
        <tr>
          <td class="no-border" style="width: 50%">Position Title: <u>{{ $plantilla->tblpositions->pos_title ?? "_____________________________"}}</u></td>
          <td class="no-border">Office: <u>{{ $plantilla->tbloffices->ofc_name ?? "_____________________________________"}}</u></td>
        </tr>
      </tbody>
    </table>
    <br>
    <table class="table-class">
      <thead>
        <tr>
          <th>Selection Criterion<br></th>
          <th>Relevant Education</th>
          <th>%</th>
          <th>Relevant Training</th>
          <th>%</th>
          <th>Relevant Experience</th>
          <th>%</th>
          <th>Job Competency<br></th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Maximum Factor Weight</th>
          <td class="align-center" colspan="2">{{ $required_comp->edMaxMin[0] ?? ""}}</td>
          <td class="align-center" colspan="2">{{ $required_comp->trMaxMin[0] ?? ""}}</td>
          <td class="align-center" colspan="2">{{ $required_comp->exMaxMin[0] ?? ""}}</td>
          <td class="align-center" colspan="2"></td>
        </tr>
        @if ($required_comp->counter == 0)
          <tr>
            <th>Calibrated Scale of Factor Weight </th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        @else
          @for($i = 0; $i < $required_comp->counter; $i++)
            <tr>
              @if ($i == 0)
                <th rowspan={{ $required_comp->counter }}>Calibrated Scale of Factor Weight </th>
              @endif
              {{-- ed --}}
              <td>{{ $required_comp->ed[$i]->rtg_factor ?? ""}}</td>
              <td class="align-center">{{ $required_comp->ed[$i]->rtg_percent ?? ""}}</td>
              {{-- tr --}}
              <td>{{ $required_comp->tr[$i]->rtg_factor ?? ""}}</td>
              <td class="align-center">{{ $required_comp->tr[$i]->rtg_percent ?? ""}}</td>
              {{-- ex --}}
              <td>{{ $required_comp->ex[$i]->rtg_factor ?? ""}}</td>
              <td class="align-center">{{ $required_comp->ex[$i]->rtg_percent ?? ""}}</td>
              {{-- com --}}
              <td>{{ $required_comp->jobComp[$i]->rtg_factor ?? ""}}</td>
              <td class="align-center">{{ $required_comp->jobComp[$i]->rtg_percent ?? ""}}</td>
            </tr>
          @endfor
        @endif
        
        <tr>
          <th>Minimum Factor Weight</th>
          <td class="align-center" colspan="2">{{ $required_comp->edMaxMin[1] ?? ""}}</td>
          <td class="align-center" colspan="2">{{ $required_comp->trMaxMin[1] ?? ""}}</td>
          <td class="align-center" colspan="2">{{ $required_comp->exMaxMin[1] ?? ""}}</td>
          <td class="align-center" colspan="2"></td>
        </tr>
        <tr>
          <th>Minimum Qualification Standard</th>
          <td colspan="2">{!! $standard['education'] !!}</td>
          <td colspan="2">{!! $standard['experience'] !!}</td>
          <td colspan="2">{!! $standard['training'] !!}</td>
          <td colspan="2">{!! $standard['eligibility'] !!}</td>
        </tr>
      </tbody>
      </table>
      <br/>
      <table>
        <tbody>
          <tr>
            <td class="no-border">Prepared by:</td>
            <td class="no-border">Approved by:</td>
          </tr>
          <tr>
            <td class="no-border"><br/><br/>
              <img style="width: 200px" src="{{ $prepared['sign'] }}"  alt="pre_sign">
              {{ $prepared['sign'] }}
              {{ $prepared['name'] ?? "" }}
              <hr style="width: 50%; text-align: left"/>
             <br/>(Position/Designation)
            </td>
            <td class="no-border"><br/><br/>
              {{ $approved['name']  ?? "" }}
              <hr style="width: 50%; text-align: left" />
              <br/>(Position/Designation)
            </td>
          </tr>
        </tbody>
      </table>
      <br/>
      <table>
        <tbody>
          <tr>
            <td class="no-border">Date:</td>
            <td class="no-border">Date:</td>
          </tr>
          <tr>
            <td class="no-border" style="width: 50%;"><br/>
              <p>{{ $prepared['date'] ?? ""}}</p>
              <hr style="width: 50%; text-align: left">
            </td>
            <td class="no-border" style="width: 50%;"><br/>
                <p>{{ $approved['date'] ?? ""}}</p>
                <hr style="width: 50%; text-align: left">
            </td>
          </tr>
        </tbody>
      </table>


  </body>
</html>