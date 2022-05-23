<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile of Pre-Qualified Applicants</title>
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

<body class="dfs">
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
        <h4 class="w100 center"><b>PROFILE OF PRE-QUALIFIED APPLICANTS</b></h4>
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
    <sethtmlpageheader name="header" value="on" show-this-page="1" />

    <table class="w100 table">
        <thead>
            <tr>
                <th class="td th" rowspan="2">NO.</th>
                <th class="td th" rowspan="2">NAME OF CANDIDATE<br>AGE / CIVIL STATUS/</th>
                <th class="td th" rowspan="2">SEX</th>
                <th class="td th" rowspan="2">EDUC'L. ATTAINMENT /<br>NCL. YR. / NAME OF SCHOOL</th>
                <th class="td th" colspan="3">WORK Experience</th>
                <td class="td th center" rowspan="2">TRAINING/SEMINAR ATTENDED<br>(Pls. CHECK relevant to the
                    position)</td>
                <td class="td th center" rowspan="2">ELIGIBILITY</td>
                <td class="td th center" rowspan="2">PERFORMANCE</td>
                <td class="td th center" rowspan="2">RESULT OF<br>PRE-EMPLOYMENT EXAM</td>
                <td class="td th center" rowspan="2">REMARK</td>
            </tr>
            <tr>
                <td class="td th center">Position Title</td>
                <td class="td th center">Inclusive Dates</td>
                <td class="td th center">Agency / Office</td>
            </tr>
        </thead>
        <tbody>
            {{ $counter = 1 }}
            @foreach ($applicants as $applicant)
                {
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
                        <br><br>
                        {{ $applicant->TblapplicantsProfile->app_email_addr }}
                        <br>
                        {{ $applicant->TblapplicantsProfile->app_mobile_no }}
                    </td>
                    <td class="td">
                        {{ $applicant->TblapplicantsProfile->app_sex == 'M' ? 'Male' : 'Female' }}
                    </td>
                    <td class="td center">
                        <?php foreach ($applicant->tblapplicantEducation as $education) { ?>
                        {{ $education_level[$education->edu_app_level] . ' in ' . $education->edu_app_degree }}<br>
                        {{ $education->edu_app_school }}<br>
                        {{ $education->edu_app_from . ' - ' . $education->edu_app_to }}
                        {{ $education->edu_app_honors == 'N/A' || $education->edu_app_honors == 'None' ? '' : $education->edu_app_honors }}<br><br>
                        <?php }?>
                    </td>
                    <td class="td center" colspan="3">
                        <table class="nmp table dfs">
                            <?php foreach ($applicant->tblapplicantExperience as $experience) { ?>
                            <tr>
                                <td class="tdInner">{{ $experience->exp_app_position }}<br></td>
                                <td class="tdInner">
                                    {{ $experience->exp_app_from . ' - ' . $experience->exp_app_to }}<br></td>
                                <td class="tdInner">{{ $experience->exp_app_agency }}<br></td>
                            </tr>
                            <?php }?>
                        </table>
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
                        <?php foreach($applicant->tblapplicantEligibility as $eligibility){?>
                        {{ $eligibility_array[$eligibility->cse_app_title] }}<br><br>
                        <?php } ?>
                    </td>
                    <td class="td center">N/A</td>
                    <td class="td"></td>
                    <td class="td center">
                        {{ !empty($applicant->tblapplicantsStatus[0]->sts_app_remarks) ? $applicant->tblapplicantsStatus[0]->sts_app_remarks : 'N/A' }}
                    </td>
                </tr>
                }
            @endforeach
        </tbody>
    </table>
</body>

</html>
