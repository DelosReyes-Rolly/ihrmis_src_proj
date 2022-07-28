<?php

namespace App\Services;

use App\Models\Calendar\TblcalendarEventTypes;

class CalendarService
{

    public function getCalendarEventTypes()
    {

        $item_query = TblcalendarEventTypes::get();
        return $item_query;
    }
}
