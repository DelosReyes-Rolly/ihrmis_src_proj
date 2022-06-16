<!DOCTYPE html>
<!-- Created by pdf2htmlEX (https://github.com/pdf2htmlEX/pdf2htmlEX) -->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8"/>
<meta name="generator" content="pdf2htmlEX"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
     <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        overflow:hidden;padding:5px 5px;word-break:normal;}

        .tg .td-custom-padding{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        overflow:hidden;padding:0px 5px;word-break:normal;}

        .tg .td-custom-padding1{border-color:#ffffff;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        overflow:hidden;padding-top:0px 3px;word-break:normal;}


        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-km2t{border-color:#ffffff;font-weight:bold;text-align:left;text-justify:distribute: fit-content}
        .tg .tg-zv4m{border-color:#ffffff;text-align:justify;vertical-align:top}
        .tg .tg-zv4m1{border-color:#ffffff;vertical-align:top}
        .tg .tg-8jgo{border-color:#ffffff;vertical-align:top;padding-left: 15%}
        .tg .tg-8jgo1{border-color:#ffffff;vertical-align:top;}
        .tg .tg-b8y7{border-color:#ffffff;font-size:20px;text-align:center;vertical-align:top}

        /* table position/salary grade */
        .tg1  {border-collapse:collapse;border-spacing:0;text-align: center}
        .tg1 td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg1 th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
        font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg1 .tg-zv4m{text-align:left;vertical-align:top;}
        .tg1 .tg-8jgo{text-align:center;vertical-align:top;width: 20px}
        .tg1 .tg-8jgo1{border-bottom:none;text-align:left;vertical-align:bottom;padding:0px 5px;}
        .tg1 .tg-aw21{font-weight:bold;text-align:center;vertical-align:top}
        
    </style>
</head>
<body>
    <table class="tg">
        <thead>
            <tr>
                <th class="tg-b8y7"><span style="font-weight:bold">MEMORANDUM</span></th>
                <th class="tg-zv4m"></th>
                <th class="tg-zv4m"></th>
                <th class="tg-zv4m"></th>
            </tr>
        </thead>
        <tbody>
          
            <tr>
                <td class="tg-8jgo">FOR</td>
                <td class="tg-8jgo1">:</td>
                {{ $i=1 }}
                @foreach( $selected_agencies ?? '' as $data) 
                    @if($i === 1)
                        <td class="tg-zv4m">
                            <b>{{ $data->agn_head_name .', '}}</b><br>
                            @if($memo == "DOST")
                                {{$data->agn_head_position . ", " . $data->agn_acronym}}
                            @else
                                {{$data->agn_head_position }} <br>
                                {{ $data->office['ofc_name'] .", " .  $data->agn_acronym}}
                            @endif
                        </td>
                    @endif
                    @if($i > 1)
                        <tr>
                            <td class="tg-zv4m"></td>
                            <td class="tg-zv4m"></td>
                            <td class="td-custom-padding1">
                                <b>{{ $data->agn_head_name . ', ' }}</b><br>
                                @if($memo == "DOST")
                                    {{$data->agn_head_position . ", " . $data->agn_acronym}}
                                @else
                                    {{$data->agn_head_position }} <br>
                                    {{ $data->office['ofc_name'] .", " .  $data->agn_acronym}}
                                @endif
                            </td>
                        </tr>
                    @endif

                    {{ $i++; }}
                @endforeach
            </tr>
            {{-- From DATA --}}
            <tr>
                <td class="tg-8jgo">FROM</td>
                <td class="tg-8jgo1">:</td>
                <td class="tg-zv4m1">
                    <b>{{$memo_from_name['memo_name']}}</b><br>
                    {{-- {{ explode("and", $memo_from_name['memo_position'])[0] . "and" }} <br> 
                    {{ explode("and", $memo_from_name['memo_position'])[1]}},  --}}
                    {{ $memo_from_name['memo_position'] }}, 
                    {{ $memo_from_name['memo_office'] }}
                </td>
            </tr>
            <tr>
                <td class="tg-8jgo">DATE</td>
                <td class="tg-8jgo1">:</td>
                <td class="tg-zv4m">{{ $date_memo }}</td>
            </tr>
            <tr>
                <td class="tg-8jgo">SUBJECT</td>
                <td class="tg-8jgo1">:</td>
                <td class="tg-km2t">POSTING OF ANNOUNCEMENT OF VACANCY</td>
            </tr>
            <tr>
                <td class="tg-zv4m"></td>
                <td class="tg-zv4m"></td>
                <td class="tg-zv4m"></td>
            </tr>
            <tr>
                <td style="border-color: #ffffff;border-bottom-color: black" colspan="4"></td>
            </tr>
            <tr>
                <td class="tg-zv4m" style="border-color: #ffffff;border-top-color: black" colspan="4">
                    Pursuant to Sec. 25, Rule VII of the Civil Service Commission Memorandum Circular No. 14, 
                    Series of 2018, titled “2017 Omnibus Rules on Appointments and Other Human Resource Actions, 
                    Revised July 2018”, may we request your favorable consideration for the posting of the 
                    following vacant position of the <b>Department of Science and Technology Central Office</b> in your 
                    respective bulletin boards and agency websites:
                </td>
            </tr>
            
        </tbody>
    </table>
    <table class="tg1" style="table-layout: fixed; width: 573px;margin-left: 8%">
        <colgroup>
        <col style="width: 34px">
        <col style="width: 315px">
        <col style="width: 224px">
        </colgroup>
        <thead>
        <tr>
            <th class="tg-aw21" colspan="2">Position Title / Salary Grade</th>
            <th class="tg-aw21">Place of Assignment</th>
        </tr>
        </thead>
        <tbody>
            {{ $i=1; }}
            @foreach( $vacantpositions ?? '' as $data) 
           
            <tr>
                <td class="tg-8jgo" rowspan="2">{{ $i . '.' }}</td>
                <td class="tg-8jgo1">
                    {{ $data->tblpositions->pos_title .'/ SG-'. $data->tblpositions->pos_salary_grade }}
                </td>
                <td class="tg-zv4m" rowspan="2">{{ $data->tbloffices->ofc_name }}</td>
            </tr>
            <tr>
                <td style="border-top:none;text-align:left;vertical-align:top">
                    {{ $data->itm_no }}
                </td>
            </tr>
            {{ $i++; }}
            @endforeach
        </tbody>
    </table>
    <br>
    <div style="font-family:Arial, sans-serif;font-size:14px"> 
        Thank you.
    </div>
</body>
</html>
