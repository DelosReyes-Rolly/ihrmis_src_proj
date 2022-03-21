<?php

namespace App\Http\Resources\Email;

use Illuminate\Http\Resources\Json\JsonResource;

class GetEmailTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {   
        $arrHolder = explode("|", $this->mail_message);
        return [
            "mail_id" => $this->mail_id,
            "mail_title" => $this->mail_title,
            "mail_message" => $arrHolder 
        ];
    }
}
