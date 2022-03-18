<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Document</title>
    <style>
        .equal-width td{
            width: 50%;
            text-align: center;
        }

        table{
            width: 100%;
        }

        table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        }

        .text-center{
            text-align: center
        }

        .font-bold {
            font-weight: bold
        }

    </style>
</head>
<body style="font-size: 11px">
    
   <div class="font-bold text-center">
        DOST-CO VACANT POSITION
   </div>

    <p>
        As an advocate of the Equal Employment Opportunity Principle (EEOP), 
        the DOST-Central Office encourages and welcomes all applicants regardless of age, 
        religion, political affiliation including persons with disability, members of indigenous communities, 
        and those from any sexual orientation and gender identities.
    </p>
    <p>For specific guidelines, please see attached Annex.</p><br/>
 
    <table class="equal-width">
        <thead>
            <tr>
                <th rowspan="2">Office / Unit</th>
                <th rowspan="2">Position Title and
                    Salary Grade
                </th>
                <th rowspan="2">Item No.</th>
                <th colspan="4" scope="colgroup">CSC QUALIFICATION STANDARDS (Minimum Requirements)</th>
                <th rowspan="2">Job Description</th>
                <th rowspan="2">Remarks</th>
            </tr>
            <tr>
                <th scope="col">Education</th>
                <th scope="col">Experience</th>
                <th scope="col">Training</th>
                <th scope="col">Eligibility</th>
            </tr>
        </thead>
        <tbody >
            @foreach( $vacantpositions ?? '' as $data)
                <tr>

                    <td>{{ $data->office_name }}</td>
                    <td>{{ $data->position_title }}</td>
                    <td>{{ $data->itm_no }}</td>
                    <td>{{ $data->itm_no }}</td>
                    <td>{{ $data->itm_no }}</td>
                    <td>{{ $data->itm_no }}</td>
                    <td>{{ $data->itm_no }}</td>
                    <td>{{ $data->itm_function }}</td>
                    <td>{{ $data->itm_no }}</td>
                </tr>
            @endforeach 
        </tbody>
    </table>
</body>
</html>