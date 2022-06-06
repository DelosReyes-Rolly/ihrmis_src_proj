<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblapplicationStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblapplication_stages', function (Blueprint $table) {
            $table->tinyIncrements('stg_id')->comment('Stage ID. A unique identification of records.');
            $table->string('stg_desc', 30)->comment('Status description of the stage.');
            $table->unsignedTinyInteger('stg_order')->comment('Placement in the order of stages.');
            $table->unsignedTinyInteger('stg_group')->comment('Group/category/section where the stage is classified. [0-All, 1-Qualified, 2-Disqualified].');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblapplication_stages');
    }
}
