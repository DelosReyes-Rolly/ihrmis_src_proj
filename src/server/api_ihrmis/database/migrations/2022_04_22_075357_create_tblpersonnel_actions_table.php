<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblpersonnelActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblpersonnel_actions', function (Blueprint $table) {
            $table->tinyIncrements('act_id')->comment('Action ID. A unique identification of records.');
            $table->string('act_desc', 50)->comment('Description or name of the action.');
            $table->char('act_type', 3)->comment('Define the type of action being referred to. [APP-Appointment, ADJ-Adjustment, SEP-Separation, OTH-Others].');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblpersonnel_actions');
    }
}
