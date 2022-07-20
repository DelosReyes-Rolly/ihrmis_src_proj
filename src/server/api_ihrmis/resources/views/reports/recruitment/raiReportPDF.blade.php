<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>REPORT ON APPOINTMENTS ISSUED (RAI)</title>
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

        .w40 {
            width: 40%;
        }

        .w30 {
            width: 30%;
        }

        .w33 {
            width: 33.3%
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

        .right {
            text-align: right;
        }

        .left {
            text-align: left;
        }

        .dfs {
            font-size: 9px;
        }

        .tfs {
            font-size: 10px;
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
            word-break: normal;
            text-align: center;
        }
    </style>
</head>

<body class="dfs">
    <?php
    $status = ['Permanent', 'Provisional', 'Temporary', 'Substitute', 'Co-Terminous', 'Casual', 'Contractual', 'Job Order'];
    ?>
    <htmlpageheader name="header">
        <span class="tfs">CS Form No. 2</span>
        <table class="dfs w100">
            <tr>
                <td class="w33"><b class="dfs">Revised 2018</b></td>
                <td class="w33"></td>
                <td class="w33 td center">For Use of Accredited Agencies Only</td>
            </tr>
        </table>
    </htmlpageheader>
    <htmlpagefooter name="footer">
        <span class="dfs">For CSC Use Only</span>
        <table class="dfs w100 table">
            <tr>
                <td class="td">REMARKS/COMMENTS/RECOMMENDATIONS (e.g. Reasons for Invalidation):</td>
            </tr>
            <tr>
                <td class="td">&nbsp;</td>
            </tr>
            <tr>
                <td class="td">&nbsp;</td>
            </tr>
            <tr>
                <td class="td">&nbsp;</td>
            </tr>
            <tr>
                <td class="right">{PAGENO}</td>
            </tr>
        </table>
    </htmlpagefooter>
    <sethtmlpageheader name="header" value="on" show-this-page="1" />
    <sethtmlpagefooter name="footer" value="on" show-this-page="1" />
    <table class="tfs w100">
        <tr>
            <td class="center">
                REPORT ON APPOINTMENTS ISSUED (RAI)<br>
                For the Month of {{ $date }}
            </td>
        </tr>
        <tr>
            <td class="dfs right">Date received by CSC FO: ________________________</td>
        </tr>
    </table>
    <table class="w100 dfs">
        <tr>
            <td class="w33">AGENCY: ________________________</td>
            <td class="w33">CSC Resolution No: ________________________</td>
            <td class="w33">CSC FO In-charge:
                ______________________________________________________________
            </td>
        </tr>
    </table>
    <br>
    <table>
        <tr>
            <td class="tfs"><b>INSTRUCTIONS</b></td>
            <td class="dfs">(1) Fill-out the data needed in the form completely and accurately.</td>
        </tr>
        <tr>
            <td></td>
            <td class="dfs">(2) Do not abbreviate entries in the form</td>
        </tr>
        <tr>
            <td></td>
            <td class="dfs">(3) Accomplish the Checklist of Common Requirements and sign the
                certification
            </td>
        </tr>
        <tr>
            <td></td>
            <td class="dfs">(4) Submit the duly accomplished form in electronic and printed copy (2
                copies)
                to the CSC Field Office-in-Charge<br>
                together with the original CSC copy of appointments and supporting
                documentswithin the 30th day of the succeeding month</td>
        </tr>
    </table>
    <b class="dfs">Pertinent data on appointment issued</b>
    <table class="w100 table dfs">
        <thead>
            <tr>
                <th class="td" rowspan="2"></th>
                <th class="td" rowspan="2">Date Issued / Effectivity (mm/dd/yyyy)</th>
                <th class="td center" colspan="4"><b>NAME OF APPOINTEE/S</b></th>
                <th class="td" rowspan="2">POSITION TITLE (Indicate parenthetical title if applicable)
                </th>
                <th class="td" rowspan="2">ITEM NO.</th>
                <th class="td" rowspan="2">SALARY / JOB / PAY GRADE</th>
                <th class="td" rowspan="2">SALARY RATE<b> (Monthly)</b></th>
                <th class="td" rowspan="2">EMPLOYMENT STATUS</th>
                <th class="td" rowspan="2">PERIOD OF EMPLOYMENT (for Temporary, Casual/Contractual
                    Appointments) (mm/dd/yyyy to mm/dd/yyyy)</th>
                <th class="td" rowspan="2">NATURE OF APPOINTMENT</th>
                <th class="td" colspan="2">PUBLICATION</th>
                <th class="td" colspan="3">CSC ACTION</th>
                <th class="td" rowspan="2">Agency Receiving Officer</th>
            </tr>
            <tr>
                <th class="td">Last Name</th>
                <th class="td">First Name</th>
                <th class="td">Name Extension (Jr./III)</th>
                <th class="td">Middle Name</th>
                <th class="td">DATE indicate period of publication (mm/dd/yyyy to mm/dd/yyyy)</th>
                <th class="td">MODE(CSC Bulletin of Vacant Positions, <b>Agency Website, Newspaper,
                        etc</b>)
                </th>
                <th class="td">V-Validated INV-Invalidated <b>N-Noted</b></th>
                <th class="td">Date of Action (mm/dd/yyyy)</th>
                <th class="td">Date of Release (mm/dd/yyyy)</th>
            </tr>
        </thead>
        <tbody>
            <?php 
                $counter = 1;
                if(!empty($details)):?>
            <?php foreach ($details as $applicant) {?>
            <tr>
                <td class="td">{{ $counter++ }}</td>
                <td class="td">
                    <?= $applicant->app_appntmnt != null ? $applicant->app_appntmnt : $applicant->app_assmptn ?>
                </td>
                <td class="td">
                    <?= $applicant->TblapplicantsProfile->app_nm_last ?>
                </td>
                <td class="td">
                    <?= $applicant->TblapplicantsProfile->app_nm_first ?>
                </td>
                <td class="td">
                    <?= $applicant->TblapplicantsProfile->app_nm_extn ?? '' ?>
                </td>
                <td class="td">
                    <?= $applicant->TblapplicantsProfile->app_nm_mid ?? '' ?>
                </td>
                <td class="td">
                    <?= $applicant->TblPositions->pos_title ?? '' ?>
                </td>
                <td class="td">
                    <?= $applicant->TblplantillaItems->itm_no ?? '' ?>
                </td>
                <td class="td">
                    <?= $applicant->TblPositions->pos_salary_grade ?? '' ?>
                </td>
                <td class="td"></td>
                <td class="td">
                    <?php if(!isset($applicant->app_appntmnt)):?>
                    <?= $applicant->app_period_from ?> to
                    <?= $applicant->app_period_to ?>
                    <?php endif;?>
                </td>
                <td class="td"></td>
                <td class="td">
                    <?= $status[$applicant->TblplantillaItems->itm_status] ?>
                </td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
            </tr>
            <?php } ?>
            <?php else:?>

            <?php for ($i=1; $i <= 15; $i++) { ?>
            <tr>
                <td class="td">{{ $i }}</td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
                <td class="td"></td>
            </tr>
            <?php }?>
            <?php endif;?>
        </tbody>
    </table>
    <br>
    <table class="w-100 dfs table">
        <tr>
            <td class="w20" style="text-align: justify;">
                CERTIFICATION:<br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                This is to certify that the information contained in this
                report are true, correct and complete based on the Plantilla is/are in accordance with existing
                Civil
                Service Law
            </td>
            <td style="width: 2%"></td>
            <td class="w20" style="text-align: justify;">
                CERTIFICATION:<br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                This is to certify that the appointment/s issued
                is/are in accordance with existing Civil Service Law, rules and regulations<br>&nbsp;
            </td>
            <td class="w10"></td>
            <td class="w40" style="">Post-Audited by<br><br><br><br><br>&nbsp;</td>
        </tr>
        <tr>
            <td class="center">
                <br><br>
                ______________________________________________________________<br>
                <b>HRMO</b>
            </td>
            <td></td>
            <td class="center">
                <br><br>
                ______________________________________________________________<br>
                Agency Head or Authorized Official
            </td>
            <td></td>
            <td class="">
                <br><br>
                ______________________________________________________________<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                CSC Official
            </td>
        </tr>
    </table>
</body>

</html>
