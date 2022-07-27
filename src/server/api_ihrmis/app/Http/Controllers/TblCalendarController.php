<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommonResource;
use App\Services\CalendarService;

class TblCalendarController extends Controller
{
    public function __construct()
    {
        $this->calendarService = new CalendarService();
    }

    public function getCalendarEventTypes()
    {
        return CommonResource::collection($this->calendarService->getCalendarEventTypes());
    }
}
