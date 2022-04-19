<?php
namespace App\Observers\EmployeeObservers;

use App\Models\Employees\TblEmployees;

class EmployeeObserver
{
    /**
     * Handle the Employees "created" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function created(TblEmployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the TblEmployees "updated" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function updated(TblEmployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the TblEmployees "deleted" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function deleted(TblEmployees $tblEmployees)
    {
        //
    }
    
    /**
     * Handle the post "restored" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function restored(TblEmployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the post "force deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function forceDeleted(TblEmployees $TblEmployees)
    {
        //
    }
}