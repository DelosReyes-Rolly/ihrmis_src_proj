<?php

namespace App\Observers\ApplicantObservers;

use App\Mail\VerifyApplicantMail;
use App\Models\Second\SecApplicantProfile;
use App\Models\Second\SecApplicantVerification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ApplicantProfileObserver
{
    /**
     * Handle the TblapplicantsProfile "created" event.
     *
     * @param  \App\Models\TblapplicantsProfile  $tblapplicantsProfile
     * @return void
     */
    public function created(SecApplicantProfile $tblapplicantsProfile)
    {
        $fullnameArray = [];
        
        $APPLICANT_TOKEN = Str::random(64);

        $createVerification = new SecApplicantVerification();
        $createVerification->id_sec_applicant = $tblapplicantsProfile->id;
        $createVerification->token = $APPLICANT_TOKEN;
        $createVerification->save();

        if($tblapplicantsProfile->app_nm_extn !== 'N/A'){
            $fullnameArray = [
                $tblapplicantsProfile->app_nm_first,
                $tblapplicantsProfile->app_nm_mid,
                $tblapplicantsProfile->app_nm_last,
                $tblapplicantsProfile->app_nm_extn,
            ]; 
        } else {
            $fullnameArray = [
                $tblapplicantsProfile->app_nm_first,
                $tblapplicantsProfile->app_nm_mid,
                $tblapplicantsProfile->app_nm_last
            ]; 
        }

        $fullname = implode(" ", $fullnameArray);

        $details = [ 
            'subject' => 'APPLICATION EMAIL VERICATION', 
            'applicant_email' => $tblapplicantsProfile->app_email_addr,
            'applicant_name' => $fullname,
            'position' => 'Administrative Officer II',
            'from_email'=> env('MAIL_FROM_ADDRESS'),
            'recruiter'=> env('MAIL_FROM_RECUITER'),
            'redirect_link' =>  env('APP_API_URL') . 'verify-email?token=' . $APPLICANT_TOKEN . '&applicant=' . $tblapplicantsProfile->id

        ];
        
        Mail::to($details['applicant_email'])->send(new VerifyApplicantMail($details));
    }


}
