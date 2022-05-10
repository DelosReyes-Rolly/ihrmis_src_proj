<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblcalendarEventTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblcalendar_event_types', function (Blueprint $table) {
            $table->tinyIncrements('typ_evn_id')->comment('Event Type ID. A unique identification of records.');
            $table->string('typ_evn_name', 50)->comment('Name or description of the event type like reminder, appointment, meeting, etc.');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblcalendar_event_types');
    }
}
