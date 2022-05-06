<?php
namespace App\Observers\EmployeeObservers;

use App\Models\Employees\Tblemployees;

class EmployeeObserver
{
    /**
     * Handle the Employees "created" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function created(Tblemployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the TblEmployees "updated" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function updated(Tblemployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the TblEmployees "deleted" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function deleted(Tblemployees $tblEmployees)
    {
        //
    }
    
    /**
     * Handle the post "restored" event.
     *
     * @param  \App\TblEmployees  $tblEmployees
     * @return void
     */
    public function restored(Tblemployees $tblEmployees)
    {
        //
    }

    /**
     * Handle the post "force deleted" event.
     *
     * @param  \App\Post  $post
     * @return void
     */
    public function forceDeleted(Tblemployees $TblEmployees)
    {
        //
    }
}