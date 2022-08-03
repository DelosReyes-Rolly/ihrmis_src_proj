import { applicantRequirements } from "./static/posting_job_vacancy_data";

export const noticeOfVacancyTemplate = (data) => {
	let num_dutiesandresponsibilities = data.dutiesandresponsibilities.length;
	let str_html =
		'<style type="text/css">' +
		".tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}" +
		".tg td{border-color:white;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;" +
		"overflow:hidden;padding:1px 1px;word-break:normal;}" +
		".tg th{border-color:white;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;" +
		"font-weight:normal;overflow:hidden;padding:1px 1px;word-break:normal;}" +
		".tg .tg-wp8o{border-color:white;text-align:center;vertical-align:top}" +
		".tg .tg-73oq{border-color:white;text-align:left;vertical-align:top}" +
		".tg .tg-mcqj{border-color:white;font-weight:bold;text-align:left;vertical-align:top}" +
		".tg .tg-mqa1{border-color:white;text-align:center;vertical-align:top}" +
		".tg .tg-custom{padding-left: 20px;width: fit-content}" +
		"</style>" +
		'<div class="tg-wrap" style="page-break-after: always;">' +
		'<table class="tg" style="table-layout: fixed; width:578px">' +
		"<colgroup>" +
		'<col style="width: 28px">' +
		'<col style="width: 19px">' +
		'<col style="width: 22px">' +
		'<col style="width: 25px">' +
		'<col style="width: 23px">' +
		'<col style="width: 26px">' +
		'<col style="width: 32px">' +
		'<col style="width: 58px">' +
		'<col style="width: 285px">' +
		'<col style="width: 29px">' +
		"</colgroup>" +
		"<tbody>" +
		"<tr>" +
		'<td class="tg-wp8o" colspan="11" style="font-weight:bold;text-align:center"><span style="font-weight:bold">NOTICE OF VACANCY</span></td>' +
		"</tr>" +
		"<tr>" +
		'<td colspan="11"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="11" style="text-align: justify">' +
		"The Department of Science and Technology – " +
		data.office.office_agency.agn_name +
		" qualified applicants to fill up the position of One (1)" +
		'<span style="font-weight:bold">' +
		data.pos_title +
		" (SG-" +
		data.pos_salary_grade +
		")" +
		"Item No. " +
		data.itm_no +
		'</span> under the <span style="font-weight:bold">' +
		data.office.ofc_name +
		"</span>. Applicants must meet the following requirements of the position:</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="10"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="10">' +
		'<span style="font-weight:bold;text-decoration:underline">' +
		"Minimum Requirements" +
		"</span>" +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="5">Education</td>' +
		'<td class="tg-73oq" style="width: fit-content">:</td>' +
		'<td colspan="5">' +
		data.education +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="5">Experience</td>' +
		'<td class="tg-73oq" style="width: fit-content">:</td>' +
		'<td colspan="5">' +
		data.experience +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="5">Training</td>' +
		'<td class="tg-73oq" style="width: fit-content">:</td>' +
		'<td colspan="5">' +
		data.training +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="5">Eligibility</td>' +
		'<td class="tg-73oq" style="width: fit-content">:</td>' +
		'<td colspan="5">' +
		data.eligibility +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="5">Job Description </td>' +
		'<td class="tg-73oq" style="width: fit-content">:</td>' +
		'<td class="tg-73oq" colspan="4"></td>' +
		"</tr>";

	let dutiesandresponsibilities = data.dutiesandresponsibilities;
	for (let key in dutiesandresponsibilities) {
		let value = dutiesandresponsibilities[key];
		str_html +=
			"<tr>" +
			'<td class="tg-73oq"></td>' +
			'<td class="tg-73oq" colspan="2" style="width: fit-content">' +
			value.dty_itm_order +
			".</td>" +
			'<td colspan="8"> ' +
			value.dty_itm_desc +
			(key < num_dutiesandresponsibilities - 1
				? ";"
				: "." + key == num_dutiesandresponsibilities - 2
				? " and"
				: "") +
			"</td>" +
			"</tr>";
	}
	str_html +=
		"<tr>" +
		'<td class="tg-73oq" colspan="10">Remarks:</td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"></td>' +
		'<td class="tg-73oq tg-custom" style="text-align: justify" colspan="10">' +
		"With at least one (1) year of work experience in government procurement procedures preferred; " +
		"With a working knowledge of the provisions of or has attended relevant training on RA 9184 or the " +
		"Government Procurement Reform Act, including government accounting and auditing rules and regulations " +
		"preferred.</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="11" style="text-align: justify">' +
		"Interested and qualified applicants may submit their requirements personally, through the mail, or online" +
		'<span style="font-weight:bold;text-decoration:underline"> on or before ' +
		(data.formatted_date_submitted ?? "") +
		".</span> For online applications, it is expected that original copies will " +
		"be presented to the Personnel Division for verification within 10 calendar days." +
		'<span style="text-decoration:underline">' +
		"Only those applications with complete requirements as enumerated below shall be entertained" +
		"</span>.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" style="padding-top: 5px" colspan="11"></td>' +
		"</tr>";
	applicantRequirements.forEach((element) => {
		str_html +=
			"<tr>" +
			'<td class="tg-73oq"></td>' +
			'<td class="tg-73oq tg-custom" colspan="2">' +
			element.item_no +
			".</td>" +
			'<td class="tg-73oq" colspan="8">' +
			element.description +
			"</td>" +
			"</tr>";
	});
	str_html +=
		"<tr>" +
		'<td class="tg-73oq" colspan="11"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="11">Please send your letter of application with complete documentation to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="11"><br></td>' +
		"</tr>" +
		" <tr>" +
		'<td class="tg-73oq"></td>' +
		'<td class="tg-mcqj" colspan="10">' +
		"<b>" +
		data.letter_head.letter_office +
		"</b> " +
		"<br>" +
		data.letter_head.letter_company +
		"<br>" +
		data.letter_head.letter_address +
		"<br>" +
		data.letter_head.letter_email +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"><br></td>' +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="8"></td>' +
		'<td colspan="3" class="tg-mqa1" style="text-align:center"> ' +
		"<b>" +
		data.memo_from_name.memo_name +
		"</b><br>" +
		data.memo_from_name.memo_position +
		", " +
		data.memo_from_name.memo_office +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq"><br><br></td>' +
		"</tr>" +
		"<tr>" +
		' <td class="tg-73oq" style="text-align: justify" colspan="11">' +
		" As an advocate of the Equal Employment Opportunity Principle (EEOP), " +
		"the DOST-Central Office encourages and welcomes all applicants regardless of age," +
		"religion, political affiliation including persons with disability, members of indigenous " +
		"communities, and those from any sexual orientation and gender identities. For specific guidelines, " +
		"please see attached " +
		'<span style="text-decoration:underline;color:#2C90C2">Annex</span>.' +
		"</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-73oq" colspan="11" style="text-align:center">>>' +
		'<a href="http://localhost:3001/ihrmis/pds-applicant/applicant/' +
		data.itm_id +
		'">Apply Here</a>' +
		"<<</td>" +
		"</tr>" +
		"<tr>" +
		'<td class="tg-mcqj" colspan="11" style="font-weight:bold">Date Posted: <span style="text-decoration:underline">' +
		data.formatted_date_submitted +
		"</span></td>" +
		"</tr>" +
		"</tbody>" +
		"</table>" +
		"</div>";

	return {
		content: str_html,
		deadline: data.deadline_formatted,
	};
};
