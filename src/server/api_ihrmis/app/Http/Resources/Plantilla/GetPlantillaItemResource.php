<?php

namespace App\Http\Resources\Plantilla;

use App\Http\Resources\CommonResource;
use Illuminate\Http\Resources\Json\JsonResource;

class GetPlantillaItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $tbldutiesresponsibities = new CommonResource($this->tbldtyresponsibility);
        $tbloffices = new CommonResource($this->tbloffices);
        return [

            'itm_id' => $this->itm_id,
            'itm_no' => $this->itm_no,
            'itm_regular' => $this->itm_regular,
            'itm_status' => $this->itm_status,
            'itm_level' => $this->itm_level,
            'itm_function' => $this->itm_function,
            'itm_basis' => $this->itm_basis,
            'itm_category' => $this->itm_category,
            'itm_creation' => $this->itm_creation,
            'itm_state' => $this->itm_state,
            'pos_title' => $this->tblpositions->pos_title,
            'pos_category' => $this->tblpositions->pos_category,
            "pos_short_name" => $this->tblpositions->pos_short_name,
            "pos_salary_grade" => $this->tblpositions->pos_salary_grade,
            "pos_category" => $this->tblpositions->pos_category,
            "education" => $this->education ?? "",
            "experience" => $this->experience ?? "",
            "training" => $this->training  ?? "",
            "eligibility" => $this->eligibility ?? "",
            "dutiesandresponsibilities" => $tbldutiesresponsibities,
            'office' => $tbloffices
        ];
    }
}
