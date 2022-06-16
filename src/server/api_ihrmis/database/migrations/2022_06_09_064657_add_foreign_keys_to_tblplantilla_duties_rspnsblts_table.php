<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTblplantillaDutiesRspnsbltsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblplantilla_duties_rspnsblts', function (Blueprint $table) {
            $table->foreign('dty_itm_id', 'tblplantilla_duties_responsibilities_ibfk_1')->references('itm_id')->on('tblplantilla_items')->onUpdate('CASCADE')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblplantilla_duties_rspnsblts', function (Blueprint $table) {
            $table->dropForeign('tblplantilla_duties_responsibilities_ibfk_1');
        });
    }
}
