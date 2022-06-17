<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Appointment Form - Accredited</title>
    <style>
        .w100 {
            width: 100%;
        }

        .w85 {
            width: 85%;
        }

        .w80 {
            width: 80%;
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

        .w35 {
            width: 35%;
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

        .mauto {
            margin-left: auto;
            margin-right: auto;
        }

        .m0 {
            margin: 0%;
        }

        .hr {
            margin: 1px 0%;
            height: 2px;
            color: black;
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

        .tj {
            text-align: justify;
            line-height: 2rem;
            text-indent: 4rem;
        }

        .tl {
            text-align: left;
        }

        .tar {
            text-align: right;
        }

        .underline {
            text-decoration: underline;
        }
    </style>
</head>

<body style="font-family: Arial, Helvetica, sans-serif">
    <?php
    $plantilla_item_status = ['Permanent', 'Provisional', 'Temporary', 'Substitute', 'Coterminous', 'Casual', 'Contractual', 'Job Order'];
    ?>
    <htmlpageheader name="header">
        <p class="w75 mauto m0">CS Form No. 33-B</p>
        <p class="w75 mauto m0 dfs">Revised 2018</p>
    </htmlpageheader>
    <sethtmlpageheader name="header" value="on" show-this-page="1" />
    <br><br>
    <p class="w75 mauto center">
        <b>
            REPUBLIC OF THE PHILIPPINES
            <br>
            {{ $applicants_office['officeAgency']->agn_name }}
        </b>
    </p>
    <br>
    <p class="w85 mauto">
        Mr./Mrs./ Ms.: <span
            class="underline w65">{{ $applicants_profile['app_nm_last'] . ' ' . $applicants_profile['app_nm_first'] }}{{ $applicants_profile['app_nm_ext'] != null ? ' ' . $applicants_profile['app_nm_ext'] : '' }}{{ ', ' . strtoupper(substr($applicants_profile['app_nm_mid'], 0, 1)) . '.' }}
        </span>
    </p>
    <p class="w85 mauto tj">
        You are hereby appointed as
        <span class="underline">
            {{ $applicants_position['pos_title'] }}
        </span>
        &nbsp;(SG/JG/PG
        <span class="underline">&nbsp;{{ $applicants_position['pos_salary_grade'] }}&nbsp;</span>)
        under
        <span class="underline">{{ $plantilla_item_status[$applicant_plantilla_item['itm_status']] }}</span>
        status at the
        <span class="underline">{{ $applicants_office['ofc_name'] }}</span>
        with a compensation rate of ____________________________________ (P ________________)
        pesos per month
    </p>
    <p class="w85 mauto tj">
        The nature of this appointment is
        ____________________________ vice ____________________________, who ____________________________ with Plantilla
        Item No.
        <span class="underline w65">{{ $applicant_plantilla_item['itm_no'] }}
        </span>
        PAGE ________________
    </p>
    <p class="w85 mauto tj">
        This appointment shall take effect on the date of signing by the appointing officer/authority.
    </p>
    <table class="w85 mauto">
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                Very truly yours,
                <br><br><br>
            </td>
        </tr>
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                <b>___________________________________</b><br>
                Appointing Officer/Authority,
                <br><br><br>
            </td>
        </tr>
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                <b>___________________________________</b><br>
                Date of Signing,
            </td>
        </tr>
    </table>
    <p class="w85 mauto">
        Accredited/Deregulated Pursuant to<br>
        CSC Resolution No. _____, s. _____<br>
        dated _____
    </p>
</body>

</html>
