<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AccountRequest extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'acc_req_id' => $this->acc_req_id,
      'acc_req_last_name' => $this->acc_req_last_name,
      'acc_req_first_name' => $this->acc_req_first_name,
      'acc_req_middle_name' => $this->acc_req_middle_name,
      'acc_req_title_id' => $this->acc_req_title_id,
      'acc_req_telephone' => $this->acc_req_telephone,
      'acc_req_mobile' => $this->acc_req_mobile,
      'acc_req_position' => $this->acc_req_position,
      'acc_req_office' => $this->acc_req_office,
      'acc_req_email' => $this->acc_req_email,
      'verified' => ($this->acc_req_verified === 1) ? 'Verified' : 'Unverified',
    ];
  }
}
