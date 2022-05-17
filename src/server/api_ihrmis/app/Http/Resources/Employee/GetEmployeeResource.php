<?php

namespace App\Http\Resources\Employee;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class GetEmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $statusHolder = ['Permanent', 'Provisional', 'Temporary', 'Substitute', 'Coterminous', 'Casual', 'Contractual', 'Job Order'];
        $svcStatusHolder = ['In Service', 'Transferred', 'Retired', 'Resigned', 'Rationalized', 'End of Contract', 'Deceased', 'Drop from Rolls', 'Awol'];
        $service = ", " . $svcStatusHolder[$this->serviceHistory->svc_status] . "\n" . $this->serviceHistory->svc_remarks;

        return [
            "emp_name" => $this->emp_nm_last . ", " . $this->emp_nm_first . " " . $this->emp_nm_mid ?? "" . " " . $this->emp_nm_extn?? "",
            "emp_no" => $this->emp_no,
            "emp_itm_no" => $this->plantilla->itm_no,
            "emp_ofc_pos" => $this->plantilla->tbloffices->ofc_acronym . "\n" . $this->emp_title,
            "emp_status" => $statusHolder[$this->plantilla->itm_status]. $service,
            "svc_status" => $this->serviceHistory->svc_status
        ];
    }
}
