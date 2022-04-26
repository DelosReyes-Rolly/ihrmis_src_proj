<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblplantillaDutiesRspnsbltsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblplantilla_duties_rspnsblts', function (Blueprint $table) {
            $table->unsignedInteger('dty_itm_id')->comment('Plantilla Item ID. Identifies the related plantilla item.');
            $table->unsignedTinyInteger('dty_itm_order')->comment('Sequence order in the list.');
            $table->string('dty_itm_desc')->comment('Description of the duty or responsibility.');
            $table->unsignedTinyInteger('dty_itm_percent')->comment('Percentage of working time in integer format.');
            $table->string('dty_itm_cmptncy', 50)->comment('Level of competency.');
            $table->index(['dty_itm_id', 'dty_itm_order'], 'dty_itm_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblplantilla_duties_rspnsblts');
    }
}
