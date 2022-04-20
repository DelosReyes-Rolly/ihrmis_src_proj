<?php

namespace App\Providers;

use App\Models\Applicants\TblapplicantsProfile;
use App\Models\Employees\TblEmployees;
use App\Models\Second\SecApplicantProfile;

use App\Models\TbljvsCompetencies;
use App\Models\TblplantillaItems;
use App\Observers\ApplicantObservers\ApplicantProfileObserver;
use App\Observers\EmployeeObservers\EmployeeObserver;
use App\Observers\JvsCompetenciesObserver;
use App\Observers\PlantillaObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
        TbljvsCompetencies::observe(JvsCompetenciesObserver::class);
        TblapplicantsProfile::observe(ApplicantProfileObserver::class);
        TblEmployees::observe(EmployeeObserver::class);
        TblplantillaItems::observe(PlantillaObserver::class);
    }
}
