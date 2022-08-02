<?php

namespace App\Http\Resources;

use App\Models\Tbloffices;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountRequestConfirmation extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    $office = '';
    if ($this->acc_req_verified === 1) {
      if ($this->TblOffice->ofc_ofc_id !== null) {
        $query = Tbloffices::where('ofc_id', $this->TblOffice->ofc_ofc_id)->first();
        $office .= $this->TblOffice->ofc_name . ', ' . $query->ofc_acronym;;
      }
    }
    $name = $this->acc_req_title_id . ' ' . $this->acc_req_first_name . ' ' . $this->acc_req_last_name;
    return [
      'office' => $office,
      'name' => $name,
      'position' => $this->TblPositions->pos_title,
      'email' => $this->acc_req_email,
      'phone' => $this->acc_req_telephone,
      'mobile' => $this->acc_req_mobile,
    ];
  }
}
