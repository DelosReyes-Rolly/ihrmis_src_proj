<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {   
        $date_posted = Carbon::parse($this->created_at)->timezone('Asia/Manila')->diffForHumans();
        return [
            'noti_id' => $this->noti_id,
            'noti_title' => $this->noti_title ,
            'noti_message' => $this->noti_message ,
            'noti_read' => $this->noti_read, 
            'date' => $date_posted
        ];
    }
}
