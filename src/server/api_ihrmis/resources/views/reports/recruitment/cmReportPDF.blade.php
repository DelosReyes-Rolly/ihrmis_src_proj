<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASSESSMENT OF PRE-QUALIFIED APPLICANTS</title>
    <style>
        .w100 {
            width: 100%;
        }

        .w75 {
            width: 75%;
        }

        .w65 {
            width: 65%;
        }

        .w50 {
            width: 50%;
        }

        .w30 {
            width: 30%;
        }

        .w25 {
            width: 25%;
        }

        .w20 {
            width: 20%;
        }

        .w15 {
            width: 15%;
        }

        .w10 {
            width: 10%;
        }

        .center {
            text-align: center;
        }

        .dfs {
            font-size: 9px;
        }

        .ml-2 {
            margin-left: 1em;
        }

        .table {
            border-collapse: collapse;
            border-spacing: 0;
        }

        .td {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 9;
            font-weight: normal;
            overflow: hidden;
            padding: 10px 5px;
            word-break: normal;
        }

        .mb30 {
            margin-top: 100px
        }

        .nmp {
            padding: 0px;
            margin: 0px;
            width: 100%;
            height: 100%;
        }

        .tdInner {
            width: 33%;
            font-family: Arial, sans-serif;
            font-size: 9;
            font-weight: normal;
            overflow: hidden;
            padding: 5px 0px;
            word-break: normal;
        }

        .th {
            font-weight: bold;
        }
    </style>
</head>

<body class="dfs" style="font-family: Arial, Helvetica, sans-serif">
    <?php
    $eligibility_array = [];
    $eligibility_array[] = 'No Eligibility';
    $eligibility_array[] = 'Professional';
    $eligibility_array[] = 'Sub-professional';
    $eligibility_array[] = 'Board / Bar';
    $eligibility_array[] = 'Barangay Health Worker';
    $eligibility_array[] = 'Barangay Official';
    $eligibility_array[] = 'Barangay Nutrition Scholar';
    $eligibility_array[] = 'Electronic Data Processing Specialist (EDPS)';
    $eligibility_array[] = 'Honor Graduate';
    $eligibility_array[] = 'Foreign School Honor Graduate';
    $eligibility_array[] = 'Scientific and Technological Specialist';
    $eligibility_array[] = 'Veteran Preference Rating';
    $eligibility_array[] = 'Sanggunian Member';
    $eligibility_array[] = 'Skill Eligibility';
    
    $education_level = [];
    $education_level[] = 'N/A';
    $education_level[] = 'Elementary';
    $education_level[] = 'Secondary';
    $education_level[] = 'Vocational/Trade';
    $education_level[] = 'Bachelor of Science';
    $education_level[] = 'PhD';
    
    $civilStatus = [];
    $civilStatus['SG'] = 'Single';
    $civilStatus['MR'] = 'Married';
    $civilStatus['WD'] = 'Widowed';
    $civilStatus['SP'] = 'Separated';
    ?>
    <htmlpageheader name="header">
        <h4 class="w100 center"><b>ASSESSMENT OF PRE-QUALIFIED APPLICANTS</b></h4>
        <div class="w100">
            <table class="w100 dfs" style="float: left;">
                <tr>
                    <td class="w15">Office / Division</td>
                    <td style="width: 2%;">:</td>
                    <td class="w20">{{ $office }}</td>
                    <td class="w20"></td>
                    <td style="width: 43%;"><b>Qualification Standards - Minimum Requirements</b> (As Published)</td>
                </tr>
                <tr>
                    <td class="w15">Pos. Title/ Sal. Grade</td>
                    <td style="width: 2%;">:</td>
                    <td class="w20"><b>{{ $pos_title . ' / SG-' . $salary }}</b></td>
                    <td class="w10"></td>
                    <td style="width: 43%;">
                        <p class="ml-2">a. &nbsp; Education : &nbsp; {{ $requirements['edu'] }}</p>
                    </td>
                </tr>
                <tr>
                    <td class="w15">Item No.</td>
                    <td style="width: 2%;">:</td>
                    <td class="w20"><b>{{ $item_no }}</b></td>
                    <td class="w10"></td>
                    <td style="width: 43%;">
                        <p class="ml-2">b. &nbsp; Experience : &nbsp; {{ $requirements['exp'] }}</p>
                    </td>
                </tr>
                <tr>
                    <td class="w15">Salary Per Mo</td>
                    <td style="width: 2%;">:</td>
                    <td class="w20">N/A</td>
                    <td class="w10"></td>
                    <td style="width: 43%;">
                        <p class="ml-2">c. &nbsp; Training : &nbsp; {{ $requirements['trn'] }}</p>
                    </td>
                </tr>
                <tr>
                    <td class="w15"></td>
                    <td style="width: 2%;"></td>
                    <td class="w20"></td>
                    <td class="w10"></td>
                    <td style="width: 43%;">
                        <p class="ml-2">d. &nbsp; Eligibility : &nbsp; {{ $requirements['eli'] }}</p>
                    </td>
                </tr>
            </table>
        </div>
    </htmlpageheader>
    <htmlpagefooter name="footer">
        <p class="center">{PAGENO}</p>
    </htmlpagefooter>
    <sethtmlpageheader name="header" value="on" show-this-page="1" />
    <sethtmlpagefooter name="footer" value="on" />
    <table class="w100 table ">
        <thead>
            <tr>
                <th class="td th" rowspan="3">NO.</th>
                <th class="td th" rowspan="3">NAME OF CANDIDATE<br>AGE / CIVIL STATUS/</th>
                <th class="td th" rowspan="3">SEX</th>
                <td class="td th center" rowspan="3">ELIGIBILITY</td>
                <th class="td th center" colspan="8">END - USER</th>
                <th class="td th" rowspan="2">SUB - TOTAL</th>
                <th class="td th center" colspan="6">HRMPSB</th>
                <th class="td th" rowspan="2">SUB - TOTAL</th>
                <th class="td th" rowspan="2">TOTAL 100%</th>
            </tr>
            <tr>
                <th class="td th center" colspan="2">EDUCATION - 10%</th>
                <th class="td th center" colspan="2">RELEVANT EXPERIENCE - 15%</th>
                <th class="td th center" colspan="2">RELEV. TRAINING 10%</th>
                <th class="td th center" colspan="2">JOB COMPETENCY - 30%</th>
                <th class="td th center" colspan="2">ATTRIBUTES - 25%</th>
                <th class="td th center" colspan="2">COMMEND.ACCOMP. - 5%</th>
                <th class="td th center" colspan="2">PERFORMANCE - 5%</th>
            </tr>
            <tr>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center">Score</th>
                <th class="td th center"></th>
                <th class="td th center"></th>
            </tr>
        </thead>
        <tbody>
            <?php $counter = 1; ?>
            @foreach ($applicants as $applicant)
                {
                <?php
                $competencyMessage = '';
                $competencyScore = 0;
                $array = [];
                $converter = [];
                $converter['AS'] = 'Analytical Skills, ';
                $converter['CW'] = 'Creative Work, ';
                $converter['CS'] = 'Computational Skills, ';
                $converter['OE'] = 'Oral Exam, ';
                $converter['WE'] = 'Written Exam, ';
                $converter['OT'] = 'Other, ';
                foreach ($applicant->TblcmptncyRatings as $data) {
                    if (isset($converter[$data->rtg_com_type])) {
                        $array[$data->rtg_com_type] = $converter[$data->rtg_com_type];
                    }
                }
                foreach ($array as $key => $value) {
                    if ($value != null) {
                        $competencyMessage .= $value;
                    }
                }
                foreach ($applicant->TblCmptcyScore as $data) {
                    if (isset($converter[$data->com_type])) {
                        $competencyScore += $data->com_ass_score;
                    }
                }
                $attributeCount = 0;
                $commendableCount = 0;
                $performanceCount = 0;
                $attributesAverage = 0;
                $commendableAverage = 0;
                $performanceAverage = 0;
                foreach ($applicant->TblHrmpsbScore as $scores) {
                    switch ($scores->hrmpsb_type) {
                        case 1:
                            $attributeCount++;
                            $attributesAverage += $scores->hrmpsb_score;
                            break;
                        case 2:
                            $commendableCount++;
                            $commendableAverage += $scores->hrmpsb_score;
                            break;
                        case 3:
                            $performanceCount++;
                            $performanceAverage += $scores->hrmpsb_score;
                            break;
                        default:
                            break;
                    }
                }
                $attributes = $attributesAverage / $attributeCount;
                $commendable = $commendableAverage / $commendableCount;
                $performance = $performanceAverage / $performanceCount;
                $hrmpsbTotal = $attributes + $commendable + $performance;
                $raSubTotal = $competencyScore + $applicant->TblAssessments->ass_education + $applicant->TblAssessments->ass_experience + $applicant->TblAssessments->ass_training;
                $total = $hrmpsbTotal + $raSubTotal;
                
                $attributeMessage = $applicant->TblAssessments->ass_attribute;
                $commendableMessage = $applicant->TblAssessments->ass_accomplishment;
                $performanceMessage = $applicant->TblAssessments->ass_performance;
                ?>
                <tr>
                    <td class="td center">{{ $counter++ }}</td>
                    <td class="td">
                        <b>
                            {{ $applicant->TblapplicantsProfile->app_nm_last }},
                            {{ $applicant->TblapplicantsProfile->app_nm_first }}
                            {{ $applicant->TblapplicantsProfile->app_nm_ext != null ? ' ' . $applicant->TblapplicantsProfile->app_nm_ext : '' }}
                            {{ strtoupper(substr($applicant->TblapplicantsProfile->app_nm_mid, 0, 1)) }}.<br>
                        </b>
                        {{ \Carbon\Carbon::parse($applicant->TblapplicantsProfile->app_birth_date)->age . ' years old' }}
                        <br>
                        @php
                            $civilStatus['OT'] = $applicant->TblapplicantsProfile->app_civil_others;
                        @endphp
                        {{ $civilStatus[$applicant->TblapplicantsProfile->app_civil_status] }}
                    </td>
                    <td class="td">
                        {{ $applicant->TblapplicantsProfile->app_sex == 'M' ? 'Male' : 'Female' }}
                    </td>
                    <td class="td center">
                        <?php foreach($applicant->tblapplicantEligibility as $eligibility){?>
                        {{ $eligibility_array[$eligibility->cse_app_title] }}<br><br>
                        <?php } ?>
                    </td>
                    <td class="td center">
                        <?php foreach ($applicant->tblapplicantEducation as $education) { ?>
                        {{ $education_level[$education->edu_app_level] . ' in ' . $education->edu_app_degree }}<br><br>
                        {{ $education->edu_app_school }}<br><br>
                        {{ $education->edu_app_from . ' - ' . $education->edu_app_to }}<br><br>
                        {{ $education->edu_app_honors == 'N/A' || $education->edu_app_honors == 'None' ? '' : $education->edu_app_honors }}<br><br>
                        <?php }?>
                    </td>
                    <td class="td center">
                        <?= $applicant->TblAssessments->ass_education ?? '' ?>
                    </td>
                    <td class="td center">
                        <?php foreach ($applicant->tblapplicantExperience as $experience) { ?>
                        {{ $experience->exp_app_position }}<br><br>
                        {{ $experience->exp_app_from . ' - ' . $experience->exp_app_to }}<br><br>
                        {{ $experience->exp_app_agency }}
                        <?php }?>
                    </td>
                    <td class="td center">
                        <?= $applicant->TblAssessments->ass_experience ?? '' ?>
                    </td>
                    <td class="td center">
                        <?php 
                        $counter = 1;
                        $number = new NumberFormatter("en", NumberFormatter::SPELLOUT);
                        foreach($applicant->tblapplicantTrainings as $training){?>
                        {{ $counter++ . '. ' . $training->trn_app_title }}<br>
                        {{ ucfirst($number->format($training->trn_app_hours)) . ' (' . $training->trn_app_hours . ') Hours' }}<br>
                        {{ date('d M Y', strtotime($training->trn_app_from)) . ' - ' . date('d M Y', strtotime($training->trn_app_to)) }}<br><br>
                        <?php }?>
                    </td>
                    <td class="td center">
                        <?= $applicant->TblAssessments->ass_training ?? '' ?>
                    </td>
                    <td class="td center">
                        <?= $competencyMessage ?? '' ?>
                    </td>
                    <td class="td center"><?= $competencyScore ?? '' ?></td>
                    <td class="td center">
                        <?= $raSubTotal ?? '' ?>
                    </td>
                    <td class="td center">{{ $attributeMessage ?? '' }}</td>
                    <td class="td center">{{ $attributes ?? '' }}</td>
                    <td class="td center">{{ $commendableMessage ?? '' }}</td>
                    <td class="td center">{{ $commendable ?? '' }}</td>
                    <td class="td center">{{ $performanceMessage ?? '' }}</td>
                    <td class="td center">{{ $performance ?? '' }}</td>
                    <td class="td center">{{ $hrmpsbTotal ?? '' }}</td>
                    <td class="td center">{{ $total ?? '' }}</td>
                </tr>
                }
            @endforeach
            <tr>
                <td></td>
                <td colspan="20">
                    <p class="dfs w100">Attributes: a) Pleasing personality; b) Sharpness of mind; c) Ability to
                        express ideas/
                        communication skills; d) Good quality of response; e) Self-confidence; f) Judgment and logical
                        thinking; g)
                        Initiative; h) Willingness and ability to learn; i) Other relevant attribute</p>
                </td>
            </tr>
        </tbody>
    </table>

</body>

</html>
