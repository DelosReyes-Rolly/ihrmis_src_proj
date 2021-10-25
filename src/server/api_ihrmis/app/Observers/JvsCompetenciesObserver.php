<?php

namespace App\Observers;

use App\Models\Tbljvs;
use App\Models\TbljvsCompetencies;
use App\Models\TbljvsCompetencyRatings;

class JvsCompetenciesObserver
{
    /**
     * Handle the TbljvsCompetencies "created" event.
     *
     * @param  \App\Models\TbljvsCompetencies  $tbljvsCompetencies
     * @return void
     */
    public function created(TbljvsCompetencies $tbljvsCompetencies)
    {
        $data = [
            [
                'rtg_com_type' => 'WE',
                'rtg_percent' => '8',
                'rtg_factor' => 'Hello World!',
                'rtg_seq_order' => '1'
            ],
            [
                'rtg_com_type' => 'OE',
                'rtg_percent' => '9',
                'rtg_factor' => 'Hello World!',
                'rtg_seq_order' => '2'
            ],
        ];

        $ratings = [];

        for ($i=0; $i < count($data); $i++) { 
            if($data[$i]['rtg_com_type'] == $tbljvsCompetencies->com_type){
                array_push(
                    $ratings, 
                    new TbljvsCompetencyRatings([
                        'rtg_id' => $tbljvsCompetencies->com_jvs_id,
                        'rtg_percent' => $data[$i]['rtg_percent'],
                        'rtg_factor' => $data[$i]['rtg_factor'],
                        'rtg_seq_order' => $data[$i]['rtg_seq_order']   
                    ])
                );
            }       
        }
        
        $tbljvsCompetencies->tblComType()->saveMany($ratings);
    }

    /**
     * Handle the TbljvsCompetencies "updated" event.
     *
     * @param  \App\Models\TbljvsCompetencies  $tbljvsCompetencies
     * @return void
     */
    public function updated(TbljvsCompetencies $tbljvsCompetencies)
    {   
    
    }

    /**
     * Handle the TbljvsCompetencies "deleted" event.
     *
     * @param  \App\Models\TbljvsCompetencies  $tbljvsCompetencies
     * @return void
     */
    public function deleted(TbljvsCompetencies $tbljvsCompetencies)
    {
        //
    }

    /**
     * Handle the TbljvsCompetencies "restored" event.
     *
     * @param  \App\Models\TbljvsCompetencies  $tbljvsCompetencies
     * @return void
     */
    public function restored(TbljvsCompetencies $tbljvsCompetencies)
    {
        //
    }

    /**
     * Handle the TbljvsCompetencies "force deleted" event.
     *
     * @param  \App\Models\TbljvsCompetencies  $tbljvsCompetencies
     * @return void
     */
    public function forceDeleted(TbljvsCompetencies $tbljvsCompetencies)
    {
        //
    }
}
