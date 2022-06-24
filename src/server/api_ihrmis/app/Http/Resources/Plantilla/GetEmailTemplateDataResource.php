<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\CommonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetEmailTemplateDataResource extends JsonResource
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
       
            'itm_id' => $this->itm_id,
            'itm_no' => $this->itm_no,
            'position' => $this->tblpositions->pos_title,
			'salary_grade' => $this->tblpositions->pos_salary_grade
        ];
    }

    
}