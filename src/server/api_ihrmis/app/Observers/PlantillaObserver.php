<?php

namespace App\Observers;

use App\Models\Tblnotification;
use App\Models\TblplantillaItems;

class PlantillaObserver
{
    /**
     * Handle the Tblplantilla "created" event.
     *
     * @param  \App\Models\Tblplantilla  $tblplantilla
     * @return void
     */
    public function created(TblplantillaItems $plantilla)
    {
        if($plantilla->itm_state == 0){
            $qry = new Tblnotification();
            $qry->noti_title = "New vacant position";
            $qry->noti_message = "Plantilla no. " . $plantilla->itm_no . ' has a vacant position';
            $qry->noti_read = 0; 
            $qry->save();
        }
    }

    /**
     * Handle the Tblplantilla "updated" event.
     *
     * @param  \App\Models\Tblplantilla  $tblplantilla
     * @return void
     */
    public function updated(TblplantillaItems $plantilla)
    {
        if($plantilla->itm_state == 0){
            $qry = new Tblnotification();
            $qry->noti_title = "New vacant position";
            $qry->noti_message = "Plantilla no. " . $plantilla->itm_no . ' has a vacant position';
            $qry->noti_read = 0; 
            $qry->save();
        }
    }

    /**
     * Handle the Tblplantilla "deleted" event.
     *
     * @param  \App\Models\Tblplantilla  $tblplantilla
     * @return void
     */
    public function deleted(TblplantillaItems $plantilla)
    {
        //
    }

    /**
     * Handle the Tblplantilla "restored" event.
     *
     * @param  \App\Models\Tblplantilla  $tblplantilla
     * @return void
     */
    public function restored(TblplantillaItems $plantilla)
    {
        //
    }

    /**
     * Handle the Tblplantilla "force deleted" event.
     *
     * @param  \App\Models\Tblplantilla  $tblplantilla
     * @return void
     */
    public function forceDeleted(TblplantillaItems $plantilla)
    {
        //
    }
}
