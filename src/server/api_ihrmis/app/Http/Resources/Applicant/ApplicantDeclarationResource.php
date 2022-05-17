<?php

namespace App\Http\Resources\Applicant;

use ArrayObject;
use Illuminate\Http\Resources\Json\JsonResource;
use stdClass;

class ApplicantDeclarationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);

        $arrayAppYes = [];
        $array = parent::toArray($request);

        foreach ($array as $value) {
            array_push($arrayAppYes, 
                $value['dec_app_yes']
            );
        }
        $arrayAppDetails = [];

        foreach ($array as $value) {
            if ( $value['dec_app_details'] == 'N/A' ){
                array_push($arrayAppDetails, ""); 
            } else {
                array_push($arrayAppDetails, $value['dec_app_details']);
            }
             
        }

        $arrayAppDate = [];

        foreach ($array as $value) {
            array_push($arrayAppDate, $value['dec_app_date']); 
        }

        return [
           'Q1A' => $arrayAppYes[0] ?? "",
           'Q1B' => $arrayAppYes[1] ?? "",
           'Q2A' => $arrayAppYes[2] ?? "",
           'Q2B' => $arrayAppYes[3] ?? "",
           'Q3' => $arrayAppYes[4] ?? "",
           'Q4' => $arrayAppYes[5] ?? "",
           'Q5A' => $arrayAppYes[6] ?? "",
           'Q5B' => $arrayAppYes[7] ?? "",
           'Q6' => $arrayAppYes[8] ?? "",
           'Q7A' => $arrayAppYes[9] ?? "",
           'Q7B' => $arrayAppYes[10] ?? "",
           'Q7C' => $arrayAppYes[11] ?? "",

           'Q1B_spec' => $arrayAppDetails[1] ?? "",
           'Q2A_spec' => $arrayAppDetails[2] ?? "",
           'Q2B_spec' => $arrayAppDetails[3] ?? "",
           'Q3_spec' => $arrayAppDetails[4] ?? "",
           'Q4_spec' => $arrayAppDetails[5] ?? "",
           'Q5A_spec' => $arrayAppDetails[6] ?? "",
           'Q5B_spec' => $arrayAppDetails[7] ?? "",
           'Q6_spec' => $arrayAppDetails[8] ?? "",
           'Q7A_spec' => $arrayAppDetails[9] ?? "",
           'Q7B_spec' => $arrayAppDetails[10] ?? "",
           'Q7C_spec' => $arrayAppDetails[11] ?? "",

           'Q2B_date' => $arrayAppDate[3] ?? "",
        ];
    }
}
