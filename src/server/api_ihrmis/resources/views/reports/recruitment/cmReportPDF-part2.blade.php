<!DOCTYPE html>
<html lang="en">

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
    <h4 class="w100 center"><b>HRMPSB EVALUATION: APPLICANTS' SUMMARY RATING</b></h4>
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
<table class="w100 table ">
    <thead>
        <tr>
            <th class="td th" rowspan="2">NO.</th>
            <th class="td th" rowspan="2">NAME OF CANDIDATE<br>AGE / CIVIL STATUS/</th>
            <th class="td th" rowspan="2">SEX</th>
            <td class="td th center" rowspan="2">ELIGIBILITY</td>
            <th class="td th center" colspan="4">END - USER</th>
            <th class="td th" rowspan="2">SUB - TOTAL</th>
            <th class="td th center" colspan="3">HRMPSB</th>
            <th class="td th" rowspan="2">SUB - TOTAL</th>
            <th class="td th" rowspan="2">TOTAL 100%</th>
        </tr>
        <tr>
            <th class="td th center">EDUCATION - 10%</th>
            <th class="td th center">RELEVANT EXPERIENCE - 15%</th>
            <th class="td th center">RELEV. TRAINING 10%</th>
            <th class="td th center">JOB COMPETENCY - 30%</th>
            <th class="td th center">ATTRIBUTES - 25%</th>
            <th class="td th center">COMMEND.ACCOMP. - 5%</th>
            <th class="td th center">PERFORMANCE - 5%</th>
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
            ?>
            <tr>
                <td class="td center">{{ $counter++ }}</td>
                <td class="td">
                    <b>
                        {{ $applicant->TblapplicantsProfile->app_nm_last }},
                        {{ $applicant->TblapplicantsProfile->app_nm_first }}
                        {{ $applicant->TblapplicantsProfile->app_nm_ext != null ? ' ' . $applicant->TblapplicantsProfile->app_nm_ext : '' }}
                        {{ strtoupper(substr($applicant->TblapplicantsProfile->app_nm_mid, 0, 1)) }}.
                    </b>
                </td>
                <td class="td">
                    {{ $applicant->TblapplicantsProfile->app_sex == 'M' ? 'Male' : 'Female' }}
                </td>
                <td class="td center">
                    <?php foreach($applicant->tblapplicantEligibility as $eligibility){?>
                    {{ $eligibility_array[$eligibility->cse_app_title] }}<br>
                    <?php } ?>
                </td>
                <td class="td center">
                    <?= $applicant->TblAssessments->ass_education ?? '' ?>
                </td>
                <td class="td center">
                    <?= $applicant->TblAssessments->ass_experience ?? '' ?>
                </td>
                <td class="td center">
                    <?= $applicant->TblAssessments->ass_training ?? '' ?>
                </td>

                <td class="td center"><?= $competencyScore ?? '' ?></td>
                <td class="td center">
                    <?= $raSubTotal ?? '' ?>
                </td>
                <td class="td center">{{ $attributes ?? '' }}</td>
                <td class="td center">{{ $commendable ?? '' }}</td>
                <td class="td center">{{ $performance ?? '' }}</td>
                <td class="td center">{{ $hrmpsbTotal ?? '' }}</td>
                <td class="td center">{{ $total ?? '' }}</td>
            </tr>
            }
        @endforeach
    </tbody>
</table>
<p class="w100 center dfs"><b>DOST-CO HUMAN RESOURCE MERIT PROMOTION AND SELECTION BOARD (HRMPSB)</b></p>

</html>
