<?php

namespace App\Http\Controllers\Applicant;

use App\Http\Controllers\Controller;
use App\Http\Resources\Applicant\ApplicantProfileResource;
use App\Http\Resources\CommonResource;
use App\Models\Applicants\TblapplicantChildren;
use App\Models\Applicants\TblapplicantsFamily;
use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Applicants\TblapplicantVerification;
use App\Services\Applicant\ApplicantProfileService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TblapplicantProfileController extends Controller
{

    protected $appProfileService;

    public function __construct(ApplicantProfileService $appService)
    {
        $this->appProfileService = $appService;
    }


    public function createApplicant($position, Request $request)
    {
        $item = $this->appProfileService->createApplicant($request, $position);
        return response()->json([
            'item' => $item,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
        return 'create';
    }

    public function modifyApplicant($id, Request $request)
    {
        $item = $this->appProfileService->modifyApplicant($id, $request);

        return response()->json([
            'item' => $item,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
        return 'edit';
    }

    public function createFamilyChildren($id, Request $request)
    {


        $request->validate([
            'app_sps_nm_last' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_sps_nm_first' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_sps_nm_mid' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_sps_nm_extn' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_sps_occupation' => 'required',
            'app_sps_bus_name' => 'required',
            'app_sps_bus_addr' => 'required',
            'app_sps_tel_no' => 'required',

            'app_fthr_nm_last' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_fthr_nm_first' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_fthr_nm_mid'  => 'required',
            'app_fthr_nm_extn' => 'required|regex:/^[\pL\s\-]+$/u',

            'app_mthr_nm_last' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_mthr_nm_first' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_mthr_nm_mid' => 'required|regex:/^[\pL\s\-]+$/u',
            'app_mthr_nm_extn' => 'required|regex:/^[\pL\s\-]+$/u',

        ], [
            'required' => 'This field is required.'
        ]);

        $familyApplicant = TblapplicantsFamily::findOrNew($id);

        $familyApplicant->app_id = $id;
        $familyApplicant->app_sps_nm_last = $request->app_sps_nm_last;
        $familyApplicant->app_sps_nm_first = $request->app_sps_nm_first;
        $familyApplicant->app_sps_nm_mid = $request->app_sps_nm_mid;
        $familyApplicant->app_sps_nm_extn = $request->app_sps_nm_extn ?? 'NA';
        $familyApplicant->app_sps_occupation = $request->app_sps_occupation;
        $familyApplicant->app_sps_bus_name = $request->app_sps_bus_name;
        $familyApplicant->app_sps_bus_addr = $request->app_sps_bus_addr;
        $familyApplicant->app_sps_tel_no = $request->app_sps_tel_no;

        $familyApplicant->app_fthr_nm_last = $request->app_fthr_nm_last;
        $familyApplicant->app_fthr_nm_first = $request->app_fthr_nm_first;
        $familyApplicant->app_fthr_nm_mid = $request->app_fthr_nm_mid;
        $familyApplicant->app_fthr_nm_extn = $request->app_fthr_nm_extn ?? 'NA';

        $familyApplicant->app_mthr_nm_last = $request->app_mthr_nm_last;
        $familyApplicant->app_mthr_nm_first = $request->app_mthr_nm_first;
        $familyApplicant->app_mthr_nm_mid = $request->app_mthr_nm_mid;
        $familyApplicant->app_mthr_nm_extn = $request->app_mthr_nm_extn ?? 'NA';

        if (isset($request->children)) {
            TblapplicantChildren::destroy($id);
            foreach ($request->children as $value) {
                $data = json_decode($value, true);
                $children = new TblapplicantChildren();
                $children->chi_app_id = $id;
                $children->chi_app_name = $data['name'];
                $children->chi_app_birthdate = $data['birthday'];
                $children->save();
            }
        }

        $familyApplicant->save();

        return response()->json([
            'item' => $id,
            'status' => 200,
            'message' => "Added Successfully",
        ]);
    }

    public function verifyEmail(Request $request)
    {

        $verify = TblapplicantVerification::where('vry_app_id', $request->applicant)->first();

        if ($verify != null) {
            if ($verify->vry_app_token == $request->token) {
                $setAsVerified = TblapplicantsProfile::where('app_id', $request->applicant)->update(["app_verified" => 1]);
                // where('app_id', $request->applicant)->first(find($request->applicant)
                $verify->where('vry_app_id', $request->applicant)->delete();
                return redirect()->away(env('FRONTEND_APPLICANT_REDIRECT_URL') . $request->applicant);
            } else {
                abort('404');
            }
        } else {
            abort('404');
        }
    }

    public function addGovernmentId($id, Request $request)
    {

        $isImageBool = TblapplicantsProfile::where('app_id', $id)->first();


        $request->validate(
            [
                "app_id_issued" => "required",
                "app_id_no" => "required",
                "app_id_dateplace" => "required",
                "app_photo" => [Rule::when(isset($isImageBool->app_photo), [], ['required'])],
                "app_agree" => "required",
            ],
            [
                "required" => "This field is required",
            ]
        );

        $applicantQry = TblapplicantsProfile::find($id);

        if (!isset($isImageBool->app_photo)) {

            $imageObj = $request->file('app_photo');
            $extentionStr = $imageObj->getClientOriginalExtension();
            $filenameStr = 'passport-img-' . time() . '.' . $extentionStr;
            $imageObj->storeAs('public/applicant/passport-img', $filenameStr);

            $applicantQry->app_id_issued = $request->app_id_issued;
            $applicantQry->app_id_no = $request->app_id_no;
            $applicantQry->app_id_dateplace = $request->app_id_dateplace;
            $applicantQry->app_agree = $request->app_agree;
            $applicantQry->app_photo = $filenameStr;

            $applicantQry->save();
            return response()->json(["status" => "200"]);
        }

        if ($request->hasFile('app_photo')) {
            // if(isset($isImageBool->app_photo)){
            $imgNameStr = $applicantQry->app_photo;
            $public = public_path('storage/applicant/passport-img/' . $imgNameStr);
            unlink($public);
            // }

            $imageObj = $request->file('app_photo');
            $extentionStr = $imageObj->getClientOriginalExtension();
            $filenameStr = 'passport-img-' . time() . '.' . $extentionStr;
            $imageObj->storeAs('public/applicant/passport-img', $filenameStr);

            $applicantQry->app_id_issued = $request->app_id_issued;
            $applicantQry->app_id_no = $request->app_id_no;
            $applicantQry->app_id_dateplace = $request->app_id_dateplace;
            $applicantQry->app_agree = $request->app_agree;
            $applicantQry->app_photo = $filenameStr;
            $applicantQry->save();
            return response()->json(["status" => "200"]);
        }

        $applicantQry->app_id_issued = $request->app_id_issued;
        $applicantQry->app_id_no = $request->app_id_no;
        $applicantQry->app_id_dateplace = $request->app_id_dateplace;
        $applicantQry->app_agree = $request->app_agree;
        $applicantQry->save();
    }

    public function getApplicant($id = null)
    {
        $applicantDataQry = TblapplicantsProfile::find($id);
        return new ApplicantProfileResource($applicantDataQry);
    }

    public function getFamilyChildren($id)
    {
        $getFamQry = TblapplicantsFamily::where("app_id", $id)->first();
        return new CommonResource($getFamQry);
    }
}
