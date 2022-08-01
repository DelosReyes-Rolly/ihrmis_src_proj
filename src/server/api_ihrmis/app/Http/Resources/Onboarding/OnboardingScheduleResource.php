<?php

namespace App\Http\Resources\Onboarding;

use Illuminate\Http\Resources\Json\JsonResource;

class OnboardingScheduleResource extends JsonResource
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
            "evn_id" => $this->evn_id,
            "schedule" => $this->schedule,
            "appointees" => NewAppointeesResource::collection($this->appointees),
        ];
    }
}
