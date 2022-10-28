<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblmfoTableStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblmfo_table_status', function (Blueprint $table) {
            $table->increments('sts_mfo_id')->comment('Mfo status identifier');
            $table->dateTime('sts_mfo_time')->comment('Mfo status datetime');
            $table->integer('sts_mfo_stg_id');
            $table->text('sts_mfo_remarks')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblmfo_table_status');
    }
}
