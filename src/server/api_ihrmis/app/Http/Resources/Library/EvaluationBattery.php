<?php

namespace App\Http\Resources\Library;

use Illuminate\Http\Resources\Json\ResourceCollection;

class EvaluationBattery extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $grouped = [];
        foreach ($this as $test) {
            if (isset($grouped[$test->bat_grp_id]['bat_sg_text'])) {
                $grouped[$test->bat_grp_id]['bat_sg_text'] .= "," . $test->bat_sg_type;
            } else {
                $grouped[$test->bat_grp_id]['bat_sg_text'] = $test->bat_sg_type;
            }
            $grouped[$test->bat_grp_id]['bat_grp_id'] = $test->bat_grp_id;
            $grouped[$test->bat_grp_id]['bat_id'] = $test->bat_id;
            $grouped[$test->bat_grp_id]['bat_sg_type'] = $test->bat_sg_type;
            $grouped[$test->bat_grp_id]['bat_name'] = $test->bat_name;
            $grouped[$test->bat_grp_id]['bat_points'] = $test->bat_points;
            $grouped[$test->bat_grp_id]['grp_cluster'] = $test->Category->grp_cluster;
            $grouped[$test->bat_grp_id]['grp_name'] = $test->Category->grp_name;
        }
        return [
            $grouped,
        ];
        // return parent::toArray($request);
    }
}
