<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblmfoTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblmfo_tables', function (Blueprint $table) {
            $table->increments('mfo_id')->comment('Mfo identifier');
            $table->integer('mfo_ofc_id')->comment('Mfo Office identifier');
            $table->year('mfo_year')->comment('Mfo year');
            $table->dateTime('mfo_sts_time')->comment('Mfo status time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblmfo_tables');
    }
}
