<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Oath Of Office</title>
    <style>
        .w100 {
            width: 100%;
        }

        .w90 {
            width: 90%;
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
    <htmlpageheader name="header">
        <p class="w90 mauto m0">CS Form No. 32</p>
        <p class="w90 mauto m0 dfs">Revised 2018</p>
    </htmlpageheader>
    <sethtmlpageheader name="header" value="on" show-this-page="1" />
    <br><br>
    <p class="w90 mauto center">REPUBLIC OF THE PHILIPPINES
        <br>
        Department of Science and Technology
    </p>
    <br>
    <h3 class="w90 mauto center">OATH OF OFFICE</h3>
    <br>
    <p class="w90 mauto tj">
        I, <span
            class="underline w65">{{ $applicants_profile['app_nm_last'] . ' ' . $applicants_profile['app_nm_first'] }}{{ $applicants_profile['app_nm_ext'] != null ? ' ' . $applicants_profile['app_nm_ext'] : '' }}{{ ', ' . strtoupper(substr($applicants_profile['app_nm_mid'], 0, 1)) . '.' }}
        </span>
        of
        <?php $addressArr = explode('|', $applicants_profile['app_resident_addr']); ?>
        <span class="underline">
            <?php for ($i = 0; $i < count($addressArr); $i++) {
                if ($i != count($addressArr) - 1) {
                    echo $addressArr[$i] . ', ';
                } else {
                    echo $addressArr[$i];
                }
            } ?>
        </span>
        having been appointed to the position of
        <span class="underline">{{ $applicants_position['pos_title'] }}</span>
        hereby solemnly swear, that I will faithfully discharge to the best of my ability, the duties of
        my present position and of all others that I may hereafter hold under the Republic of
        the Philippines; that I will bear true faith and allegiance to the same; that I will obey
        the laws, legal orders, and decrees promulgated by the duly constituted authorities of
        the Republic of the Philippines; and that I impose this obligation upon myself
        voluntarily, without mental reservation or purpose of evasion.
    </p>
    <p class="w90 mauto tj">SO HELP ME GOD</p>
    <table class="w90 mauto">
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                <b>___________________________________</b><br>
                (Signature over Printed Name of Appointee)
            </td>
        </tr>
    </table>
    <p class="w90 mauto">
        Government ID: ______________<br>
        ID Number : ______________<br>
        Date Issued : ______________<br>
    </p>
    <div class="w90 mauto">
        <hr class="hr">
        <hr class="hr">
    </div>
    <p class="w90 mauto tj">
        Subscribed and sworn to before me this _______ day of
        ___________________, 20___ in __________________________________,
        Philippines.
    </p>
    <br>
    <table class="w90 mauto">
        <tr>
            <td class="w65"></td>
            <td class="w35 center">
                <b>___________________________________</b><br>
                <b>
                    (Signature over Printed Name
                    of Person Administering the
                    Oath)
                </b>
            </td>
        </tr>
    </table>
</body>

</html>
