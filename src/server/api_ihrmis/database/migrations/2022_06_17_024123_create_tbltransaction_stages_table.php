<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbltransactionStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbltransaction_stages', function (Blueprint $table) {
            $table->tinyIncrements('stg_id')->comment('Stage ID. A unique identification of records.');
            $table->string('stg_desc', 30)->comment('Status description of the stage.');
            $table->unsignedTinyInteger('stg_order')->comment('Placement in the order of stages.');
            $table->string('stg_cluster', 3);
            $table->char('stg_group', 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbltransaction_stages');
    }
}
