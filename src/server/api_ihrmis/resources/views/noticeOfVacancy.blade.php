<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Notice of Vacancy.docx</title>
		<meta name="author" content="User" />
		<style type="text/css">
			.tg  {border-collapse:collapse;border-spacing:0;margin:0px auto;}
			.tg td{border-color:white;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
			overflow:hidden;padding:1px 1px;word-break:normal;}
			.tg th{border-color:white;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
			font-weight:normal;overflow:hidden;padding:1px 1px;word-break:normal;}
			.tg .tg-wp8o{border-color:white;text-align:center;vertical-align:top}
			.tg .tg-73oq{border-color:white;text-align:left;vertical-align:top}
			.tg .tg-mcqj{border-color:white;font-weight:bold;text-align:left;vertical-align:top}
			.tg .tg-mqa1{border-color:white;text-align:center;vertical-align:top}
			.tg .tg-custom{padding-left: 20px;width: fit-content}

		</style>
	</head>
	<body>
	
		@foreach( $vacantpositions ?? '' as $value) 
			<div class="tg-wrap" style="page-break-after: {{ count($vacantpositions) > 1 ? "always" : "auto" }}">
				<table class="tg" style="table-layout: fixed; width:578px">
					<colgroup>
						<col style="width: 28px">
						<col style="width: 22px">
						<col style="width: 22px">
						<col style="width: 25px">
						<col style="width: 23px">
						<col style="width: 26px">
						<col style="width: 32px">
						<col style="width: 58px">
						<col style="width: 285px">
						<col style="width: 29px">
					</colgroup>
					<tbody>
						<tr>
							<td class="tg-wp8o" colspan="10"><span style="font-weight:bold">NOTICE OF VACANCY</span></td>
						</tr>
						<tr>
							<td class="tg-0lax" colspan="10"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10" style="text-align: justify">
								The {{$value->tbloffices->officeAgency->agn_name}} ({{ $value->tbloffices->officeAgency->agn_acronym }}) is in need of 
								qualified applicants to fill up the position of One (1) 
								<span style="font-weight:bold">{{ $value->tblpositions->pos_title }} (SG-{{ $value->tblpositions->pos_salary_grade}}) 
								Item No. {{  $value->itm_no }}</span> under the <span style="font-weight:bold">{{ $value->tbloffices->ofc_name }}</span>. Applicants must meet the following requirements of the position:</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10"><span style="font-weight:bold;text-decoration:underline">Minimum Requirements</span></td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="3">Education</td>
							<td class="tg-73oq" colspan="1" style="width: fit-content">:</td>
							<td colspan="6">{{ $value->education }}</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="3">Experience</td>
							<td class="tg-73oq" colspan="7">: {{ $value->experience }}</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="3">Training</td>
							<td class="tg-73oq" colspan="7">: {{ $value->training }}</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="3">Eligibility</td>
							<td class="tg-73oq" colspan="7">: {{ $value->eligibility }}</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="3">Job Description </td>
							<td class="tg-73oq" colspan="7">:</td>
						</tr>
						{{ $num_responsibility = count($value->tbldtyresponsibility); }}
						@foreach( $value->tbldtyresponsibility ?? '' as $key => $value)
							<tr>
								<td class="tg-73oq" style="width: fit-content"></td>
								<td class="tg-73oq tg-custom" >{{ $value->dty_itm_order }}.</td>
								<td colspan="8">
									{{$value->dty_itm_desc}}
									{{ $key < ($num_responsibility-1) ? ";" : "." }} 
									{{ $key == ($num_responsibility-2) ? " and" : "" }}
								</td>
							</tr>
						@endforeach
						<tr>
							<td class="tg-73oq" colspan="10">Remarks:</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom" style="text-align: justify" colspan="9">With at least one (1) year of work experience in government procurement procedures preferred; With a working knowledge of the provisions of or has attended relevant training on RA 9184 or the Government Procurement Reform Act, including government accounting and auditing rules and regulations preferred.</td>
						</tr>
						<tr>
							<td class="tg-73oq"><br></td>
						</tr>	
						<tr>
							<td class="tg-73oq" colspan="10" style="text-align: justify">
								Interested and qualified applicants may submit their requirements personally, through mail, or online 
								<span style="font-weight:bold;text-decoration:underline">on or before {{ $value->deadline_formatted }}</span>. 
								For online applications, it is expected that original copies will be presented to the Personnel Division for verification within 10 calendar days. 
								<span style="text-decoration:underline">Only those applications with complete requirements as enumerated below shall be entertained.</span>
							</td>
						</tr>
						<tr>
							<td class="tg-73oq" style="padding-top: 10px" colspan="10"></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">1.</td>
							<td class="tg-73oq" colspan="8">Letter of Application</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">2.</td>
							<td class="tg-73oq" colspan="8"><span style="text-decoration:underline">Personal Data Sheet</span> (CSC Form 212, Revised 2017) with latest passport-sized ID picture, name tag, <span style="text-decoration:underline">and Work Experience Sheet</span></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">3.</td>
							<td class="tg-73oq" colspan="8">Photocopy of Diploma</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">4.</td>
							<td class="tg-73oq" colspan="8">Photocopy of Transcript of Records</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">5.</td>
							<td class="tg-73oq" colspan="8"><span style="text-decoration:underline">Authenticated</span> Certificate of Eligibility/Board Exam</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">6.</td>
							<td class="tg-73oq" colspan="8">Certificate/s of Trainings/Seminars/ and Awards</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">7.</td>
							<td class="tg-73oq" colspan="8">Performance Evaluation Rating in the last rating period or its equivalent</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">8.</td>
							<td class="tg-73oq" colspan="8">Certificate/s of Previous Employment with No Pending Administrative Charge</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq tg-custom">9.</td>
							<td class="tg-73oq" colspan="8">Copy of <span style="text-decoration:underline">valid</span> NBI Clearance</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10">Please send your letter of application with complete documentation to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						</tr>
						<tr>
							<td class="tg-73oq" colspan="10"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-mcqj" colspan="9" style="font-weight: bold">{{ $value->letter_head['letter_office'] }}</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq" colspan="9">{{ $value->letter_head['letter_company'] }}</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq" colspan="9">{{ $value->letter_head['letter_address'] }}</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq" colspan="9">{{ $value->letter_head['letter_email'] }}</td>
						</tr>
						<tr>
							<td class="tg-73oq"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq"><br></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td colspan="4" class="tg-mqa1"> 
								<b>{{$value->memo_from_name['memo_name'] }}</b><br>
								{{  
									$value->memo_from_name['memo_position'] . ', ' .
									$value->memo_from_name['memo_position']
								}}
							</td>
						</tr>
						<tr>
							<td class="tg-73oq"><br><br></td>
						</tr>
						<tr>
							<td class="tg-73oq" style="text-align: justify" colspan="10">
								As an advocate of the Equal Employment Opportunity Principle (EEOP), 
								the DOST-Central Office encourages and welcomes all applicants regardless of age,
								religion, political affiliation including persons with disability, members of indigenous 
								communities, and those from any sexual orientation and gender identities. For specific guidelines, 
								please see attached 
								<span style="text-decoration:underline;color:#2C90C2">Annex</span>.
							</td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
						</tr>
						<tr>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
							<td class="tg-73oq"></td>
						</tr>
						<tr>
							<td class="tg-mcqj" colspan="10">Date Posted: <span style="text-decoration:underline">{{ $value->formatted_date_submitted }}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		@endforeach
	</body>
</html>
